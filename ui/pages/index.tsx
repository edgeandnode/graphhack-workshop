import type { NextPage } from 'next'
import { Container } from 'theme-ui'

import { ConnectButton } from '../src/wallet'

const Home: NextPage = () => {
  return (
    <Container>
      <ConnectButton />
    </Container>
  )
}

export default Home
