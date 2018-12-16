const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
var session = require('express-session');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
const port = 8080;
const secured = require('./lib/middleware/secured');

var path = require('path');
// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: 'dehow.eu.auth0.com',
    clientID: 'V2HiOcIa1nwO4rKG4XHMp220g9D1ehq3',
    clientSecret: 'w9Gn1nNTN1uN6xCrUDjB7VuOsfqh_odJlJnPmveUZWfRtgz39Yd7LcbGs90FNk6u',
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || './callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);


// config express-session
var sess = {
  secret: '43F3viFHT',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
app.use(session(sess));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));
app.get('/home', (req, res) => {
  
  res.sendFile(__dirname + '/build/main.html')

})


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/main.html')

})
app.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), function (req, res) {
  
  res.redirect('/home');
});
app.get('/add_db', (req, res) => {
  res.sendFile(__dirname + '/build/add_db.html')

})
app.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/home');
    });
  })(req, res, next);
});
app.get('/logout', (req, res) => {
   req.logout();
// console.log(req.logout());
//   res.redirect('/home');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/build/register.html')

})
app.get('/blog', secured(),(req, res) => {
  res.sendFile(__dirname + '/build/blog.html')

})
app.get('/analyst',secured(), (req, res) => {
  res.sendFile(__dirname + '/build/analyst.html')

})
// app.get('/analyst', (req, res) => {
//   res.sendFile(__dirname + '/build/analyst.html')

// })
app.get('/target',secured(), (req, res) => {
  res.sendFile(__dirname + '/build/target.html')

})
// })
app.get('/export',secured(), (req, res) => {
  // console.log();
  // console.log(db.admin);
  if (req.user.nickname==db.admin){
  res.sendFile(__dirname + '/build/export.html');
  }else {
    res.sendFile(__dirname + '/build/404.html');
    }  
})
app.get('/admin_news',secured(), (req, res) => {
  if (req.user.nickname==db.admin){
  res.sendFile(__dirname + '/build/admin_news.html');
  }else {
    res.sendFile(__dirname + '/build/404.html');
    }  
})
app.get('/*',secured(), (req, res) => {
  res.sendFile(__dirname + '/build/404.html')

})

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
}) 
// const note = { username: req.user.id, id_news:"1" };
// db.collection('user').insert(note, (err, result) => {
  
//   if (err) { 
//     res.send({ 'error': 'An error has occurred' }); 
//   } else {
//     res.redirect('../');
//     // res.send(result.ops[0]);
//   }
// })
// return done(null, profile);