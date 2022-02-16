import React, {FC, useEffect, useState} from 'react';
import {DataStore} from "aws-amplify";
import UserStats from "../src/components/UserStats";
import {User} from "../models";

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
        <option selected>Select a user...</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      {selectedUser &&
          <>
              <p>User page views: {selectedUser.userPageViews || 0}</p>
              <UserStats user={{id: selectedUser.cognitoId, name: selectedUser.name}}/>
          </>}
    </>
  )
};

export default AllUsersStats;

interface AllUsersStatsProps {
}
