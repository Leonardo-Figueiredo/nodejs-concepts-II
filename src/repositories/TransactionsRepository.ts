import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.map(transaction =>
      transaction.type === 'income' ? transaction.value : 0,
    );

    const outcome = this.transactions.map(transaction =>
      transaction.type === 'outcome' ? transaction.value : 0,
    );

    const incomeBalance =
      income.length !== 0 ? income.reduce((total, next) => total + next) : 0;

    const outcomeBalance =
      outcome.length !== 0 ? outcome.reduce((total, next) => total + next) : 0;

    const balance = {
      income: incomeBalance,
      outcome: outcomeBalance,
      total: incomeBalance - outcomeBalance,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
