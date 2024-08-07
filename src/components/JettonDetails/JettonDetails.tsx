import { useCallback, useEffect, useState } from 'react';
import { TonApiService } from '../../server/services/ton-api-service';
import { useTonAddress } from '@tonconnect/ui-react';
import React from 'react';
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  CircularProgress,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TableCellStyled = styled(TableCell)`
  border-bottom: 0;
`;
export function JettonDetails() {
  const navigate = useNavigate();
  const rawAddress = useTonAddress(false);
  const location = useLocation();
  const { jettonAddress } = useParams();
  const [jetton, setJetton] = useState(location.state.jetton);
  const [jettonEvents, setJettonEvents] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const getJettonInfo = useCallback(async () => {
    if (!rawAddress) {
      return;
    }
    const tonApiService = new TonApiService(rawAddress);
    if (!jettonAddress) {
      return;
    }
    setLoading(true);
    const response = await tonApiService.getJettonInfoByAccount(
      jettonAddress,
      jetton.rate,
      rawAddress
    );
    setLoading(false);

    setJettonEvents(response);
  }, [rawAddress]);

  useEffect(() => {
    getJettonInfo();
  }, [getJettonInfo]);

  function mapEntryData(events: any[]) {
    if (!events.length) {
      return [];
    }

    return events
      .filter(
        (item: any) =>
          item && item?.action.JettonTransfer.recipient.address === rawAddress
      )
      .sort((a: any, b: any) => b.value - a.value);
  }

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

  const rows = mapEntryData(jettonEvents);

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
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/tontools-dapp/')}
        sx={{ position: 'absolute', top: 0, left: 0, m: 2 }}
      ></Button>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        <img
          src={jetton.image}
          alt="Jetton"
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            marginBottom: '10px',
          }}
        />
        <h1 style={{ color: 'white', marginBottom: '0', marginTop: '0' }}>
          {jetton.name}
        </h1>
        <h2 style={{ color: 'white', marginBottom: '0', marginTop: '0' }}>
          {jetton.balance}
        </h2>
        <h3 style={{ color: 'white', marginBottom: '0', marginTop: '0' }}>
          $ {Number(jetton.value).toFixed()}
        </h3>
      </Box>

      {rawAddress && rows.length ? (
        <Table size="small" style={{ marginTop: '20px' }}>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCellStyled style={{ textAlign: 'left' }}>
                  <p>
                    + {row.amount} {jetton.name}
                    <p style={{ fontSize: '12px', marginTop: '2px' }}>
                      {new Date(row.timeStamp * 1000).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </p>
                </TableCellStyled>
                <TableCellStyled
                  style={{
                    textAlign: 'right',
                  }}
                >
                  <p>{row.diff} %</p>
                </TableCellStyled>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <></>
      )}
    </Box>
  );
}
