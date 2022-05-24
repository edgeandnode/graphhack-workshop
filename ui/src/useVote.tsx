import { BigNumber } from 'ethers'

import { useProjectRegistry } from './useProjectRegistry'

export function useVote(projectName: string) {
  return useProjectRegistry('vote', {
    description: (_projectId, vote) => {
      return BigNumber.from(vote).eq(1) ? `Upvote ${projectName}` : `Downvote ${projectName}`
    },
  })
}
