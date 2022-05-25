// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete3', 'root', 'Alo113114115@@', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  
  mongoClient.connect('mongodb+srv://ngtrhieuut:Alo113114115@ngtrhieuut.2ktcr.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
      console.log('Connected');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

