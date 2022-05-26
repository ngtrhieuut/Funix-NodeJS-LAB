// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User { 
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users')
      .insertOne(this)
      .then()
      .catch(err => {console.log(err)});
  }

  addToCart(product) {
    console.log(this.cart)
    const cartProductIndex = this.cart.item.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.item];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.item[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity
      });
    }
    const updatedCart = {
      item: updatedCartItems
    };
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.item.map(i => {
      return i.productId;
    })
    return db
      .collection('products')
      .find({_id: {$in: productIds}})
      .toArray()
      .then(products => {
        return products.map(p => {
          return {
            ...p, 
            quantity: this.cart.item.find(i => {
            return i.productId.toString() === p._id.toString();
          }).quantity
        }
        })
      });
  }

  deleteItemFromCart(productId) {
    const updatedCardItem = this.cart.item.filter(item => {
      return item.productId.toString() === productId.toString();
    });
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: {item: updatedCardItem} } }
      );
  }

  addOrder() {
    const db = getDb();
    db.collection('orders')
      .insertOne(this.cart)
      .then(result => {
        this.cart = {item: []};
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { item: [] } } }
          );
      })
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users')
      .findOne({_id: new ObjectId(userId)})
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {console.log(err)});
  }
}

module.exports = User;
