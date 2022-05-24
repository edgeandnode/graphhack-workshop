import { ProjectRegistry, ProjectRegistry__factory as ProjectRegistryFactory } from '@graphhack-workshop/contract'
import addresses from '@graphhack-workshop/contract/addresses.json'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { useEffect, useMemo, useState } from 'react'
import { useContractWrite } from 'wagmi'

type Args<TFunctionName extends keyof ProjectRegistry['functions']> = Parameters<
  ProjectRegistry['functions'][TFunctionName]
>

export function useProjectRegistry<TFunctionName extends keyof ProjectRegistry['functions']>(
  functionName: TFunctionName,
  options: { description: (...args: Args<TFunctionName>) => string },
) {
  const rinkebyContractAddr = addresses['4'].ProjectRegistry.address
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

  const [lastArgs, setLastArgs] = useState<Args<TFunctionName>>()
  const addRecentTransaction = useAddRecentTransaction()
  useEffect(() => {
    if (response) {
      addRecentTransaction({
        hash: response.hash,
        description: options.description(...lastArgs!),
        confirmations: 2,
      })
    }
    // ignoring `lastArgs` and `options.description`
    // this effect will run only when response changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, addRecentTransaction])

  return {
    write: useMemo(
      () =>
        (...args: Args<TFunctionName>) => {
          setLastArgs(args)
          write({ args })
        },
      [write],
    ),
    response,
    lastArgs,
    error,
    isLoading,
    reset: useMemo(
      () => () => {
        reset()
        setLastArgs(undefined)
      },
      [reset],
    ),
  }
}
