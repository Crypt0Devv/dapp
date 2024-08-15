import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import { Header } from './components/Header/Header';
import { WalletJettonList } from './components/wallet/WalletJettonList/WalletJettonList';
import { Box, styled } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { JettonDetails } from './components/wallet/JettonDetails/JettonDetails';
import { NavTabs } from './components/NavTabs/NavTabs';
import { JettonInfo } from './components/jetton/JettonInfo/JettonInfo';
const Container = styled(Box)`
  min-height: 100%;
  height: 100%
  display: flex;
  flex-direction: column;

  > header {
    margin-bottom: 10px;
  }
  padding: 20px; /* This sets the padding inside the container */
`;

function App() {
  return (
    <Box
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <TonConnectUIProvider
        manifestUrl="https://lucasrz.github.io/tontools-dapp/tonconnect-manifest.json"
        uiPreferences={{ theme: THEME.DARK }}
        enableAndroidBackHandler={false}
      >
        <Container>
          <Header />
          <Routes>
            <Route path="/tontools-dapp/" element={<WalletJettonList />} />
            <Route
              path="/tontools-dapp/jetton-details/:jettonAddress"
              element={<JettonDetails />}
            />
            <Route
              path="/tontools-dapp/jetton"
              element={<JettonInfo></JettonInfo>}
            />
          </Routes>
        </Container>
        <NavTabs></NavTabs>
      </TonConnectUIProvider>
    </Box>
  );
}

export default App;
