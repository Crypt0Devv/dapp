import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { TonApiService } from '../../server/services/ton-api-service';
import { useTonAddress } from '@tonconnect/ui-react';
import { getAmount } from '../../utils/number';

export function Calculator() {
  const [volume, setVolume] = useState(0);
  const [tokensHeld, setTokensHeld] = useState(100000000);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(true);
  const rawAddress = useTonAddress(false);

  const getDexData = useCallback(async () => {
    if (!rawAddress) {
      return;
    }
    const tonApiService = new TonApiService(rawAddress);
    setLoading(true);
    const dexResponse = await tonApiService.getRTDexData();
    const response = await tonApiService.getJettonByAccount();
    console.log('response', response);
    setTokensHeld(getAmount(response.balance, response.jetton.decimals));
    setVolume(dexResponse.pair.volume.h24);
    setLoading(false);
  }, [rawAddress]);

  useEffect(() => {
    getDexData();
  }, [getDexData]);

  const handleCalculate = () => {
    return 0;
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflowX: 'auto',
        marginTop: '25px',
      }}
    >
      <Typography variant="h5">Volume: {volume}</Typography>
      <Typography variant="h5">Rising Tide tokens: {tokensHeld}</Typography>

      <Typography variant="h6">Result: {result}</Typography>
    </Box>
  );
}
