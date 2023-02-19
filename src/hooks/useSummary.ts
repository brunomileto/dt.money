import { useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';

import { TransactionsContext } from '../contexts/TransactionsContext';

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const summary = useMemo(() => {
    return transactions.reduce(
      (accumulator, transactions) => {
        if (transactions.type === "income") {
          accumulator.income += transactions.price;
          accumulator.total += transactions.price;
        } else {
          accumulator.outcome -= transactions.price;
          accumulator.total -= transactions.price;
        }
        return accumulator;
      },
      { income: 0, outcome: 0, total: 0 }
    );
  }, [transactions]);
  return summary;
}
