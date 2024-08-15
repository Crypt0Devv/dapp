import WalletRoundedIcon from '@mui/icons-material/WalletRounded';
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import React from 'react';
import { Box, styled, Tabs, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export function NavTabs() {
  const [value, setValue] = React.useState('/');
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Box
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%' }}
      className="send-tx-form"
    >
      <TabContext value={value}>
        <TabList onChange={handleChange} variant="fullWidth">
          <Tab
            icon={<WalletRoundedIcon />}
            value="/tontools-dapp/"
            label="Portfolio"
            iconPosition="bottom"
            sx={{ color: 'white' }}
          />
          <Tab
            icon={<CurrencyBitcoinIcon />}
            value="/tontools-dapp/jetton"
            label="Token"
            iconPosition="bottom"
            sx={{ color: 'white' }}
          />
        </TabList>
      </TabContext>
    </Box>
  );
}
