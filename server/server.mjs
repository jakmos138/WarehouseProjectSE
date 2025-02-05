import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import express_session from 'express-session';
import passport from 'passport';
import passport_local from 'passport-local';
const LocalStrategy = passport_local.Strategy;
import crypto from 'node:crypto';
import { repo } from './repo.mjs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import FileStore_ from 'session-file-store';
const FileStore = FileStore_(express_session);
import cors from 'cors';

import router_auth from './routes/auth.mjs'
import router_items from './routes/items.mjs'
import router_itemtypes from './routes/itemtypes.mjs'
import router_locations from './routes/locations.mjs'

try {
  repo.connect(process.env.DB_SERVER,
    process.env.DB_PORT,
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD).then(() => {console.log("Connected to database")});
}
catch(e) {
  console.log(e);
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
  origin: `http://localhost:${process.env.FRONTEND_PORT}`,
  credentials: true                 
}));
const port = process.env.BACKEND_PORT;

app.use(express_session({
  secret: 'i can\'t think of a conword for now',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }, this won't work without HTTPS
  store: new FileStore()
  // set up store, likely via repo
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.get('/', (req, res) => {
  let n = req.user ? req.user.username : "anonymous";
  res.send(`Hello, ${n}!`)
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "login_test.html"))
})

app.use("/api/auth", router_auth);
app.use("/api/items", router_items);
app.use("/api/itemtypes", router_itemtypes);
app.use("/api/locations", router_locations);
