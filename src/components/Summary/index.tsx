import { Container } from "./style";
import outcomeImg from "../../assets/outcome.svg";
import incomeImg from "../../assets/income.svg";
import totalImg from "../../assets/total.svg";
import { formatCurrency } from "../../utils";
import { useTransactions } from "../../hooks/useTransactions";

export const Summary = () => {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (accumulator, transaction) => {
      if (transaction.type === "deposit") {
        accumulator.deposits += transaction.amount;
        accumulator.total += transaction.amount;
      } else {
        accumulator.withdraws += transaction.amount;
        accumulator.total -= transaction.amount;
      }
      return accumulator;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p> <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{formatCurrency(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p> <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>-{formatCurrency(summary.withdraws)}</strong>
      </div>

      <div className="highlight">
        <header>
          <p>Total</p> <img src={totalImg} alt="total" />
        </header>
        <strong>-{formatCurrency(summary.total)}</strong>
      </div>
    </Container>
  );
};
