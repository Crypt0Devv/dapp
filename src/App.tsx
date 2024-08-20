import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import { Header } from './components/Header/Header';
import { Box, Button, styled } from '@mui/material';
import { NavTabs } from './components/NavTabs/NavTabs';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import backgroundImage from './assets/background.png';
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

const SocialButton = styled(Button)`
  background-color: #231f20;
  margin: 5px;
  > span {
    margin-right: 0;
  }
  &:hover: {
    background-color: inherit;
  }
`;

const StyledButton = styled(Button)`
  background-color: #231f20;
  color: white;
  margin: 10px;
`;

function App() {
  const copyToClipboard = () => {
    const textToCopy = 'EQBTN5wfvSRZkVg64pcDfZu7YOz_U0sxlhe00_higH72y4ma';
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {/* <TonConnectUIProvider
        manifestUrl="https://lucasrz.github.io/tontools-dapp/tonconnect-manifest.json"
        uiPreferences={{ theme: THEME.DARK }}
        enableAndroidBackHandler={false}
      > */}
      <Container>
        <Header />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', // Center the buttons horizontally
          }}
        >
          <img
            src={'./assets/rising-tide.jpg'}
            alt="Rising Tide"
            style={{ width: '20%', marginBottom: '10px', borderRadius: '60%' }}
          />

          <StyledButton
            variant="contained"
            style={{ width: '200px', marginBottom: '10px' }}
            onClick={() =>
              window.open(
                'https://assets.zyrosite.com/m5KbwOX53XUQgQgD/whitepaper-for-website-Yan9EyxKPaS9xGkk.pdf',
                '_blank'
              )
            }
          >
            White Paper
          </StyledButton>
          <StyledButton
            variant="contained"
            style={{ width: '200px', marginBottom: '10px' }}
            onClick={() =>
              window.open(
                'https://dexscreener.com/ton/eqd_vlwqh8m31shoehdt45bivdri7jjzbabkn2r2jvqvksfu',
                '_blank'
              )
            }
          >
            Dex Screener
          </StyledButton>

          <StyledButton
            variant="contained"
            style={{ width: '200px' }}
            onClick={() =>
              window.open(
                'https://www.geckoterminal.com/ton/pools/EQD_Vlwqh8m31ShoEHDt45BiVdRI7jjzbAbKN2r2JvqvKsfu',
                '_blank'
              )
            }
          >
            Gecko Terminal
          </StyledButton>
          <div
            style={{
              marginBottom: '10px',
              backgroundColor: 'black',
              borderRadius: '5px',
            }}
          >
            <StyledButton
              variant="contained"
              color="primary"
              style={{
                backgroundColor: '#231f20',
                fontSize: '.6rem',
              }}
              onClick={copyToClipboard}
            >
              CA: EQBTN5wfvSRZkVg64pcDfZu7YOz_U0sxlhe00_higH72y4ma
            </StyledButton>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center', // Center the buttons horizontally
            }}
          >
            <SocialButton
              variant="contained"
              startIcon={<TwitterIcon />}
              onClick={() =>
                window.open('https://x.com/RisingTideTON', '_blank')
              }
            ></SocialButton>
            <SocialButton
              variant="contained"
              startIcon={<TelegramIcon />}
              style={{ margin: '5px' }}
              onClick={() =>
                window.open('https://t.me/TheRisingTideTON', '_blank')
              }
            ></SocialButton>
          </div>
        </div>
      </Container>
      {/* </TonConnectUIProvider> */}
    </Box>
  );
}

export default App;
