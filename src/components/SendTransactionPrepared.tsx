import { stringify } from 'viem';
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi';

export function SendTransactionPrepared() {
  const { config } = usePrepareSendTransaction({
    request: { to: 'moxey.eth', value: 10000000000000000n },
  });
  const { data, isIdle, isLoading, isError, sendTransaction } = useSendTransaction(config);
  const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  if (isLoading) return <div>Check Wallet</div>;

  if (isIdle)
    return (
      <button disabled={isLoading || !sendTransaction} onClick={() => sendTransaction?.()}>
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
