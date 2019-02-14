const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to MongoDB Server')
  };
  console.log('Connected to MongoDB Server');
  const db = client.db('ToDoApp');
  // db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5c65c42082077619279e0470')}, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });
  db.collection('Users').findOneAndUpdate({_id: new ObjectID('5c64af82e7cdfe018c488b38')}, {
    $set: {
      name: 'Marz'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
  client.close();
});
