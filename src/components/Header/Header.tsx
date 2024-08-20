import { TonConnectButton, TonConnectUI } from '@tonconnect/ui-react';
import { styled } from '@mui/material';

export function Header() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '10px',
          borderRadius: '10px',
          fontSize: '3rem',
          margin: '0',
          whiteSpace: 'nowrap', // Prevent line breaks
          overflow: 'hidden', // Hide overflow text
          textOverflow: 'ellipsis', // Add ellipsis for overf
        }}
      >
        Rising Tide
      </h1>
      <h2
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '10px',
          borderRadius: '10px',
          fontSize: '1rem',
          whiteSpace: 'nowrap', // Prevent line breaks
          overflow: 'hidden', // Hide overflow text
          textOverflow: 'ellipsis', // Add ellipsis for overf
        }}
      >
        The New Wave on TON
      </h2>
    </div>
  );
}
