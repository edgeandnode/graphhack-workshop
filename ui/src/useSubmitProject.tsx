import { ProjectRegistry, ProjectRegistry__factory as ProjectRegistryFactory } from '@graphhack-workshop/contract'
import addresses from '@graphhack-workshop/contract/addresses.json'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { useEffect, useMemo, useState } from 'react'
import { useContractWrite } from 'wagmi'

export function useSubmitProject() {
  const rinkebyContractAddr = addresses['4'].ProjectRegistry.address
  const functionName: keyof ProjectRegistry['functions'] = 'submitProject'
  const {
    write,
    data: response,
    error,
    reset,
    isLoading,
  } = useContractWrite(
    { addressOrName: rinkebyContractAddr, contractInterface: ProjectRegistryFactory.abi },
    functionName,
  )

  const [lastSubmitted, setLastSubmitted] = useState<ProjectRegistry.ProjectMetadataStruct>()
  const addRecentTransaction = useAddRecentTransaction()
  useEffect(() => {
    const projectName = lastSubmitted?.name && `"${lastSubmitted.name}"`

    if (response) {
      addRecentTransaction({
        hash: response.hash,
        description: `Submit ${projectName || 'Project'}`,
        confirmations: 2,
      })
    }
    // ignoring `lastSubmitted`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, addRecentTransaction])

  return {
    write: useMemo(
      () => (project: ProjectRegistry.ProjectMetadataStruct) => {
        setLastSubmitted(project)
        write({ args: [project] })
      },
      [write],
    ),
    response,
    lastSubmitted,
    error,
    isLoading,
    reset: useMemo(
      () => () => {
        reset()
        setLastSubmitted(undefined)
      },
      [reset],
    ),
  }
}
