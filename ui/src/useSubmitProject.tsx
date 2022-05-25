import { ProjectRegistry, ProjectRegistry__factory as ProjectRegistryFactory } from '@graphhack-workshop/contract'
import addresses from '@graphhack-workshop/contract/addresses.json'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { useEffect, useMemo } from 'react'
import { useContractWrite } from 'wagmi'

export function useSubmitProject() {
  const rinkebyContractAddr = addresses['4'].ProjectRegistry.address
  const functionName: keyof ProjectRegistry['functions'] = 'submitProject'
  const {
    write,
    data: response,
    error,
  } = useContractWrite(
    { addressOrName: rinkebyContractAddr, contractInterface: ProjectRegistryFactory.abi },
    functionName,
  )

  const addRecentTransaction = useAddRecentTransaction()
  useEffect(() => {
    if (response) {
      addRecentTransaction({
        hash: response.hash,
        description: 'submitProject',
        confirmations: 2,
      })
    }
  }, [response, addRecentTransaction])

  return {
    write: useMemo(() => (project: ProjectRegistry.ProjectMetadataStruct) => write({ args: [project] }), [write]),
    response,
    error,
  }
}
