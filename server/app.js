const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.urlencoded({extended: true,}));
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  session({
    key: "userId",
    secret: "homework",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    },
  })
);

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "store_games",
});

app.get("/", (req, res) => {
    res.send("Hello Gamers!");
  });

app.post("/register", (req, res) => {

  const sqlget = `
    SELECT id FROM users
    WHERE username = ?
  `;

  const sql = `
    INSERT INTO users
    (username, pass)
    VALUES (?, ?)
  `;

  con.query(
    sqlget,
    [req.body.username], (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.send({message : 'Username exist. Please correct and try again.'})
        } else {
          bcrypt.hash(req.body.password, saltRounds,  (err, hash) => {
            if (err) {
            console.log(err);
            }
          con.query(
            sql,
            [req.body.username, hash],
            (err, result) => {
                if (err) {
                throw err;
                }
              res.send(result);
            }
          );
        })
      }   
    }
  )
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user })
  } else{
    res.send({ loggedIn: false});
  }
});

app.post("/login", (req, res) => {
  const sql = `
        SELECT * FROM users WHERE username = ?
    `;
  con.query(
    sql,
    [req.body.username],
    (err, result) => {
      if (err) {
        throw err;
      } 
        if (result.length > 0) {
          bcrypt.compare(req.body.password, result[0].pass, (error, response) => {
            if (response) {
              req.session.user = result;
              console.log(req.session.user);
              res.send(result)
            } else {
              res.send({message: "Wrong username/password combination! "})
            }
          });
        } else {
          res.send({message: "User doesn't exist "})
        }
      }
  );
});

app.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      res.send(err.message);
    } else {
      res.status(200).clearCookie('userId', { path: '/' }).redirect('/')
    }
  });
})

const doAuth = (permissions) => {
    return (req, res, next) => {
      const userRole = req.session.user ? req.session.user[0].role : ''
      if (permissions.includes(userRole)) {
        next()
      } else {
         res.send( { message: `You Don't Have Permission!`});
    }
  }
};

//GET MANAGER*******
app.get("/games-manager", doAuth(['admin', 'moderator']), (req, res) => {
  const sql = `
  SELECT
  gm.id AS id, ath.author, gm.photo, gm.title, gm.type, gm.category, gm.about, gm.count, gm.sum, GROUP_CONCAT(cmt.name, ': ', cmt.comment, '-^o^-') AS comments,  GROUP_CONCAT(cmt.id) AS cmtid 
  FROM games AS gm
  LEFT JOIN comments AS cmt
  ON cmt.games_id = gm.id
  LEFT JOIN authors as ath
  ON gm.author_id = ath.id
  GROUP BY gm.id
`;
con.query(sql, (err, result) => {
  if (err) throw err;
  res.send(result);
});
});

app.get("/users", doAuth(['admin']),  (req, res) => {
  const sql = `
  SELECT
  *
  FROM users
`;
con.query(sql, (err, result) => {
if (err) throw err;
res.send(result);
});
});

// GET LIST*******
app.get("/games-list/all", (req, res) => {
  const sql = `
        SELECT
        gm.id AS id, ath.author, gm.photo, gm.title, gm.type, gm.category, gm.about, gm.count, gm.sum, GROUP_CONCAT(cmt.name, ': ', cmt.comment, '-^o^-') AS comments, cmt.id AS cmtid 
        FROM games AS gm
        LEFT JOIN comments AS cmt
        ON gm.id = cmt.games_id
        LEFT JOIN authors as ath
        ON gm.author_id = ath.id
        GROUP BY gm.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.get("/votes-list", (req, res) => {
  const sql = `
        SELECT
        v.id AS id, v.user_id as user, us.username,v.game_id as game, gm.title 
        FROM votes AS v
        LEFT JOIN games as gm
        ON v.game_id = gm.id
        LEFT JOIN users as us
        ON v.user_id = us.id
        GROUP BY v.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.get("/games-list/:cat", (req, res) => {
  if (req.params.cat != "all") {
  const sql = `
          SELECT
          *
          FROM games
          WHERE type = ?
      `;
  con.query(sql, [['action','adventure','rpg', 'strategy', 'shooter', 'puzzle','PC', 'PlayStation', 'Xbox', 'Nintendo'].indexOf(req.params.cat) + 1], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
  }
  });


// GET LIST SEARCH
app.get("/games-list-search", (req, res) => {
  const sql = `
        SELECT
        *
        FROM games
        WHERE title LIKE '%${req.query.s}%'
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// GET LIST SORT
app.get("/games-list-sorted/", (req, res) => {
  
  let sql;
  
  if (req.query.by == 'title' && req.query.dir == 'asc'){
    sql = `SELECT * FROM games ORDER BY title ASC`;
  }
  else if (req.query.by == 'title' && req.query.dir == 'desc'){
    sql = `SELECT * FROM games ORDER BY title DESC`;
  }

    con.query(
      sql,
      (err, results) => {
        if (err) throw err;
        res.send(results);
      }
    );
});


// GET MANAGER AUTHORS
app.get("/games-authors", doAuth(['admin', 'moderator']),  (req, res) => {
  const sql = `
  SELECT
  *
  FROM authors
`;
con.query(sql, (err, result) => {
if (err) throw err;
res.send(result);
});
});

// POST*******
app.post("/games-manager", (req, res) => {
    const sql = `
    INSERT INTO games
    (title, type, category, about, photo, author_id)
    VALUES (?, ?, ?, ?, ?, ?)
`;

con.query(
sql,
[req.body.title, req.body.type, req.body.category, req.body.about, req.body.photo, req.body.author],

(err, results) => {
  if (err) {
    throw err;
  }
  res.send(results);
}
);
});


app.post("/games-authors", (req, res) => {
  const sql = `
        INSERT INTO authors
        (author)
        VALUES (?)
    `;

  con.query(
    sql,
    [req.body.author],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});


app.post("/user-vote/", (req, res) => {
  const sql = `
  INSERT INTO votes
  (user_id, game_id, vote)
  VALUES (?, ?, ?)
  `;
con.query(
  sql,
  [req.body.user, req.body.game, req.body.votecount],
  (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
    
  }
);
});

app.post("/games-vote/:id", (req, res) => {
  const sql = `
        UPDATE games
        SET count = count + 1, sum = sum + ?
        WHERE id = ?
    `;
  con.query(
    sql,
    
    [Math.max(Math.min(req.body.vote,10),1), req.params.id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);                     
    }
  );
});


app.post("/games-comment/:id", (req, res) => {
  const sql = `
    INSERT INTO comments
    (comment, games_id, name)
    VALUES (?, ?, ?)
    `;
    const cname = req.body.cname !== '' ? req.body.cname : 'Unregistered'
  con.query(
    sql,
    [req.body.comment, req.params.id, cname],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});


// DELETE***********
app.delete("/users/:id", (req, res) => {
  const sql = `
      DELETE FROM users
      WHERE id = ?
      `;

  const deluser = req.params.id != req.session.user[0].id.toString() ?  req.params.id : null

  con.query(sql, [deluser], (err, result) => {
  if (err) {
    throw err;
  }
  res.send(result);
  });
  });

app.delete("/games-manager/:id", (req, res) => {
const sql = `
    DELETE FROM games
    WHERE id = ?
    `;
con.query(sql, [req.params.id], (err, result) => {
if (err) {
  throw err;
}
res.send(result);
});
});


app.delete("/games-manager-authors/:id", (req, res) => {
  const sql = `
        DELETE FROM authors
        WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.delete("/games-delete-comment/:id", (req, res) => {
  const sql = `
        DELETE FROM comments
        WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});


// PUT**********
app.put("/users/:id", (req, res) => {
  let sql;
  let args;
      sql = `
      UPDATE users
      SET role = ?
      WHERE id = ?
    `;
    if (req.body.role == 'admin') {
    return null
    }
      args = [req.body.role, req.params.id];
  con.query(
    sql,
    args,
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

app.put("/games-manager/:id", (req, res) => {
  let sql;
  let args;
    if('' === req.body.photo && req.body.del == 0) {
      sql = `
      UPDATE games
      SET title = ?, type = ?, category = ?, about = ?, author_id = ?
      WHERE id = ?
    `;
      args = [req.body.title, req.body.type, req.body.category, req.body.about, req.body.author, req.params.id];
    } else if(1 == req.body.del) {
        sql = `
        UPDATE games
        SET title = ?, type = ?, category = ?, about = ?, author_id = ?, photo = NULL
        WHERE id = ?
    `;
    args = [req.body.title, req.body.type, req.body.category, req.body.about, req.body.author, req.params.id];
    } else {
      sql = `
      UPDATE games
      SET title = ?, type = ?, category = ?, about = ?, author_id = ?, photo = ?
      WHERE id = ?
  `;
  args = [req.body.title, req.body.type, req.body.category, req.body.about, req.body.author, req.body.photo, req.params.id];
    }
  con.query(
    sql,
    args,
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });