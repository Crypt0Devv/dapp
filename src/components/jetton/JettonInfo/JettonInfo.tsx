import { useCallback, useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TonApiService } from '../../../server/services/ton-api-service';

export function JettonInfo() {
  const [loading, setLoading] = useState(true);
  const [jetton, setJetton] = useState<any>();
  const jettonAddress =
    '0:6d0e662008a93779c435c7e8f408b6519cf632695edc077dda774dfa40df8713';
  const getJettonInfo = useCallback(async () => {
    const tonApiService = new TonApiService();
    const response = await tonApiService.getJettonInfo(jettonAddress);
    setJetton(response);
    setLoading(false);
  }, []);

  useEffect(() => {
    getJettonInfo();
  }, [getJettonInfo]);

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
      {jetton && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1>{jetton.metadata.name}</h1>
          <img
            style={{ width: '150px', borderRadius: '50%' }}
            src={jetton.metadata.image}
            alt={jetton.metadata.name}
          />
          <p style={{ marginTop: '20px' }}>
            Total Supply:
            {Math.floor(jetton.total_supply / 10 ** jetton.metadata.decimals)}
          </p>
        </div>
      )}
    </Box>
  );
}
