import { useCallback, useEffect } from 'react';
import { TonApiService } from '../../server/services/ton-api-service';
import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import React from 'react';
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const TableHeadStyled = styled(TableHead)`
  color: white;
`;

const TableBodyStyled = styled(TableBody)`
  color: white;
`;

const TableCellStyled = styled(TableCell)`
  color: white;
`;

const TableRowStyled = styled(TableRow)`
  color: white;
`;

export function WalletJettonList() {
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();
  const [jettons, setJettons] = React.useState<[]>([]);
  const rawAddress = useTonAddress(false);
  const getJettonList = useCallback(async () => {
    if (!wallet) {
      return;
    }
    const tonApiService = new TonApiService(rawAddress);
    const response = await tonApiService.getAccountJettonsInfo();
    if (!response) {
      return;
    }
    setJettons(response);
  }, [wallet]);

  useEffect(() => {
    getJettonList();
  }, [getJettonList]);

  function createData(
    id: number,
    date: string,
    name: string,
    shipTo: string,
    paymentMethod: string,
    amount: number
  ) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }
  const rows = jettons.map((item: any, index: number) => {
    const balance = Math.floor(item.balance / 10 ** item.jetton.decimals);
    const rate = Number(item.rate).toFixed(6);
    const value = (item.rate * balance).toFixed(6);
    return {
      id: index,
      name: item.jetton.symbol,
      balance,
      rate,
      value,
      profit: '%',
    };
  });

  return (
    <Box sx={{ overflowX: 'auto' }} className="send-tx-form">
      {wallet ? (
        <React.Fragment>
          <h1 style={{ color: 'white' }}>Jettons</h1>
          <Table size="small">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCellStyled style={{ textAlign: 'left' }}>
                    {row.name}
                    <br />
                    {row.rate}
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
