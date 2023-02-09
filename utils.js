const fs = require('fs');

const getToday = () => { 
  let today;
  let newDate = new Date()
  newDate = newDate
    .toISOString()
    .substring(0, 10)
    .split("")
  newDate[4] = '/';
  newDate[7] = '/';
  today = newDate.join("")
  // today = '2023/02/28'// type specific date for testing
  return today
};
  
const getEmail = () => {
  let email = (`Subject: Happy Birthday! \nHappy birthday, dear`)
  return email
};
  
const getSMS = () => {
  const sms = (`Happy Birthday! \nHappy birthday, dear`)
  return sms
};

const getIsItSkipYear = () => {
  let year = new Date().getFullYear()
  // year = 2000; // type specific date for testing
  let test = year/4 - Math.floor(year/4)
  if (test === 0) {
    return true
  }

  else {
    return false
  }
};

const fileStream = fs.createWriteStream('people.csv', {flags: 'a'});

const headers = 'last_name, first_name, date_of_birth, email'

/*
const getElementById = (id, elementList) => {
  return elementList.find((element) => {
    return element.id === Number(id)
  })
}; 
*/

  module.exports = {
    getToday,
    getEmail,
    getSMS,
    getIsItSkipYear,
    // getElementById,
    fileStream,
    headers
  };