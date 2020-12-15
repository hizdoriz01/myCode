require('dotenv').config();

const { REDIS_URL, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;

const staticFolder = process.env.NODE_ENV === 'development' ? 'public' : 'public';
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const redis = require('redis')
const i18nConfig = require('./i18n')
const routes = require('./routes')

const i18n = i18nConfig.i18n
const redisStoreConfig = {
  client: redis.createClient(),
  host: REDIS_HOST,
  port: REDIS_PORT,
  ttl: 260
};

if (REDIS_URL) {
  redisStoreConfig.url = REDIS_URL; 
}

if (REDIS_PASSWORD) {
  redisStoreConfig.password = REDIS_PASSWORD; 
}

const redisStore = new RedisStore(redisStoreConfig);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, staticFolder)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(i18n.init)
app.use(
  session({
      store: redisStore, 
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
  })
);

const initAuthMiddleware = require('./middlewares/init-auth');
initAuthMiddleware(app);

app.use((req, res, next) => {
  if (req.session) {
      res.locals.page = req.url;
      res.locals.messages = req.session.messages;
      res.locals.userInfo = req.session.userInfo;
      req.session.messages = {};
      if (req.session.locale) {
        i18n.setLocale(req, req.session.locale);
      }
  }
  next();
});
app.use(routes.v1);
app.use((req, res) => {
  res.status(404).render('pages/404');
});

module.exports = app;