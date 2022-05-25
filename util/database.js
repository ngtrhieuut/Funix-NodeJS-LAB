// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete3', 'root', 'Alo113114115@@', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const MongoConnect = (callback) => {
  
  MongoClient.connect('mongodb+srv://ngtrhieuut:Alo113114115@ngtrhieuut.2ktcr.mongodb.net/?retryWrites=true&w=majority')
    .then(result => {
      console.log('Connected');
      callback(result);
    })
    .catch(err => console.log(err));

}

module.exports = MongoConnect;

