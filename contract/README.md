# Graphhack Workshop | Contracts

Smart contracts for [The Graph Hack | June 3 - 5](https://thegraph.com/graph-hack/2022/).

Contains a single contract: `ProjectRegistry` which contains allows users to submit `Project`, store them onchain, update the Project metadata, and up/downvote on Projects.

## API

- `submitProject`: create a new Project in the registry
  - `_metadata`: the Project metadata
    - `name`: the Project name
    - `subtitle`: the Project subtitle
    - `description`: the Project description
    - `imageUrl`: URL of the Project image. preferably an IPFS url
- `updateProjectMetadata`: update an existing Project metadata
  - `_projectId`: ID of the already created Project in the registry
  - `_metadata`: the Project metadata
    - `name`: the Project name
    - `subtitle`: the Project subtitle
    - `description`: the Project description
    - `imageUrl`: URL of the Project image. preferably an IPFS url
- `vote`: Vote on a Project
  - `_projectId`: ID of the already Project in the registry the user wants to upvote/downvote
  - `_vote`: the users Vote

### Examples

```ts
import { ContractTransaction, BigNumber } from 'ethers'
import { ProjectRegistry__factory } from '@graphhack-workshop/contract'
import GraphHackContractAddresses from '@graphhack-workshop/contract/addresses.json'

type Proposal = {
  id: string
  owner: string
  name: string
  subtitle: string
  description: string
  imageUrl: string
  upvotes: number
  downvotes: number
  voteCount: number
}

type ProposalMetadata = {
  name: string
  subtitle: string
  description: string
  imageUrl: string
}

enum VoteChoice {
  UP = 1,
  DOWN = 2,
}

async function submitProject(metadata: ProposalMetadata): Promise<ContractTransaction> {
  const address = GraphHackContractAddresses['4'].ProjectRegistry.address
  const projectRegistry = await ProjectRegistry__factory.connect(address)

  return await projectRegistry.submitProject(metadata)
}

async function updateProjectMetadata(id: string, metadata: ProposalMetadata): Promise<ContractTransaction> {
  const address = GraphHackContractAddresses['4'].ProjectRegistry.address
  const projectRegistry = await ProjectRegistry__factory.connect(address)

  return await projectRegistry.updateProjectMetadata(id, metadata)
}

async function vote(id: string, vote: VoteChoice): Promise<ContractTranscation> {
  const address = GraphHackContractAddresses['4'].ProjectRegistry.address
  const projectRegistry = await ProjectRegistry__factory.connect(address)

  return await projectRegistry.vote(id, vote)
}
```

## Commands

```shell
# compile the smart contracts
npx hardhat compile
# clean the built compile output
npx hardhat clean
# runs the test suite to validate the contract
npx hardhat test
# runs the test suite and generates a gas report for the contract functions
REPORT_GAS=true npx hardhat test
# runs the test suite and generates a coverage report for the contracts.
# to view, open the generated ./contracts/coverage/index.html page in a web browser
npx hardhat coverage
# deploy the contracts to a locally running chain using ganache
npx hardhat run --network localhost scripts/deploy.ts
# linting/prettier
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```
