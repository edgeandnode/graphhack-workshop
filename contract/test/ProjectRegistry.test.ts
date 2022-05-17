import { expect } from 'chai'
import { BigNumber, constants, utils } from 'ethers'
import { ethers } from 'hardhat'

import { ProjectRegistry } from '../build/types'

describe('ProjectRegistry', () => {
  const VoteChoice = Object.freeze({
    Null: constants.Zero,
    Up: BigNumber.from(1),
    Down: BigNumber.from(2),
  })

  async function buildContract(): Promise<ProjectRegistry> {
    const ProjectRegistry = await ethers.getContractFactory('ProjectRegistry')
    const projectRegistry = await ProjectRegistry.deploy()

    return await projectRegistry.deployed()
  }

  describe('submitProject()', () => {
    it('should be rejected if the submitted name is an empty string', async () => {
      const registry = await buildContract()
    })
  })
})
