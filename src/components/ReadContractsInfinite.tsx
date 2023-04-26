import { stringify } from 'viem'
import { paginatedIndexesConfig, useContractInfiniteReads } from 'wagmi'
import { wagmiContractConfig } from './contracts'

export function ReadContractsInfinite() {
  const { data, isLoading, isSuccess, fetchNextPage } =
    useContractInfiniteReads({
      cacheKey: 'lootTokenURIs',
      ...paginatedIndexesConfig(
        (index: number) => [
          {
            ...wagmiContractConfig,
            functionName: 'ownerOf',
            args: [BigInt(index)] as const,
          },
        ],
        { start: 0, perPage: 10, direction: 'increment' },
      ),
    })

  return (
    <div>
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <>
          {data?.pages.map((data) => (
            // eslint-disable-next-line react/jsx-key
            <div>{data.flatMap(x => <pre>{stringify(x)}</pre>)}</div>
          ))}
          <button onClick={() => fetchNextPage()}>Fetch more</button>
        </>
      )}
    </div>
  )
}
