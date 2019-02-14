const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB Server')
  };
  console.log('Connected to MongoDB Server');
  const db = client.db('ToDoApp');

  db.collection('Users').find({
    name: 'Jim Morgan'
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Error fetching documents', err);
  })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Error fetching documents', err);
  // })

  client.close();
});
