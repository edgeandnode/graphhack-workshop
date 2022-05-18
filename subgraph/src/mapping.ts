import { Address, BigInt, log } from '@graphprotocol/graph-ts'

import { ProjectUpdated, VoteSubmitted } from '../generated/ProjectRegistry/ProjectRegistry'
import { User, Vote, Project } from '../generated/schema'
import { buildVoteId, buildVoteChoice } from './utils'

/**
 * Attempt to find a user by their eth address, which is their stored id.
 * If the user is found, return.
 * Otherwise, create a new User record and store it.
 * @param address the user eth address
 * @param timestamp block timestamp
 * @returns the found, or created, User record
 */
function findOrCreateUser(address: Address, timestamp: BigInt): User {
  const id = address.toHexString()
  const user = User.load(id)
  if (user != null) {
    return user
  }

  const createUser = new User(id)
  createUser.projects = []
  createUser.votes = []
  createUser.createdAt = timestamp
  createUser.updatedAt = timestamp
  createUser.save()

  return createUser
}

/**
 * When a Project is submitted, or updated, onchain, the ProjectRegistry contract
 * emits the ProjectUpdated event.
 * This event contains the Project metadata as well as the owner and vote counts.
 * Contracts actions that emit the ProjectUpdated event:
 * - a new Project is submitted by a User: ProjectRegistry.submitProject
 * - an existing Project metadata is updated by the Project owner: ProjectRegistry.updateProjectMetadata
 * - an existing Project is voted on by a User: ProjectRegistry.vote
 * Update the Project data in the subgraph.
 * @param event The emitted ProjectUpdated event from the contract onchain
 */
export function handleProjectUpdated(event: ProjectUpdated): void {
  const timestamp = event.block.timestamp
  const projectId = event.params.projectId
  const owner = event.params.owner
  const name = event.params.owner
  const subtitle = event.params.subtitle
  const description = event.params.description
  const imageUrl = event.params.imageUrl
  const upvotes = event.params.upvotes
  const downvotes = event.params.downvotes
  const voteCount = event.params.voteCount

  log.debug(`mapping.handleProjectUpdated() - processing the upsert of Project [${projectId.toString()}]`, [])

  if (name.byteLength === 0 || imageUrl == null || owner.byteLength === 0) {
    log.warning(`mapping.handleProjectUpdated() - event invalid. skipping...`, [])
    return
  }

  // find or create the owner on the Project
  const _owner = findOrCreateUser(owner, timestamp)

  // check if the Project already exists, if not, instantiate a new Project
  let project = Project.load(projectId.toString())
  if (project == null) {
    project = new Project(projectId.toString())
  }
  // update the Projet properties and save
  project.owner = _owner.id
  project.name = name.toString()
  project.subtitle = subtitle
  project.description = description
  project.imageUrl = imageUrl
  project.upvotes = upvotes.toI32()
  project.downvotes = downvotes.toI32()
  project.voteCount = voteCount.toI32()
  project.createdAt = timestamp
  project.updatedAt = timestamp
  project.save()

  // add the Project to the list of user Projects
  if (_owner.projects == null) {
    _owner.projects = [project.id]
  } else {
    _owner.projects!.push(project.id)
  }
  _owner.save()
}

/**
 * When a Project is voted on by a User, the ProjectRegistry contract
 * emits the VoteSubmitted event.
 * This event contains the Project ID, the voter address, and their vote (UP/DOWN).
 * Create a new Vote entity.
 * Add the Vote entity to both the User.votes and Project.votes arrays
 * @param event the emitted VoteSubmitted event from the contract onchain
 */
export function handleVoteSubmitted(event: VoteSubmitted): void {
  const voter = event.params.voter
  const projectId = event.params.projectId
  const vote = event.params.vote
  log.debug(
    `mapping.handleVoteSubmitted() - processing vote submitted on Project [${projectId.toString()}] by User [${voter.toHexString()}]`,
    [],
  )

  const timestamp = event.block.timestamp
  // get the User who submitted the vote
  const user = findOrCreateUser(voter, timestamp)
  // get the Project the vote was submitted for
  const project = Project.load(projectId.toString())
  if (project == null) {
    log.warning(
      `mapping.handleVoteSubmitted() - unable to find Project that was voted on [${projectId.toString()}]`,
      [],
    )
    return
  }

  const voteChoice = buildVoteChoice(vote)
  const voteId = buildVoteId(voter, projectId)
  // create a new Vote entity and store it
  const createdVote = new Vote(voteId)
  createdVote.user = user.id
  createdVote.project = project.id
  createdVote.vote = voteChoice
  createdVote.timestamp = timestamp
  createdVote.save()

  // add the vote to the User.votes and Project.votes
  if (user.votes == null) {
    user.votes = [createdVote.id]
  } else {
    user.votes!.push(createdVote.id)
  }
  user.save()

  if (project.votes == null) {
    project.votes = [createdVote.id]
  } else {
    project.votes!.push(createdVote.id)
  }
  project.save()
}
