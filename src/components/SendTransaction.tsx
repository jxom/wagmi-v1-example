import { stringify } from 'viem';
import { useSendTransaction, useWaitForTransaction } from 'wagmi';

export function SendTransaction() {
  const { data, isIdle, isLoading, isError, sendTransaction } = useSendTransaction({
    request: {
      to: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b',
      value: 10000000000000000n, // 0.01 ETH
    },
  });
  const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  if (isLoading) return <div>Check Wallet</div>;

  if (isIdle)
    return (
      <button disabled={isLoading} onClick={() => sendTransaction()}>
        Send Transaction
      </button>
    );

  return (
    <div>
      {isPending && <div>Pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>Error sending transaction</div>}
    </div>
  );
}
