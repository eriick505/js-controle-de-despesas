const transactionsUL = document.querySelector('#transactions');
const balanceTotal = document.querySelector('#balance');
const moneyPlus = document.querySelector('#money-plus');
const moneyMinus = document.querySelector('#money-minus');
const formDisplay = document.querySelector('#form');
const nameDisplay = document.querySelector('#text');
const amountDisplay = document.querySelector('#amount');

const formUpdateDisplay = document.querySelector('#updateForm');
const updateTextDisplay = document.querySelector('#updateText');
const updateAmountDisplay = document.querySelector('#updateAmount');

var dummyTransactions = [
  { id: 1, name: 'violão', amount: -350 },
  { id: 2, name: 'computador', amount: -680 },
  { id: 3, name: 'salario', amount: 1500 },
  { id: 4, name: 'freela', amount: 600 },
  { id: 5, name: 'feira', amount: 310 }
];

const addBalanceValues = () => {
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

const deleteTransaction = ID => {
  dummyTransactions = dummyTransactions.filter(transactions => transactions.id !== ID)

  addBalanceValues()
  init()
}

const activeUpdateForm = ID => {
  formUpdateDisplay.classList.add('animateSlideDown')

  var updateTransaction = dummyTransactions
    .filter((transaction, index) => index == ID)
    .reduce((accumulator, item) => {
      accumulator = item
      return accumulator
    }, {})

    updateTextDisplay.value = updateTransaction.name;
    updateAmountDisplay.value = updateTransaction.amount;

    formUpdateDisplay.addEventListener('submit', event => {
      event.preventDefault();
      
      updateTransaction.name = updateTextDisplay.value
      updateTransaction.amount = Number(updateAmountDisplay.value)

      dummyTransactions.splice(ID, 1, updateTransaction)

      formUpdateDisplay.classList.remove('animateSlideDown')
      
      addBalanceValues()
      init()

      updateTransaction = null;
    })
}

const addTransactionIntoDOM = ({ id, amount, name }, index) => {
  const li = document.createElement('li');
  const toggleClass = amount > 0 ? 'plus' : 'minus';
  const toggleOperator = amount < 0 ? '-' : '';
  const amountTransactionAbsolute = Math.abs(amount).toFixed(2);

  li.classList.add(toggleClass);
  li.innerHTML = `
  ${name} <span>${toggleOperator} R$ ${amountTransactionAbsolute}</span>
  <button onclick="deleteTransaction(${id})" class="delete-btn">x</button>
  <button onclick="activeUpdateForm(${index})" class="update-btn">⇄</button>
  `;
  transactionsUL.append(li);

  addBalanceValues();
}

const init = () => {
  transactionsUL.innerHTML = '';
  dummyTransactions.forEach(addTransactionIntoDOM)
}
init();

const clearInputs = (nameDisplay, amountDisplay) => {
  nameDisplay.value = '';
  amountDisplay.value = '';
}

const generateID = () => {
  return dummyTransactions.length + 1;
}

formDisplay.addEventListener('submit', event => {
  event.preventDefault();

  const nameValue = nameDisplay.value.trim();
  const amountValue = Number(amountDisplay.value.trim());
  const isInputEmpty = nameDisplay.value == '' || amountDisplay.value == ''
  
  if(isInputEmpty) {
    alert('Você precisa preencher os 2 campos')
    return;
  }

  var newTransaction = {
    id: generateID(),
    name: nameValue,
    amount: amountValue
  }

  dummyTransactions.push(newTransaction)
  clearInputs(nameDisplay, amountDisplay)
  nameDisplay.focus();

  init();
})