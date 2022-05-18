// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { readFileSync, writeFileSync } from 'fs'
import { config, ethers } from 'hardhat'

async function main() {
  const addresses = JSON.parse(readFileSync('addresses.json').toString()) as Record<
    string,
    { ProjectRegistry: { address: string } }
  >
  const network = config.networks[process.env.HARDHAT_NETWORK!]!
  const chainId = network.chainId!.toString()

  const ProjectRegistry = await ethers.getContractFactory('ProjectRegistry')
  const projectRegistryDeployment = await ProjectRegistry.deploy()
  const projectReigstry = await projectRegistryDeployment.deployed()

  addresses[chainId] = {
    ProjectRegistry: { address: projectReigstry.address },
  }
  console.log(addresses[chainId])
  writeFileSync('addresses.json', JSON.stringify(addresses, null, 2))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
