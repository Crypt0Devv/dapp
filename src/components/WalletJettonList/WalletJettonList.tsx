import { useCallback, useEffect, useState } from 'react';
import { TonApiService } from '../../server/services/ton-api-service';
import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import React from 'react';
import {
  Box,
  CircularProgress,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAmount } from '../../utils/number';

const TableHeadStyled = styled(TableHead)`
  color: white;
`;

const TableBodyStyled = styled(TableBody)`
  color: white;
`;

const TableCellStyled = styled(TableCell)`
  border-bottom: 0;
`;

const TableRowStyled = styled(TableRow)``;
type Jetton = {
  balance: string;
  jetton: {
    address: string;
    decimals: number;
    image: string;
    name: string;
    symbol: string;
    verification: string;
  };
  rate: number;
  wallet_address: {
    address: string;
    is_scam: boolean;
    is_wallet: boolean;
  };
};
export function WalletJettonList() {
  const [jettons, setJettons] = useState<Jetton[]>([]);
  const rawAddress = useTonAddress(false);
  const [loading, setLoading] = useState(true);
  const getJettonList = useCallback(async () => {
    if (!rawAddress) {
      return;
    }
    const tonApiService = new TonApiService(rawAddress);
    setLoading(true);
    const response = await tonApiService.getAccountJettonsInfo();
    if (!response) {
      return;
    }
    setLoading(false);
    setJettons(response);
  }, [rawAddress]);

  useEffect(() => {
    getJettonList();
  }, [getJettonList]);

  function mapData(jettons: Jetton[]) {
    return (
      jettons
        .map((item: any, index: number) => {
          const balance = getAmount(item.balance, item.jetton.decimals);
          const rate = Number(item.rate).toFixed(6);
          const value = (item.rate * balance).toFixed(6);
          return {
            id: index,
            name: item.jetton.symbol,
            balance,
            rate,
            value,
            profit: '%',
            verification: item.jetton.verification,
            isScam: item.wallet_address.is_scam,
            image: item.jetton.image,
            address: item.jetton.address,
          };
        })
        // .filter((item: any) => item.balance > 0 && item.value > 0)
        .sort((a: any, b: any) => b.value - a.value)
    );
  }
  const rows = mapData(jettons);
  const navigate = useNavigate();

  const showJettonDetails = (index: number) => {
    navigate(`/tontools-dapp/jetton-details/${rows[index].address}`, {
      state: {
        jetton: rows[index],
      },
      replace: true,
    });
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
    <Box sx={{ overflowX: 'auto' }} className="send-tx-form">
      {rawAddress && rows.length ? (
        <React.Fragment>
          <Table size="small">
            <TableBody>
              {rows.map((row: any, index: number) => (
                <TableRow key={index} onClick={() => showJettonDetails(index)}>
                  <TableCellStyled style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={row.image}
                        alt="Jetton"
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          marginRight: '10px',
                        }}
                      />
                      <div>
                        <p>{row.name}</p>
                        <p> {row.rate}</p>
                      </div>
                    </div>
                  </TableCellStyled>
                  <TableCellStyled style={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      {row.balance}
                    </Typography>
                    <Typography sx={{ fontSize: '.8rem' }}>
                      ${row.value}
                    </Typography>
                  </TableCellStyled>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      ) : (
        <></>
      )}
    </Box>
  );
}
