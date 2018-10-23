const express = require('express');

const app = express();

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbex"
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(8000, () => {
  console.log('Server OK!');
});

comments=[{id:0, message: 'message1' }, {id:1, message: 'message76' }];

app.route('/api/testdb').get((req, res) =>{
  
  
})

app.route('/api/comments').get((req, res) =>{
  connection.query("SELECT * FROM comments", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/comments/:id').get((req, res) => {
  comments.forEach(element => {
    if(element.id==req.params['id']){
      res.send(element);
    }
    
  });
  res.send({});
  
});

app.route('/api/comments').post((req, res) =>{
  comments.push(req.body)
  res.send('success');
})

app.route('/api/comments/:id').put((req, res) => {
  comments[req.params['id']] = req.body;
  res.send('Modifié');
});

app.route('/api/comments/:id').delete((req, res) => {
  comments.splice(req.params['id'], 1);
  res.send('Supprimé');
});

/*const cors = require('cors')

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))*/