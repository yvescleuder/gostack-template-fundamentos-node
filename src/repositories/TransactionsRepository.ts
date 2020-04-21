import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Response {
    const transactionsComplete = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return transactionsComplete;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((accumulator, current) => {
      if (current.type === 'income') return accumulator + current.value;

      return accumulator;
    }, 0);

    const outcome = this.transactions.reduce((accumulator, current) => {
      if (current.type === 'outcome') return accumulator + current.value;

      return accumulator;
    }, 0);

    this.balance.income = income;
    this.balance.outcome = outcome;
    this.balance.total = this.balance.income - this.balance.outcome;

    return this.balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
