# Graph Hack Workshop

## Requirements

- **[PNPM] [7](https://pnpm.io/installation)**,
  Install using:

```
npm install -g pnpm
```

- **Node >=14**

[pnpm]: https://pnpm.io/

## Getting started

1. Install dependencies with **`pnpm install`**
2. Run **`pnpm codegen`** to generate types from GraphQL queries
3. Run **`pnpm build`** to build the packages.
4. Run **`pnpm dev:ui`** to bring up the UI on http://localhost:3000

## What is this?

This Ethereum dapp template is powered by The Graph. It’s using React.js, TypeScript and Solidity.
It consists of three packages you can find in `/contract`, `/subgraph` and `/ui` directories.

### Contract

`ProjectRegistry` smart contract implements a few functions, such as adding and editing a project, voting on a project. It’s written in Solidity, and for the purpose of testing we deployed it to Rinkeby testnet. Two main events are `ProjectUpdated` and `VoteSubmitted`.

### Subgraph

Subgraph is a GraphQL API layer that has a manifest, GraphQL schema and mappings that handle contract events on the blockchain. We created a basic subgraph with `Project`, `User` and `Vote` entities. It handles `ProjectUpdated` and `VoteSubmitted` events, and populates the schema accordingly.

### UI

The front-end is build using Next.js and React.js. It uses `react-query` library for GraphQL client , and `wagmi` for making contract calls.
