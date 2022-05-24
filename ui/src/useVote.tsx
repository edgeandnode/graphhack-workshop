import { BigNumber } from 'ethers'

import { useProjectRegistryWrite } from './useProjectRegistryWrite'

export function useVote(projectName: string) {
  return useProjectRegistryWrite('vote', {
    description: (_projectId, vote) => {
      return BigNumber.from(vote).eq(1) ? `Upvote "${projectName}"` : `Downvote "${projectName}"`
    },
  })
}
