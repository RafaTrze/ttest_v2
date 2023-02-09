
const utils = require('./utils');
const readCSV = require('./readcsv');
const logger = require('./logger');

const feb29 = '02/29';
const feb28 = '02/28';

const today = utils.getToday();
const isItSkipYear = utils.getIsItSkipYear();
const email = utils.getEmail();


const sendEmail = async () => {
	const promiseArray = await Promise.all([readCSV.getFriendsCSV()]) // Promise.all to take advantage from concurency
	const friends = promiseArray[0];
	// const friends = promiseArray[1];
	// logger.info(friends);
	logger.info(`email, It is: ${today}`)
	// logger.info(isItSkipYear)

	if (isItSkipYear) {
		friends.forEach((element) => {
			if (element.date_of_birth.substring(5) === today.substring(5)) {
				logger.info(`${email} ${element.first_name}!`)
		  }
			else {
				// NO ACTION
				logger.info(`email, is it skip year = true, no birthday ${element.first_name}!`)
			}
		})
	}
	else {
		if (today.substring(5) === feb28) {
			friends.forEach((element) => {
				if (element.date_of_birth.substring(5) === today.substring(5) || element.date_of_birth.substring(5) === feb29) {
					logger.info(`${email} ${element.first_name}!`)
				}
				else {
					// NO ACTION
					logger.info(`email, is it skip year = false, feb28 = true, no birthday ${element.first_name}!`)
				}
			})  
		}
		else {
			friends.forEach((element) => {
				if (element.date_of_birth.substring(5) === today.substring(5)) {
					logger.info(`${email} ${element.first_name}!`)
				}
				else {
					// NO ACTION
					logger.info(`email, is it skip year = false, feb28 = false, no birthday ${element.first_name}!`)
				}
			})
		}
	}
  return friends       
};

module.exports = {
	sendEmail,
};

