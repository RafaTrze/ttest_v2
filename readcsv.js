const { parse } = require('csv-parse');
const fs = require('fs');

const getFriendsCSV = async () => {
  const friends = []
  const parser = fs
    .createReadStream('./people.csv', 'utf8')
    .pipe(
      parse({
        delimiter: ',',
        columns: true,
        trim: true, 
      })
    );
  for await (const row of parser) {
    // Work with each row
    friends.push(row);
  }
  return friends;
};

module.exports = {
  getFriendsCSV,
};