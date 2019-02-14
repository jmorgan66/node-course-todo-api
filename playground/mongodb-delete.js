const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB Server')
  };
  console.log('Connected to MongoDB Server');
  const db = client.db('ToDoApp');
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // })
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // })
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })
  // db.collection('Users').deleteMany({name: 'Jim Morgan'}).then((result) => {
  //   console.log(result);
  // });
  db.collection('Users').findOneAndDelete({name: 'Wendy'}).then((result) => {
    console.log(result);
  });
  client.close();
});
