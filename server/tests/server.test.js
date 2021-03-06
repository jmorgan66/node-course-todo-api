const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [
  { _id: new ObjectID(),
    text: 'First test todo'},
  { _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123}];

beforeEach((done) => {
  Todo.remove().then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {

  it('it should create a new todo', (done) => {
    var text = 'todo test';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text)
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((err) => done(err));
    });
  });

  it('should not create todo with invalid data', (done) => {

    request(app)
    .post('/todos')
    .send()
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((err) => done(err));
    });
  });
});

describe('GET /todos', () => {

  it('should return all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) =>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non valid ObjectIDs', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  var hexId = todos[0]._id.toHexString();
  it('should remove a todo', (done) => {
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((err) => done(err));
      });
  });

  it('should return a 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if bad Object Id', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {

  it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: 'first todo completed',
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('first todo completed');
        expect(res.body.todo.completed).toBe(true);        
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text: 'second todo not completed',
      completed: false
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe('second todo not completed');
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist('number');
    })
    .end(done);
  });
});
