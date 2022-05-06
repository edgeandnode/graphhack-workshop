import type { NextPage } from "next";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Button, Container } from "theme-ui";

const Home: NextPage = () => {
  return (
    <Container>
      <Profile />
    </Container>
  );
};

function Profile() {
  const { data: account } = useAccount();
  const { data: ensName } = useEnsName({ address: account?.address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (account) {
    return (
      <>
        <div>Connected to {ensName ?? account.address}</div>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </>
    );
  }
  return <Button onClick={() => connect()}>Connect Wallet</Button>;
}

export default Home;
