import { TonConnectButton } from '@tonconnect/ui-react';

export function Header() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <TonConnectButton />
    </div>
  );
}
