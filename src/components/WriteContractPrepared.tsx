import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { stringify } from 'viem';

import { wagmiContractConfig } from './contracts';

export function WriteContractPrepared() {
  const { config } = usePrepareContractWrite({
    ...wagmiContractConfig,
    functionName: 'mint',
  });
  const { write, data, error, isLoading, isError } = useContractWrite(config);
  const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  return (
    <div>
      <div>Mint a wagmi:</div>
      <button disabled={isLoading || !write} onClick={() => write?.()}>
        Mint
      </button>
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
