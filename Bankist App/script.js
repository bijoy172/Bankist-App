'use strict';

//******************  BANKIST APP ***************//

// DATA-> some demo accounts.
const account1 = {
  owner: 'Hamid Bijoy Chowdhury',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-02-22T21:31:17.178Z',
    '2023-02-23T07:42:02.383Z',
    '2023-02-24T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-09-24T17:01:17.194Z',
    '2023-09-23T23:36:17.929Z',
    '2023-09-22T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jibon Chowdhury',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5, // %
  pin: 2222,

  movementsDates: [
    '2023-01-01T13:15:33.035Z',
    '2023-01-30T09:48:16.867Z',
    '2023-02-25T06:04:23.907Z',
    '2023-03-25T14:18:46.235Z',
    '2023-04-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Jeena Mobeen',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7, // %
  pin: 3333,

  movementsDates: [
    '2023-01-01T13:15:33.035Z',
    '2023-01-30T09:48:16.867Z',
    '2023-02-25T06:04:23.907Z',
    '2023-03-25T14:18:46.235Z',
    '2023-04-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Jonas Schmedtmann',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1, // %
  pin: 4444,

  movementsDates: [
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
//  SELECTING ELEMENTS....
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions/////////////////////////////////

//
const formateMovementDate = function (date, locale) {
  // DISPLAY DATE

  const calcDayPass = (day1, day2) =>
    Math.round(Math.abs(day2 - day1) / (1000 * 60 * 60 * 24));

  const dayPass = calcDayPass(new Date(), date);
  // console.log(dayPass);

  if (dayPass === 0) return 'Today';
  if (dayPass === 1) return 'Yesterday';
  if (dayPass <= 7) return `${dayPass} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }
  return new Intl.DateTimeFormat(locale).format(date);
};

// FORMAT CURRENCY
const formatCur = function (value, locale, currency) {
  // currency......
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// FUNCTION TO ADD MOVEMENTS...
const displayMovements = function (acc, sort = false) {
  // INITIALLY MOVEMENTS CONTAINER MAKES EMPTY
  containerMovements.innerHTML = '';

  // SORTING MOVEMENTS
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formateMovementDate(date, acc.locale);

    // Currency
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>

      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html); //TWO PERAMETER 1. POSITION WHERE WE INSERT OR ADD THE HTML; 2.STRING THAT CONTAIN THE HTML.
  });
};

// CURRENT TOTAL BALANCE
// ACCUMULATOR(like iteration) USING reduce function
// acc = Accumulator it start with 0 & mov = current movements value.
// reduce = boil the array or return total sum, mul, anything value of the array
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

// INCOME, OUTCOME, INTERREST VALANCE TOTAL....
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1; //here retun the intersest that is  >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

// CREATING USER NAME......................
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// LOG OUT TIMER
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // in each call, print the remaing time in UI
    labelTimer.textContent = `${min}: ${sec}`;

    // when 0 second stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent =
        'Opps!! you are Log Out, Log in to get started';
      containerApp.style.opacity = 0;
    }
    // Decrese time 1s
    time--;
  };

  // set time to n minutes
  let time = 300;
  // call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
// IMPLEMENTING LOGIN.....
let currentAccount, timer;

// // FACE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// LOG IN BUTTON
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  // currentAccount? = CURRENT ACCOUNT EXIT OR NOT
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // ADDING DATE AND  TIME with API's

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // // const hour = now.getHours();
    // // const min = now.getMinutes();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = now;

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // Focus out.
    inputLoginPin.blur();
    // timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

// TRANSFE MONEY FROM ONE TO ANOTHER ACCOUNT
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());

    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);

    // RESET TIMER
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// REQUEST LOAN..................
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // RESET TIMER
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

// CLOSE ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});
// SORTING MOVEMENTS....
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// // COLOR ROW TO CLICK IN BALANCE 0, 2, 4, 6... INDEX
// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';

//     //COLOR ROW TO CLICK IN BALANCE 0, 3, 6, 9... INDEX
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

// CREATE DATE
/*
const newDate = new Date();
console.log(newDate);
console.log(new Date('Sep 22 2023 19:20:02'));
console.log(new Date('December 24, 2023'));
console.log(new Date(3 * 24 * 60 * 60 * 1000));
*/

// WORKING DATES..
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);

// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());

// console.log(new Date(2142235380000));
// console.log(Date.now());
// future.setFullYear(2040);
// console.log(future);

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

// const calcDayPass = (day1, day2) =>
//   Math.abs(day2 - day1) / (1000 * 60 * 60 * 24);

// const day1 = calcDayPass(new Date(2023, 3, 14), new Date(2023, 3, 4));

// console.log(day1);

// NUMBER FORMAT

// const num = 324854.354;

// const option = {
//   style: 'unit', //unit, percent, currency
//   unit: 'mile-per-hour',
// };
// console.log('US: ', new Intl.NumberFormat('en-US', option).format(num));
// console.log('Germany: ', new Intl.NumberFormat('de-DE', option).format(num));
// // console.log(
// //   navigator.language,
// //   new Intl.NumberFormat('navigator.language').format(num)
// // );

// SET TIME OUT

// const ingrediant = ['olives', 'spinach'];

// const pizzaTimer = setTimeout(
//   (ing1, ing2) =>
//     console.log(`Here is your pizza with ${ing1} and ${ing2}🍕🍕`),
//   4000,
//   ...ingrediant
// );
// console.log('Waiting....');

// if (ingrediant.includes('spinach')) clearTimeout(pizzaTimer);

// //SET INTERVAL

// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);
