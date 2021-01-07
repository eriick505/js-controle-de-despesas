const transactionsUL = document.querySelector('#transactions');
const balanceTotal = document.querySelector('#balance');
const moneyPlus = document.querySelector('#money-plus')
const moneyMinus = document.querySelector('#money-minus')

const dummyTransactions = [
  { id: 0, name: 'violão', amount: -350 },
  { id: 1, name: 'computador', amount: -680 },
  { id: 2, name: 'salario', amount: 1500 },
  { id: 3, name: 'freela', amount: 600 },
  { id: 4, name: 'feira', amount: 310 }
];

const addValues = transactionsAmount => {
  const income = transactionsAmount
  .filter(amount => amount > 0)
  .reduce((accumulator, amount) => { return accumulator + amount }, 0)
  
  const expanse = Math.abs(transactionsAmount
    .filter(amount => amount < 0)
    .reduce((accumulator, amount) => { return accumulator + amount }, 0))

  const total = transactionsAmount
    .reduce((accumulator, amount) => { return accumulator + amount }, 0)

  balanceTotal.textContent = `R$ ${total}`
  moneyPlus.textContent = `R$ ${income}`
  moneyMinus.textContent = `R$ ${expanse}`
}

const addTransactionIntoDOM = ({ amount, name }) => {
  const li = document.createElement('li');
  const toggleClass = amount > 0 ? 'plus' : 'minus';
  const toggleOperator = amount < 0 ? '-' : '';
  const amountTransactionAbsolute = Math.abs(amount);

  li.classList.add(toggleClass);
  li.innerHTML = `${name} <span>${toggleOperator} ${amountTransactionAbsolute}</span><button class="delete-btn">x</button>`;
  transactionsUL.append(li);

  const transactionsAmount = dummyTransactions.map(({amount}) => amount)

  addValues(transactionsAmount);
}

const init = () => {
  dummyTransactions.forEach(addTransactionIntoDOM)
}
init();
