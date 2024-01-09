'use strict';

// ******************************************************************************************************************************

// ***************** CHALLENGE-1 ****************
const checkDogs = function (dogJulia, dogKate) {
  const dogJuliaCorrect = dogJulia.slice();
  dogJuliaCorrect.splice(0, 1);
  dogJuliaCorrect.splice(-2);
  // console.log(dogJulia.slice(1, 3));
  console.log(dogJuliaCorrect);
  const dogs = dogJuliaCorrect.concat(dogKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} ia an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// ***************** CHALLENGE-2 ****************

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAge);
  const adults = humanAge.filter(age => age >= 18);
  console.log(adults);

  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  return average;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// ***************** CHALLENGE-3 ****************

const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]));

// ***************** CHALLENGE-4 ****************
const dogs = [
  { weigth: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weigth: 8, curFood: 200, owners: ['Matilda'] },
  { weigth: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weigth: 32, curFood: 340, owners: ['Michael'] },
];
// 1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weigth ** 0.75 * 28)));
console.log(dogs);

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eatting too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  } food`
);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
// .map(dog => dog.owners)
// .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
const checkEatOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatOkay));

// 7.
console.log(dogs.filter(checkEatOkay));

// 8.
const dogSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogSorted);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1 ;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
// const movementsUSD = movements.map(mov => mov * eurToUsd);
// console.log(movements);
// console.log(movementsUSD);

// const movementsUDSfor = [];
// for (const mov of movements) {
//   movementsUDSfor.push(mov * eurToUsd);
// }
// console.log(movementsUDSfor);

// const movemntDescription = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movemntDescription);

// const deposit = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposit);

// const widthdrawal = movements.filter(mov => mov < 0);
// console.log(widthdrawal);

// ACCUMULATOR -> SNOWBALL

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(movements);
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance);

// // ACCUMULATOR USING ARRAW
// const balancee = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balancee);

// MAXIMUM VALUE

// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

// EUR TO USD CONVERT
// const eurToUsd = 1.108;

// const totalDisopitUSD = movements
//   .filter(mov => mov > 0) // filter , map return array
//   .map((mov, i, arr) => {
//     return mov * eurToUsd;
//   })
//   // .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0); //reduce return a value
// console.log(movements);
// console.log('EUR to USD ' + totalDisopitUSD);

// FIND METHOS.......

// const firstWithdral = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdral);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jeena Mobeen');
// console.log(account);

// console.log(movements);
// INCLUDES & SOME MATHHOD...

// // QUALITY
// console.log(movements.includes(-400));
// // CONDITION
// console.log(movements.some(mov => mov === -130));
// const anyDeposit = movements.some(mov => mov > 0);
// console.log(anyDeposit);

// // EVERY METHOD
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// REMOVE NESTED ARRAY
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr);
// // making nested to one array
// console.log(arr.flat());

// const deepArr = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(deepArr);
// console.log(deepArr.flat(2));

// const accountMovement = accounts.map(acc => acc.movements);
// console.log(accountMovement);
// const allMovements = accountMovement.flat();
// console.log(allMovements);
// const overBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overBalance);

// // ANOTHER SHORTCUT....
// const totalOverallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalOverallBalance);

// // FLATMAP METHOD CONBINE MAP AND FLAT...

// const totalOverallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalOverallBalance2);

//*-*-*-*-*-*-*ARRAY METHODS-*-*-*-*-*-*-*-*-*-*-*-*-*-*
// show all array in account (Map)
// combine all allary in 1 array (flat)
// const bankDepositSum = accounts.map(acc => acc.movements).flat();
// another way (flatMap)

// EX-1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositSum);

// EX-2
// how many deposit >=1000
const deposit1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(deposit1000);

// EX-3
const { deposit, withdraw } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
      // cur > 0 ? (sum.deposit += cur) : (sum.withdraw += cur);
      sum[cur > 0 ? 'deposit' : 'withdraw'] += cur;
      return sum;
    },
    { deposit: 0, withdraw: 0 }
  );
console.log(deposit, withdraw);

// EX-4
// create a function to convert any string to title case
const convertTileCase = function (title) {
  const exception = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exception.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return titleCase;
};

console.log(convertTileCase('this is a nice title'));
console.log(convertTileCase('this is a nice LONG title but not to long'));
console.log(convertTileCase('and here is another title with an EXAMPLE'));
