import { crypto, ByteArray, Address, BigInt } from '@graphprotocol/graph-ts'

/**
 * Create a keccak256 hash of the given value.
 * Return the hex string representation of this hash.
 * @param value the value to hash
 * @returns the hashed, keccak256 value in hex format: 0x
 */
export function keccakString(value: string): string {
  return crypto.keccak256(ByteArray.fromUTF8(value)).toHexString()
}

/**
 * Create a keccak256 hash of the concatenated voter and project id.
 * Return the hashed string in hex format: 0x.
 * Format: `Vote:${projectId}/${voter}`
 * @param voter the eth address of the user who voted on the Project
 * @param projectId the ID of the project that the user voted on
 * @returns the hashed, keccack256, hex string of the vote id
 */
export function buildVoteId(voter: Address, projectId: BigInt): string {
  return keccakString(`Vote:${projectId.toString()}/${voter.toHexString()}`)
}

// Handling enums in Graph Node:
// https://github.com/graphprotocol/everest/blob/545c2efe989fe81c57492b080e5432ecda1ebea1/subgraph/src/mappings/helpers.ts#L70
export function buildVoteChoice(vote: number): string {
  if (vote === 1) {
    return 'UP'
  } else if (vote === 2) {
    return 'DOWN'
  }

  return 'UNKNOWN'
}
