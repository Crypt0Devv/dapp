import { TonConnectButton, TonConnectUI } from '@tonconnect/ui-react';
import { styled } from '@mui/material';

const HeaderContainer = styled('div')`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 25px;

    > span {
      font-size: 30px;
      line-height: 34px;
      color: rgba(102, 170, 238, 0.91);
      font-weight: bold;
    }
  }

  @media (max-width: 525px) {
    header {
      flex-direction: column;
      gap: 10px;

      > *:nth-child(2) {
        align-self: flex-end;
      }
    }
  }
`;
export const Header = () => {
  return (
    <HeaderContainer>
      <header
      // style={{
      //   display: 'flex',
      //   justifyContent: 'space-between',
      //   alignItems: 'top',
      //   width: '100%',
      // }}
      >
        <span>Ton Tools</span>
        <TonConnectButton style={{ alignSelf: 'auto' }} />
      </header>
    </HeaderContainer>
  );
};
