import WalletRoundedIcon from '@mui/icons-material/WalletRounded';
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import React from 'react';
import { Box, styled, Tabs, Tab } from '@mui/material';

const Container = styled(Box)``;

export function AppTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className="send-tx-form">
      <Tabs
        sx={{ width: '100%', backgroundColor: 'black', color: 'white' }}
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            backgroundColor: 'red',
            color: 'red',
          },
        }}
      >
        <Tab sx={{ color: 'white' }} icon={<WalletRoundedIcon />} label="top" />
        <Tab
          sx={{ color: 'white' }}
          icon={<GppGoodRoundedIcon />}
          iconPosition="bottom"
          label="start"
        />
      </Tabs>
    </Box>
  );
}
