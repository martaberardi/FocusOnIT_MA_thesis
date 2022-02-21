import React, {FC, useEffect, useState} from 'react';
import {DataStore} from "aws-amplify";
import UserStats from "../src/components/UserStats";
import {User} from "../models";
import TabsWrapper from "../src/components/TabsWrapper";
import UserAttempts from "../src/components/UserAttempts";

const AllUsersStats: FC<AllUsersStatsProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    DataStore.query(User).then((result) => {
      setUsers(result);
    }).catch(console.error);
  }, [])

  return (
    <>
      <select onChange={(e) =>
        setSelectedUser(users.find(({id}) => id === e.target.value)!)
      }>
        <option>Select a user...</option>
        {users
          .sort((u1, u2) =>
            u1.name!.toLowerCase().trim().localeCompare(u2.name!.toLowerCase().trim())
          )
          .map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
      </select>

      {selectedUser && <TabsWrapper tabs={
        [{
          name: "Stats",
          content: (
            <>
              <p>User page views: {selectedUser.userPageViews || 0}</p>
              <UserStats user={{id: selectedUser.cognitoId, name: selectedUser.name}}/>
            </>)
        },
          {
            name: "Attempts",
            content: (<UserAttempts user={{id: selectedUser.cognitoId, name: selectedUser.name}}/>)
          }
        ]}/>
      }
    </>
  )
};

export default AllUsersStats;

interface AllUsersStatsProps {
}
