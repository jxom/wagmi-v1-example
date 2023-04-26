import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

import { wagmiContractConfig } from './contracts';
import { stringify } from 'viem';

export function WriteContract() {
  const [tokenId, setTokenId] = useState<string>('');

  const { write, data, error, isLoading, isError } = useContractWrite({
    ...wagmiContractConfig,
    functionName: 'mint'
  });
  const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  return (
    <div>
      <div>Mint a wagmi:</div>
      <div>
        <input onChange={(e) => setTokenId(e.target.value)} placeholder="token id" value={tokenId} />
        <button disabled={isLoading} onClick={() => write({ args: [BigInt(tokenId)] })}>
          Mint
        </button>
      </div>
      {isPending && <div>Pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{error?.message}</div>}
    </div>
  );
}
