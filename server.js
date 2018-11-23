const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const app = express();

const cors = require('cors');
var mysql = require('mysql');

app.use(cors());
app.use(bodyParser.json());

app.use(
  expressJwt({ secret: 'todo-app-super-shared-secret' }).unless({
    path: [
      '/api/themes',
      '/api/auth',
      '/api/sujets',
      '/api/qrs',
      '/api/users',
      /^\/api\/sujets\/.*/,
      { url: /^\/api\/comments\/.*/, methods: ['GET'] },
      { url: /^\/api\/qrs\/.*/, methods: ['GET'] },
      { url: '/api/comments', methods: ['GET'] }
    ],
  })
);

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

app.listen(8000, () => {
  console.log('Server OK!');
});


/***** THEMES ******/

app.route('/api/themes').get((req, res) => {
  connection.query("SELECT * FROM themes", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/themes').post((req, res) => {
  connection.query("INSERT INTO themes VALUES (NULL,'" + req.body.theme_name + "')", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/themes/:id').put((req, res) => {
  connection.query("UPDATE themes SET theme_name = '"+req.body.theme_name+"' WHERE themes.id = "+req.params.id, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

/***** FIN HOME ******/



/***** SUJETS ******/

app.route('/api/sujets/:id').get((req, res) => {
  connection.query("SELECT * FROM sujets WHERE sujets.theme_id="+req.params.id, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/sujets').post((req, res) => {
  connection.query("INSERT INTO sujets VALUES (NULL,'" + req.body.theme_id + "','" + req.body.sujet_name + "')", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/sujets').get((req, res) => {
  connection.query("SELECT * FROM sujets", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

/***** FIN SUJETS ******/

/******** QRS **********/

app.route('/api/qrs/:id').get((req, res) => {
  connection.query("SELECT * FROM qrs WHERE qrs.theme_id="+req.params.id, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/qrs').get((req, res) => {
  connection.query("SELECT * FROM qrs", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/qrs').post((req, res) => {
  connection.query("INSERT INTO qrs VALUES (NULL,'" + req.body.theme_id + "','" + req.body.question + "','" + req.body.answer+ "')", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/qrs/:id').delete((req, res) => {
  connection.query("DELETE FROM qrs WHERE qrs_id = '" + req.params.id + "'", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/qrs/:id').put((req, res) => {
  console.log(JSON.stringify(req.body))
  console.log("UPDATE qrs SET question = '"+req.body.question+"',answer = '"+req.body.answer+"' WHERE qrs.qrs_id = "+req.params.id)
  connection.query("UPDATE qrs SET question = '"+req.body.question+"',answer = '"+req.body.answer+"' WHERE qrs.qrs_id = "+req.params.id, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

/****** FIN QRS *******/

// app.route('/api/testdb').get((req, res) =>{
//   connection.query("SELECT * FROM users", function (err, result) {
//     if (err) throw err;
//     res.send(result);
//   });
// });

app.route('/api/auth').post((req, res) => {
  const body = req.body;
  const USERS = connection.query("SELECT * FROM users", function (err, result) {
    if (err) throw err;
    const user = result.find(user => user.email == body.email);
    if (body.password != user.password) return res.sendStatus(401);

    let token = jwt.sign({ userID: user.user_id }, 'todo-app-super-shared-secret', { expiresIn: '2h' });
    res.send({password:user.password, email: user.email, isAdmin: user.isAdmin ,username: user.username,user_id:user.user_id,token });
  });

});

/***** COMMENTS *******/

app.route('/api/comments').get((req, res) =>{
  connection.query("SELECT * FROM comments", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/comments/:id').get((req, res) => {
  connection.query("SELECT id,sender_id, sujet_id, message, date, username FROM comments,users WHERE sender_id = user_id AND sujet_id =" + req.params.id+" ORDER BY comments.date ASC", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/comments/:id').post((req, res) => {
  connection.query("INSERT INTO comments VALUES ('" + req.body.id + "','" + req.body.sender_id + "','" + req.params.id + "','" + req.body.message + "','" + req.body.date + "')", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/comments/:id').put((req, res) => {
  console.log(JSON.stringify(req.body))
  console.log("UPDATE comments SET message = '"+req.body.message+"' WHERE comments.id = "+req.params.id)
  connection.query("UPDATE comments SET message = '"+req.body.message+"' WHERE comments.id = "+req.params.id, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/comments/:id').delete((req, res) => {
  connection.query("DELETE FROM comments WHERE id = '" + req.params.id + "'", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

/******* FIN COMMENTS ********/
/******* USERS ************/

app.route('/api/users').post((req, res) => {
  connection.query("INSERT INTO users VALUES (NULL,'" + req.body.email + "','" + req.body.password + "','" + req.body.username + "', 0)", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/users').get((req, res) => {
  connection.query("SELECT * FROM users", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/users/:id').delete((req, res) => {
  connection.query("DELETE FROM users WHERE user_id = '" + req.params.id + "'", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/users/:id').put((req, res) => {
  connection.query("UPDATE users SET isAdmin = "+req.body.admin+" WHERE users.user_id = "+req.params.id, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/users/username/:id').put((req, res) => {
  connection.query("UPDATE users SET username = '"+req.body.username+"' WHERE users.user_id = "+req.params.id, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/users/email/:id').put((req, res) => {
  connection.query("UPDATE users SET email = '"+req.body.email+"' WHERE users.user_id = "+req.params.id, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/users/password/:id').put((req, res) => {
  connection.query("UPDATE users SET password = '"+req.body.password+"' WHERE users.user_id = "+req.params.id, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

/******* FIN USERS ************/