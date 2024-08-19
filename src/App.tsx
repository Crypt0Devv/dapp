import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import { Header } from './components/Header/Header';
import { Box, styled } from '@mui/material';
import { Calculator } from './components/Calculator/Calculator';
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
          <Calculator></Calculator>
        </Container>
      </TonConnectUIProvider>
    </Box>
  );
}

export default App;
