var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
var PORT = 3000 || process.env.PORT;

function reqTimestamp(req, res, next) {
  console.log(`Method: ${req.method} @${new Date()}`);
  console.log(`Req.body: ${req.body}`);
  next();
}

var tmpDB = [];
var id = 0;

app.use(bodyParser.json());
app.use(reqTimestamp);
app.use(express.static(__dirname + '/public'));
app.use('/libs', express.static(__dirname + '/bower_components'));

// @GET all todos
app.get('/todos', function (req, res) {
  res.json(tmpDB);
});

// @GET by :id
app.get('/todos/:id', function (req, res) {
  var todo = _.find(tmpDB, {id:Number(req.params.id)});
  res.json(todo);
});

// @POST
app.post('/todos', function (req, res) {
  var body = _.pick(req.body, ['description', 'completed']);

  if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

  body.description = body.description.trim();
	body.id = id++;
  tmpDB.push(body);
  res.json(body);
});

// @PUT by :id
app.put('/todos/:id', function (req, res) {
  var body = _.pick(req.body, ['description', 'completed']);
  var validAttrs = {};
  var todoId = Number(req.params.id);
  var matchedTodo = _.find(tmpDB, {id: todoId});

  if (!matchedTodo) {
    return res.status(404).send();
  }

  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
    validAttrs.completed = body.completed;
  } else if (body.hasOwnProperty('completed')) {
    return res.status(400).send();
  }

  if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
    validAttrs.description = body.description.trim();
  } else if (body.hasOwnProperty('description')) {
    return res.status(400).send();
  }

  _.assignIn(matchedTodo, validAttrs);
  res.json(matchedTodo);
});

// @DELETE todo by :id
app.delete('/todos/:id', function (req, res) {
	var todoId = Number(req.params.id);
	var matchedTodo = _.find(tmpDB, {id: todoId});

	if (matchedTodo) {
		tmpDB = _.pull(tmpDB, matchedTodo);
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

app.listen(PORT, function () {
  console.log(`> Server started on Port: ${PORT} @${new Date()}`);
});
