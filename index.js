const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

let person = {
  firstName: 'Amit',
  lastName: 'Sharma',
  gender: 'male',
  age: 30,
  isMember: true,
};

app.get('/person', (req, res) => {
  res.json(person);
});

function getFullName(person) {
  return person.firstName + ' ' + person.lastName;
}

app.get('/person/fullname', (req, res) => {
  let isFullName = getFullName(person);
  res.json({ fullName: isFullName });
});

function getFirstNameAndGender(person) {
  return {
    firstName: person.firstName,
    gender: person.gender,
  };
}

app.get('/person/firstname-gender', (req, res) => {
  let isFirstNameAndGender = getFirstNameAndGender(person);
  res.json(isFirstNameAndGender);
});

function getIncrementedAge(person) {
  person.age = person.age + 1;
  return person;
}

app.get('/person/increment-age', (req, res) => {
  let isIncrementedAge = getIncrementedAge(person);
  res.json(isIncrementedAge);
});

function getFullNameAndMembership(person) {
  let isFullName = getFullName(person);
  return {
    fullName: isFullName,
    isMember: person.isMember,
  };
}

app.get('/person/fullname-membership', (req, res) => {
  let isFullNameAndMembership = getFullNameAndMembership(person);
  res.json(isFullNameAndMembership);
});

function getFinalPrice(cartTotal, person) {
  let priceFinal;
  if (person.isMember === true) {
    priceFinal = cartTotal - cartTotal * 0.1;
  } else {
    priceFinal = cartTotal;
  }
  return priceFinal;
}

app.get('/person/final-price', (req, res) => {
  let cartTotal = req.query.cartTotal;
  let isFinalPrice = getFinalPrice(cartTotal, person);
  res.json({ finalprice: isFinalPrice.toFixed(2) });
});

function getShippingCost(cartTotal, person) {
  let shippingCost;
  if (cartTotal > 500 && person.isMember === true) {
    shippingCost = 0;
  } else {
    shippingCost = 99;
  }
  return shippingCost;
}

app.get('/person/shipping-cost', (req, res) => {
  let cartTotal = req.query.cartTotal;
  let finalShippingCost = getShippingCost(cartTotal, person);
  res.json({ shippingCost: finalShippingCost.toFixed(2) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
