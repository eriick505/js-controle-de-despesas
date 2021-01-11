const transactionsUL = document.querySelector('#transactions');
const balanceTotal = document.querySelector('#balance');
const moneyPlus = document.querySelector('#money-plus');
const moneyMinus = document.querySelector('#money-minus');
const formDisplay = document.querySelector('#form');
const nameDisplay = document.querySelector('#text');
const amountDisplay = document.querySelector('#amount');

var dummyTransactions = [
  { id: 0, name: 'violão', amount: -350 },
  { id: 1, name: 'computador', amount: -680 },
  { id: 2, name: 'salario', amount: 1500 },
  { id: 3, name: 'freela', amount: 600 },
  { id: 4, name: 'feira', amount: 310 }
];

const addValues = () => {
  const transactionsAmount = dummyTransactions.map(({amount}) => amount)

  const total = transactionsAmount
    .reduce((accumulator, amount) => { return accumulator + amount }, 0).toFixed(2)

  const income = transactionsAmount
    .filter(amount => amount > 0)
    .reduce((accumulator, amount) => { return accumulator + amount }, 0).toFixed(2)
  
  const expanse = Math.abs(transactionsAmount
    .filter(amount => amount < 0)
    .reduce((accumulator, amount) => { return accumulator + amount }, 0)).toFixed(2)

  balanceTotal.textContent = `R$ ${total}`
  moneyPlus.textContent = `R$ ${income}`
  moneyMinus.textContent = `R$ ${expanse}`
}

const addTransactionIntoDOM = ({ amount, name }) => {
  const li = document.createElement('li');
  const toggleClass = amount > 0 ? 'plus' : 'minus';
  const toggleOperator = amount < 0 ? '-' : '';
  const amountTransactionAbsolute = Math.abs(amount).toFixed(2);

  li.classList.add(toggleClass);
  li.innerHTML = `${name} <span>${toggleOperator} ${amountTransactionAbsolute}</span><button class="delete-btn">x</button>`;
  transactionsUL.append(li);

  addValues();
}

const init = () => {
  transactionsUL.innerHTML = '';
  dummyTransactions.forEach(addTransactionIntoDOM)
}
init();


formDisplay.addEventListener('submit', event => {
  event.preventDefault();

  const nameValue = nameDisplay.value.trim();
  const amountValue = Number(amountDisplay.value.trim());
  
  if(nameDisplay.value == '' || amountDisplay.value == '') {
    alert('Você precisa preencher os 2 campos')
    return;
  }

  var newTransaction = {
    id: 1,
    name: nameValue,
    amount: amountValue
  }

  dummyTransactions.push(newTransaction)
  nameDisplay.value = '';
  amountDisplay.value = '';

  init();
})