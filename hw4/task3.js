class BankAccount {
  /** @type {number} */
  #balance;

  constructor(balance = 1000) {
    this.#balance = balance;
  }

  get balance() {
    return this.#balance;
  }

  get formattedBalance() {
    return `$${this.#balance}`;
  }

  /**
   * @param {number} value
   */
  set balance(value) {
    this.#balance = value;
  }

  transfer(targetAccount, amount) {
    if (!(targetAccount instanceof BankAccount)) {
      throw new Error("Target must be a BankAccount");
    }

    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Amount must be a positive number");
    }

    if (this.#balance < amount) {
      throw new Error("Insufficient funds for transfer");
    }

    this.#balance -= amount;
    targetAccount.balance += amount;
  }
}

const bankAccount = new BankAccount();
console.log(bankAccount.formattedBalance);
bankAccount.balance = 2500;
console.log(bankAccount.formattedBalance);

console.log("----- Transfer -----");
const alice = new BankAccount(3000);
const bob = new BankAccount(500);
console.log(alice.formattedBalance);
console.log(bob.formattedBalance);
alice.transfer(bob, 500);
console.log(alice.formattedBalance);
console.log(bob.formattedBalance);
