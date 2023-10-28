import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

// import router
import router_login from "./login.js";
import router_regist from "./regist.js";
import router_profile from "./profile.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Add api to server port 3001
app.use(router_login);
app.use(router_regist);
app.use(router_profile);

app.listen(3001, () => {
    console.log(`> Ready on http://localhost:3001`);
  });
  
  