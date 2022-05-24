import { ProjectRegistry, ProjectRegistry__factory as ProjectRegistryFactory } from '@graphhack-workshop/contract'
import addresses from '@graphhack-workshop/contract/addresses.json'
import { BigNumberish } from 'ethers'
import { useAccount, useContractRead } from 'wagmi'

export const DIDNT_VOTE = 0
export const UPVOTE = 1
export const DOWNVOTE = 2
export type VoteChoice = typeof DIDNT_VOTE | typeof UPVOTE | typeof DOWNVOTE

export function useCurrentUserVote(projectId: BigNumberish) {
  const account = useAccount()

  const rinkebyContractAddr = addresses['4'].ProjectRegistry.address
  const functionName: keyof ProjectRegistry['functions'] = 'getProjectVote'

  const userAddress = account.data?.address
  const args: Parameters<ProjectRegistry['functions'][typeof functionName]> = [projectId, userAddress!]

  const { data, error } = useContractRead(
    { addressOrName: rinkebyContractAddr, contractInterface: ProjectRegistryFactory.abi },
    functionName,
    { args, enabled: !!userAddress },
  )

  if (error) {
    throw error
  }

  return data as VoteChoice | undefined
}
