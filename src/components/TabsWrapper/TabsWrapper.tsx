import React, {FC} from 'react';
import {Box, Tabs, Typography, Tab} from "@mui/material";

const TabsWrapper: FC<TabsWrapperProps> = ({tabs}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {
            tabs.map(({name}, index) => (
              <Tab label={name} {...a11yProps(index)} />
            ))
          }
        </Tabs>
      </Box>

      {tabs.map(({content}, index) => (
        <TabPanel value={value} index={index}>
          {content}
        </TabPanel>
      ))}
    </Box>
  );
}

export default TabsWrapper;

interface TabsWrapperProps {
  tabs: { name: string, content: React.ReactElement }[]
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
