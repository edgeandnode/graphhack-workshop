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

      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: '',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: 'testing_imageUrl',
      }
      await expect(registry.submitProject(metadata)).to.be.revertedWith('Must provide a project name')
    })
    it('should be rejected if the submitted imageUrl is an empty string', async () => {
      const registry = await buildContract()

      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'testing_name',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: '',
      }
      await expect(registry.submitProject(metadata)).to.be.revertedWith('Must provide a project image url')
    })
    it('should be able to submit a Project and store it onchain', async () => {
      const [owner] = await ethers.getSigners()
      const _owner = owner.address
      const registry = await buildContract()

      const projectSeqId = await registry.projectOwnerSeqIds(_owner)
      const projectId = BigNumber.from(utils.solidityKeccak256(['address', 'uint256'], [_owner, projectSeqId]))
      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'testing_name',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: 'https://ipfs.io/ipfs/QmUGoPveDHgBBfU9KSgLgaGfq2u6vndAuCoQevhFnaQwyQ',
      }

      const tx = await registry.submitProject(metadata)
      await tx.wait()

      expect(tx)
        .emit(registry, 'ProjectUpdated')
        .withArgs(
          projectId,
          _owner,
          metadata.name,
          metadata.subtitle,
          metadata.description,
          metadata.imageUrl,
          constants.Zero,
        )

      const project = await registry.getProject(projectId)
      expect(project.owner).equal(_owner)
      expect(project.name).equal(metadata.name)
      expect(project.subtitle).equal(metadata.subtitle)
      expect(project.description).equal(metadata.description)
      expect(project.imageUrl).equal(metadata.imageUrl)
      expect(project.upvotes).equal(constants.Zero)
      expect(project.downvotes).equal(constants.Zero)

      const projectOwner = await registry.getProjectOwner(projectId)
      expect(projectOwner).equal(_owner)
    })
  })

  describe('updateProjectMetadata()', () => {
    it('should be rejected if the Project does not exist', async () => {
      const [owner] = await ethers.getSigners()
      const _owner = owner.address
      const registry = await buildContract()

      const projectSeqId = await registry.projectOwnerSeqIds(_owner)
      const projectId = BigNumber.from(utils.solidityKeccak256(['address', 'uint256'], [_owner, projectSeqId]))
      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'testing_name',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: 'https://ipfs.io/ipfs/QmUGoPveDHgBBfU9KSgLgaGfq2u6vndAuCoQevhFnaQwyQ',
      }

      await expect(registry.updateProjectMetadata(projectId, metadata)).to.be.revertedWith(
        'Cannot update a Project that does not exist',
      )
    })
    it('should be rejected if the user attempting the update is not the Project owner', async () => {
      const [owner, addr1] = await ethers.getSigners()
      const _owner = owner.address
      const registry = await buildContract()

      const projectSeqId = await registry.projectOwnerSeqIds(_owner)
      const projectId = BigNumber.from(utils.solidityKeccak256(['address', 'uint256'], [_owner, projectSeqId]))
      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'testing_name',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: 'https://ipfs.io/ipfs/QmUGoPveDHgBBfU9KSgLgaGfq2u6vndAuCoQevhFnaQwyQ',
      }

      // create the Project
      const submitProjectTx = await registry.submitProject(metadata)
      await submitProjectTx.wait()

      // attempt to update as non-owner
      await expect(registry.connect(addr1).updateProjectMetadata(projectId, metadata)).to.be.revertedWith(
        'Only the Project owner can update the Project',
      )
    })
    it('should be rejected if the updated name is empty', async () => {
      const [owner] = await ethers.getSigners()
      const _owner = owner.address
      const registry = await buildContract()

      const projectSeqId = await registry.projectOwnerSeqIds(_owner)
      const projectId = BigNumber.from(utils.solidityKeccak256(['address', 'uint256'], [_owner, projectSeqId]))
      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'testing_name',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: 'https://ipfs.io/ipfs/QmUGoPveDHgBBfU9KSgLgaGfq2u6vndAuCoQevhFnaQwyQ',
      }

      // create the Project
      const submitProjectTx = await registry.submitProject(metadata)
      await submitProjectTx.wait()

      // attempt to update with an empty name
      await expect(registry.updateProjectMetadata(projectId, { ...metadata, name: '' })).to.be.revertedWith(
        'Must provide a project name',
      )
    })
    it('should be rejected if the updated imageUrl is empty', async () => {
      const [owner] = await ethers.getSigners()
      const _owner = owner.address
      const registry = await buildContract()

      const projectSeqId = await registry.projectOwnerSeqIds(_owner)
      const projectId = BigNumber.from(utils.solidityKeccak256(['address', 'uint256'], [_owner, projectSeqId]))
      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'testing_name',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: 'https://ipfs.io/ipfs/QmUGoPveDHgBBfU9KSgLgaGfq2u6vndAuCoQevhFnaQwyQ',
      }

      // create the Project
      const submitProjectTx = await registry.submitProject(metadata)
      await submitProjectTx.wait()

      // attempt to update with an empty name
      await expect(registry.updateProjectMetadata(projectId, { ...metadata, imageUrl: '' })).to.be.revertedWith(
        'Must provide a project image url',
      )
    })
    it('should be able to update the Project metadata', async () => {
      const [owner] = await ethers.getSigners()
      const _owner = owner.address
      const registry = await buildContract()

      const projectSeqId = await registry.projectOwnerSeqIds(_owner)
      const projectId = BigNumber.from(utils.solidityKeccak256(['address', 'uint256'], [_owner, projectSeqId]))
      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'testing_name',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: 'https://ipfs.io/ipfs/QmUGoPveDHgBBfU9KSgLgaGfq2u6vndAuCoQevhFnaQwyQ',
      }

      // create the Project
      const submitProjectTx = await registry.submitProject(metadata)
      await submitProjectTx.wait()

      // attempt to update with an empty name
      const updatedMetadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'test_name_updated',
        subtitle: 'testing_subtitle_updated',
        description: 'testing_description_updated',
        imageUrl: 'https://ipfs.io/ipfs/QmUGoPveDHgBBfU9KSgLgaGfq2u6vndAuCoQevhFnaQwyQ',
      }
      const updatedProjectTx = await registry.updateProjectMetadata(projectId, updatedMetadata)
      await updatedProjectTx.wait()

      expect(updatedProjectTx)
        .emit(registry, 'ProjectUpdated')
        .withArgs(
          projectId,
          _owner,
          updatedMetadata.name,
          updatedMetadata.subtitle,
          updatedMetadata.description,
          updatedMetadata.imageUrl,
          constants.Zero,
        )

      const project = await registry.getProject(projectId)
      expect(project.owner).equal(_owner)
      expect(project.name).equal(updatedMetadata.name)
      expect(project.subtitle).equal(updatedMetadata.subtitle)
      expect(project.description).equal(updatedMetadata.description)
      expect(project.imageUrl).equal(updatedMetadata.imageUrl)
      expect(project.upvotes).equal(constants.Zero)
      expect(project.downvotes).equal(constants.Zero)
    })
  })

  describe('vote()', () => {
    it('should be rejected if the Project does not exist', async () => {
      const [owner] = await ethers.getSigners()
      const _owner = owner.address
      const registry = await buildContract()

      const projectSeqId = await registry.projectOwnerSeqIds(_owner)
      const projectId = BigNumber.from(utils.solidityKeccak256(['address', 'uint256'], [_owner, projectSeqId]))

      await expect(registry.vote(projectId, VoteChoice.Up)).to.be.revertedWith(
        'Cannot vote on Project that does not exist',
      )
    })
    it('should be rejected if the VoteChoice is invalid', async () => {
      const [owner] = await ethers.getSigners()
      const _owner = owner.address
      const registry = await buildContract()

      const projectSeqId = await registry.projectOwnerSeqIds(_owner)
      const projectId = BigNumber.from(utils.solidityKeccak256(['address', 'uint256'], [_owner, projectSeqId]))
      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'testing_name',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: 'https://ipfs.io/ipfs/QmUGoPveDHgBBfU9KSgLgaGfq2u6vndAuCoQevhFnaQwyQ',
      }

      // create the Project
      const submitProjectTx = await registry.submitProject(metadata)
      await submitProjectTx.wait()

      await expect(registry.vote(projectId, VoteChoice.Null)).to.be.revertedWith('Vote must be either Up or Down')
    })
    it('should allow the user to Vote on the Project', async () => {
      const [owner] = await ethers.getSigners()
      const _owner = owner.address
      const registry = await buildContract()

      const projectSeqId = await registry.projectOwnerSeqIds(_owner)
      const projectId = BigNumber.from(utils.solidityKeccak256(['address', 'uint256'], [_owner, projectSeqId]))
      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'testing_name',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: 'https://ipfs.io/ipfs/QmUGoPveDHgBBfU9KSgLgaGfq2u6vndAuCoQevhFnaQwyQ',
      }

      // create the Project
      const submitProjectTx = await registry.submitProject(metadata)
      await submitProjectTx.wait()

      const voteTx = await registry.vote(projectId, VoteChoice.Up)
      expect(voteTx)
        .emit(registry, 'ProjectUpdated')
        .withArgs(
          projectId,
          _owner,
          metadata.name,
          metadata.subtitle,
          metadata.description,
          metadata.imageUrl,
          BigNumber.from(1),
          constants.Zero,
          BigNumber.from(1),
        )
      expect(voteTx).emit(registry, 'VoteSubmitted').withArgs(projectId, _owner, VoteChoice.Up)

      // get the vote
      const vote = await registry.getProjectVote(projectId, _owner)
      expect(vote).equal(VoteChoice.Up)
      // make sure the Project has the vote count
      const proposal = await registry.getProject(projectId)
      expect(proposal.upvotes).equal(BigNumber.from(1))
      expect(proposal.downvotes).equal(constants.Zero)
    })
    it('should be rejected if the user already voted on the Project', async () => {
      const [owner, addr1] = await ethers.getSigners()
      const _owner = owner.address
      const registry = await buildContract()

      const projectSeqId = await registry.projectOwnerSeqIds(_owner)
      const projectId = BigNumber.from(utils.solidityKeccak256(['address', 'uint256'], [_owner, projectSeqId]))
      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'testing_name',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: 'https://ipfs.io/ipfs/QmUGoPveDHgBBfU9KSgLgaGfq2u6vndAuCoQevhFnaQwyQ',
      }

      // create the Project
      const submitProjectTx = await registry.submitProject(metadata)
      await submitProjectTx.wait()

      // vote initially as addr1
      const voteTx = await registry.connect(addr1).vote(projectId, VoteChoice.Up)
      expect(voteTx)
        .emit(registry, 'ProjectUpdated')
        .withArgs(
          projectId,
          _owner,
          metadata.name,
          metadata.subtitle,
          metadata.description,
          metadata.imageUrl,
          BigNumber.from(1),
          constants.Zero,
          BigNumber.from(1),
        )
      expect(voteTx).emit(registry, 'VoteSubmitted').withArgs(projectId, addr1.address, VoteChoice.Up)
      // attempt to vote again, should fail
      await expect(registry.connect(addr1).vote(projectId, VoteChoice.Up)).to.be.revertedWith(
        'Can only vote once on a Project',
      )
    })
    it('should allow users to Upvote and Downvote', async () => {
      const [owner, addr1, addr2] = await ethers.getSigners()
      const _owner = owner.address
      const registry = await buildContract()

      const projectSeqId = await registry.projectOwnerSeqIds(_owner)
      const projectId = BigNumber.from(utils.solidityKeccak256(['address', 'uint256'], [_owner, projectSeqId]))
      const metadata: ProjectRegistry.ProjectMetadataStruct = {
        name: 'testing_name',
        subtitle: 'testing_subtitle',
        description: 'testing_description',
        imageUrl: 'https://ipfs.io/ipfs/QmUGoPveDHgBBfU9KSgLgaGfq2u6vndAuCoQevhFnaQwyQ',
      }

      // create the Project
      const submitProjectTx = await registry.submitProject(metadata)
      await submitProjectTx.wait()

      const voteTx = await registry.vote(projectId, VoteChoice.Up)
      await voteTx.wait()
      const downVote1Tx = await registry.connect(addr1).vote(projectId, VoteChoice.Down)
      await downVote1Tx.wait()
      const downVote2Tx = await registry.connect(addr2).vote(projectId, VoteChoice.Down)
      await downVote2Tx.wait()

      // make sure the Project has the vote count
      const proposal = await registry.getProject(projectId)
      expect(proposal.upvotes).equal(BigNumber.from(1))
      expect(proposal.downvotes).equal(BigNumber.from(2))
    })
  })
})
