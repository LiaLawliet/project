const _ = require('lodash');
const express = require('express');
const router = express.Router();
const multer = require('multer');
let crypto = require('crypto')
let path = require('path');
const mime = require('mime');
let nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
         user: 'yacine.fethi41@gmail.com',
         pass: 'Yapopaf41'
  }
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype))
    })
  }
});

const upload = multer({ storage: storage });

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const app = express();

const cors = require('cors');
var mysql = require('mysql');

app.use(cors());
app.use(bodyParser.json());

app.route('/api/resetpasswordmail').post((req, res) => {

  let token = jwt.sign({ userID: req.body.id }, 'todo-app-super-shared-secret', { expiresIn : 60*5 });
  
  let mailOptions = {
    from: "yacine.fethi41@gmail.com", // sender address
    to: req.body.email, // list of receivers
    subject: "Mot de passe perdu", // Subject line
    html: "<p>Apparement t'as perdu ton mot de passe clique sur ce <a href='http://localhost:4200/resetpassword/"+req.body.id+"/"+token+"'>lien</a></p>"// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
})

app.use(
  expressJwt({ secret: 'todo-app-super-shared-secret' }).unless({
    path: [
      /^\/public\/.*/,
      /^\/api\/password\/.*/,
      /^\/api\/checktoken\/.*/,
      '/api/themes',
      '/api/nothiddenthemes',
      '/api/nothiddensujets',
      '/api/check',
      '/api/auth',
      '/api/sujets',
      '/api/qrs',
      '/api/users',
      '/api/forum',
      '/api/forumNbCom',
      /^\/api\/sujets\/.*/,
      { url: /^\/api\/comments\/.*/, methods: ['GET'] },
      { url: /^\/api\/getuserbyemail\/.*/, methods: ['GET'] },
      { url: /^\/api\/nothiddensujets\/.*/, methods: ['GET'] },
      { url: /^\/api\/qrs\/.*/, methods: ['GET'] },
      { url: '/api/comments', methods: ['GET'] }
    ],
  })
);

app.use('/public',express.static(path.join(__dirname,'./public')))

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

/***** UPLOAD ******/

app.route('/api/uploadtheme/:id').post( upload.any(), function(req,res,next) {
  console.log(JSON.stringify(req.files[0].filename))
  connection.query("UPDATE themes SET image = ? WHERE themes.id = ?",[req.files[0].filename,req.params.id], function (err, result) {
    if (err) throw err;
    res.send({filename:req.files[0].filename});
  });
})

app.route('/api/upload/:id').post( upload.any(), function(req,res,next) {
  console.log(JSON.stringify(req.files[0].filename))
  connection.query("UPDATE users SET image = ? WHERE users.user_id = ?",[req.files[0].filename,req.params.id], function (err, result) {
    if (err) throw err;
    res.send({filename:req.files[0].filename});
  });
})



/***** THEMES ******/

app.route('/api/nothiddenthemes').get((req, res) => {
  connection.query("SELECT * FROM themes WHERE themes.hidden = 0", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/themes').get((req, res) => {
  connection.query("SELECT * FROM themes", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/themes').post((req, res) => {
  connection.query("INSERT INTO themes VALUES (NULL,?,?,'default.jpg','0')",[req.body.theme_name,req.body.description], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/themes/:id').put((req, res) => {
  connection.query("UPDATE themes SET theme_name = ? , description = ? WHERE themes.id = ?",[req.body.theme_name,req.body.description,req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/showthemes/:id').put((req, res) => {
  connection.query("UPDATE themes SET hidden = ? WHERE themes.id = ?",[req.body.hidden,req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/hidethemes/:id').put((req, res) => {
  connection.query("UPDATE themes SET hidden = ? WHERE themes.id = ?",[req.body.hidden,req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

/***** FIN HOME ******/



/***** SUJETS ******/

// SELECT `c`.`sujet_id` AS `sid` ,(SELECT COUNT(`id`) AS `nbrcomments` FROM `comments` `c1` WHERE `c1`.`sujet_id`=`c`.`sujet_id` ) AS `nb` FROM `comments` `c`  WHERE `sender_id` = 1 GROUP BY `c`.`sujet_id`

app.route('/api/forumNbCom').get((req, res) => {
  connection.query("SELECT sujets.id, COUNT(comments.id) AS nbCom FROM sujets LEFT JOIN comments ON sujets.id = comments.sujet_id GROUP BY sujets.id", function (err, result) {
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

app.route('/api/putsujets').get((req, res) => {
  connection.query("SELECT sujets.id, sujet_name, theme_id,theme_name, resolu, username, sujets.hidden FROM sujets,users,themes WHERE creator=user_id AND theme_id = themes.id", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/forum').get((req, res) => {
  connection.query("SELECT sujets.id, sujet_name, theme_name, resolu, username, sujets.hidden, users.image FROM sujets,users,themes WHERE creator=user_id AND theme_id = themes.id", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/createdsujets/:id').get((req, res) => {
  connection.query("SELECT sujets.id, sujet_name, theme_name, resolu, sujets.hidden FROM sujets,themes WHERE creator = ? AND theme_id = themes.id",[req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/nothiddensujets/:id').get((req, res) => {
  connection.query("SELECT sujets.id, sujet_name, theme_name, resolu, username, sujets.hidden, users.image FROM sujets,users,themes WHERE sujets.theme_id = ?  AND theme_id = themes.id AND creator=user_id",[req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/sujets/sujet/:id').get((req, res) => {
  connection.query("SELECT * FROM sujets WHERE sujets.id = ?",[req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/sujets').post((req, res) => {
  connection.query("INSERT INTO sujets VALUES (NULL,?,?,'0',?,?)",[req.body.theme_id,req.body.sujet_name,req.body.creator, req.body.hidden], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/nothiddensujets').get((req, res) => {
  connection.query("SELECT * FROM sujets WHERE sujets.hidden = 0", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})



app.route('/api/sujets/resolu/:id').put((req, res) => {
  connection.query("UPDATE sujets SET resolu = ? WHERE sujets.id = ?",[req.body.resolve,req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/sujets/:id').put((req, res) => {
  connection.query("UPDATE sujets SET theme_id = ?, sujet_name = ?,hidden = ? WHERE sujets.id = ?",[req.body.theme_id, req.body.sujet_name, req.body.hidden,req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/showsujets/:id').put((req, res) => {
  connection.query("UPDATE sujets SET hidden = ? WHERE sujets.id = ?",[req.body.hidden,req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/showsujets').put((req, res) => {
  connection.query("UPDATE sujets SET hidden = ? WHERE sujets.theme_id = ?",[req.body.hidden,req.body.theme_id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/hidesujets/:id').put((req, res) => {
  connection.query("UPDATE sujets SET hidden = ? WHERE sujets.id = ?",[req.body.hidden,req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/hidesujets').put((req, res) => {
  connection.query("UPDATE sujets SET hidden = ? WHERE sujets.theme_id = ?",[req.body.hidden,req.body.theme_id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

/***** FIN SUJETS ******/

/******** QRS **********/

app.route('/api/qrs/:id').get((req, res) => {
  connection.query("SELECT * FROM qrs WHERE qrs.theme_id=?",[req.params.id], function (err, result) {
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
  connection.query("INSERT INTO qrs VALUES (NULL,?,?,?)",[req.body.theme_id, req.body.question, req.body.answer], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/qrs/:id').delete((req, res) => {
  connection.query("DELETE FROM qrs WHERE qrs_id = ?",[req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/qrs/:id').put((req, res) => {
  connection.query("UPDATE qrs SET question = ?,answer = ? WHERE qrs.qrs_id = ?",[req.body.question,req.body.answer,req.params.id], function (err, result) {
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


/****** AUTH *******/
app.route('/api/auth').post((req, res) => {
  const body = req.body;
  const USERS = connection.query("SELECT * FROM users", function (err, result) {
    if (err) throw err;
    const user = result.find(user => user.email == body.email);
    if (body.password != user.password) return res.sendStatus(401);

    let token = jwt.sign({ userID: user.user_id }, 'todo-app-super-shared-secret', { expiresIn: '2h' });
    console.log(jwt.decode(token).exp*1000)
    res.send({password:user.password, email: user.email, isAdmin: user.isAdmin ,username: user.username,user_id:user.user_id,image:user.image,token });
  });

});

app.route('/api/checktoken/:token').get((req, res) =>{
  let token = jwt.decode(req.params.token).exp*1000;
  console.log(jwt.decode(req.params.token).exp*1000)
  console.log(Date.now())
  if (token > Date.now()) {
    res.send(false)
  }else{
    res.send(true)
  }
})

/***** COMMENTS *******/

app.route('/api/comments').get((req, res) =>{
  connection.query("SELECT * FROM comments", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/comments/:id').get((req, res) => {
  connection.query("SELECT id,sender_id, sujet_id, message, date, username, image FROM comments,users WHERE sender_id = user_id AND sujet_id = ? ORDER BY comments.date ASC",[req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/comments').post((req, res) => {
  connection.query("INSERT INTO comments VALUES (NULL,?,?,?,?)", [req.body.sender_id , req.body.sujet_id, req.body.message , req.body.date],function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.route('/api/comments/:id').put((req, res) => {
  console.log(JSON.stringify(req.body))
  console.log("UPDATE comments SET message = '"+req.body.message+"' WHERE comments.id = "+req.params.id)
  connection.query("UPDATE comments SET message = ? WHERE comments.id = ?",[req.body.message, req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/comments/:id').delete((req, res) => {
  connection.query("DELETE FROM comments WHERE id = ?",[req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

/******* FIN COMMENTS ********/
/******* USERS ************/

app.route('/api/users').post((req, res) => {
  connection.query("INSERT INTO users VALUES (NULL,?,?,?,0,'default.jpg')",[req.body.email,req.body.password,req.body.username], function (err, result) {
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

app.route('/api/getuserbyemail/:email').get((req, res) => {
  connection.query("SELECT * FROM users WHERE email = ?",[req.params.email], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})


app.route('/api/users/:id').delete((req, res) => {
  connection.query("DELETE FROM users WHERE user_id = ?",[req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/users/:id').put((req, res) => {
  connection.query("UPDATE users SET isAdmin = ? WHERE users.user_id = ?",[req.body.admin,req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/username/:id').put((req, res) => {
  connection.query("UPDATE users SET username = ? WHERE users.user_id = ?",[req.body.username, req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/email/:id').put((req, res) => {
  connection.query("UPDATE users SET email = ? WHERE users.user_id = ?",[req.body.email, req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.route('/api/password/:id').put((req, res) => {
  connection.query("UPDATE users SET password = ? WHERE users.user_id = ?",[req.body.password, req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

/******* FIN USERS ************/