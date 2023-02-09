const fs = require('fs')
const service = require('./service');
const logger = require('./logger');
const readCSV = require('./readcsv')
const {fileStream, headers} = require('./utils')

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;



app.get('/', (req, res, next) => {
  const path = '/'
  if (req.path === path) {
    res.status(200).send('ttest_v2')
    logger.info('/ 200')
  }
  else {
    res.status(404).send()
    logger.info('/ 404')
  }
  next()
});

app.get('/friends', async (req, res, next) => {
  const friends = await readCSV.getFriendsCSV()

  if (friends) {
    logger.info('/friends 200')
    res.status(200).send(friends)
  } 
  else {
    logger.info('/friends 404')
    res.status(404).send()
  }
  next();
});

app.get('/friends/:id', async (req, res, next) => {
  const friends = await readCSV.getFriendsCSV()
  const friend = friends[req.params.id]

  if (friend) {
    logger.info('/friends/:id 200')
    res.status(200).send(friend)
  } 
  else {
    logger.info('/friends/:id 404')
    res.status(404).send('404')
  }
  next();
});

app.get('/wish', (req, res, next) => {
  const email = 'email'
  const sms = 'sms'
  if (req.query.service === email) {
    logger.info('200')
    service.sendEmail()
    res.status(200).send('200')
  }
  else if (req.query.service === sms) {
    logger.info('200')
    service.sendEmail
    res.status(200).send('200')
  }
  else {
    logger.info('404')
    res.status(404).send('404')
  }
})

app.post('/friends', (req, res, next) => {
  const newFriend = req.query
  if (newFriend.last_name !== undefined && newFriend.first_name !== undefined && newFriend.date_of_birth !== undefined && newFriend.email !== undefined) {
    fileStream.write(`${newFriend.last_name}, ${newFriend.first_name}, ${newFriend.date_of_birth}, ${newFriend.email}\n`)
    logger.info('/friends 201')
    res.status(201).send('201')
  }
  else {
    logger.info('/friends 400')
    res.status(400).send('400')
  }
  next()
});

app.put('/friends/:id', async (req, res, next) => {
  const friends = await readCSV.getFriendsCSV()
  const friend = req.query
  const id = req.params.id
  if (friend.last_name !== undefined && friend.first_name !== undefined && friend.date_of_birth !== undefined && friend.email !== undefined) {
    friends[id] = friend
    const fileStreamUpdate = fs.createWriteStream('people.csv')
    fileStreamUpdate.write(`${headers}\n`);
    friends.forEach((element) => {
      fileStreamUpdate.write(`${element.last_name}, ${element.first_name}, ${element.date_of_birth}, ${element.email}\n`)
    })
    logger.info('/friends/:id 200')
    res.status(200).send('200')
  }
  else {
    logger.info('/friends/:id 400')
    res.status(400).send('400')
  }

});

app.delete('/friends/:id', async (req, res, next) => {
  const friends = await readCSV.getFriendsCSV()
  const friend = friends[req.params.id]
  if (friend) {
    friends.splice(req.params.id, 1)
    const fileStreamUpdate = fs.createWriteStream('people.csv')
    fileStreamUpdate.write(`${headers}\n`);
    friends.forEach((element) => {
      fileStreamUpdate.write(`${element.last_name}, ${element.first_name}, ${element.date_of_birth}, ${element.email}\n`)
    })
    res.status(204).send('204')
  }
  else {
    logger.info('/friends/:id 404')
    res.status(404).send('404')
  }
  next()
});

app.listen(PORT, () => {
  logger.info(`Listening ${PORT}`)
});




