const _ = require('lodash');
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID,
  text: "First test to do"
},
{
  _id: new ObjectID,
  text: "Second test to do",
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
  return Todo.insertMany(todos);
}).then(() => done());
});

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
