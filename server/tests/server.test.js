const _ = require('lodash');
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {Users} = require('./../models/users');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST / todos', () => {
  it("should create a new todo", (done) => {
    var text = "Test todo text";

request(app)
.post('/todos')
.send({text})
.expect(200)
.expect((res) => {
  expect(res.body.text).toBe(text);
})
.end((err, res) => {
  if (err) {
    return done(err);
  }

  Todo.find({text}).then((todos) => {
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe(text);
    done();
  }).catch((e) => done(e));
});

});

it("should not create todo with invalid data", (done) => {
  request(app)
  .post('/todos')
  .send({})
  .expect(400)
  .end((err, res) => {
    if (err) {
      return done(err)
    }

Todo.find().then((todos) => {
  expect(todos.length).toBe(2);
  done();
}).catch((e) => done(e))

});
});
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
    expect(res.body.todos.length).toBe(2)
    })
    .end(done);
  });
});

describe('Get /todos/:id', () => {
  it("should get a specific doc", (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text)
  })
  .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for invalid id', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  var hexId = new ObjectID().toHexString();
  it('should delete a todo', (done) => {
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end((err, res) => {
  Todo.findById(hexId).then((todo) => {
    expect(todo).toNotExist();
    done();
  }).catch((e) => done(e));
  });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if invalid key', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});


describe('PATCH /todos/:id', () => {
var text = "This should be the new text";
var iD = todos[0]._id.toHexString();
  it('should update todo', (done) => {
    request(app)
     .patch(`/todos/${iD}`)
     .send({
       text,
       completed: true
    })
     .expect(200)
     .expect((res) => {
       expect(res.body.todo.text).toBe(text);
       expect(res.body.todo.completed).toBe(true);
       expect(res.body.todo.completedAt).toBeA('number');
  })
  .end(done);
});

var Id = todos[1]._id.toHexString();
it('should clear completedAt', (done) => {
  request(app)
    .patch(`/todos/${Id}`)
    .send({
      completed: false
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
});
});

describe('GET /user/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/user/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/user/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /user', () => {
  it('should create a user', (done) => {
var email = 'example@example.com';
var password = 'abc123';

    request(app)
      .post('/user')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        Users.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        })
      });
  });

  it('should return validation errors if request invalid', (done) => {
var email = 'abc123';
var password = '1054';

    request(app)
      .post('/user')
      .send({email, password})
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
var password = 'abc123';

  request(app)
    .post('/user')
    .send({
      email: users[0].email,
      password
    })
    .expect(400)
    .end(done);
  });
});
