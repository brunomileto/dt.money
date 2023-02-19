import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';

import { useSummary } from '../../hooks/useSummary';
import { priceFormatter } from '../../utils/Formatter';
import { SummaryCard, SummaryContainer } from './style';

export function Summary() {
  const summary = useSummary();
  // Separando a lógica abaixo, em um hook !

  // const summary = transactions.reduce(
  //   (accumulator, transaction) => {
  //     if (transaction.type === "income") {
  //       accumulator.income += transaction.price;
  //       accumulator.total += transaction.price;
  //     } else {
  //       accumulator.outcome += transaction.price;
  //       accumulator.total -= transaction.price;
  //     }
  //     return accumulator;
  //   },
  //   { income: 0, outcome: 0, total: 0 }
  // ); // reduce percorre um array e transforma em uma outra estrutura de dados
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#F75A68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
