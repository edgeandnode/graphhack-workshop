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
})
