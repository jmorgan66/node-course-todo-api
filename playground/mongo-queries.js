const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5c670f8fd8b19860371a28ab';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }
//
// // Todo.find({
// //   _id: id
// // }).then((todos) => {
// //   console.log(todos);
// // });
// //
// // Todo.findOne({
// //   _id: id
// // }).then((todo) => {
// //   console.log(todo);
// // });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Document not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((err) => {
//   console.log(err);
// });

var userId = '5c65dbb8b14e9b2421b10ebd';

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User by Id', user);
}).catch((err) => {
  console.log(err);
});
