import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

// import router
import router_login from "./login.js";
import router_regist from "./regist.js";
import router_profile from "./profile.js";
import { router_shop } from "./shopEdit.js";
import {router_main,router_main_cart, router_main_image} from "./main.js"
import { router_fetchProfile } from "./editProfile.js";
import { router_updateProfile } from "./editProfile.js";
import router_fetchShop from "./shopProfile.js";
import router_addProduct from "./addProduct.js";
import { router_fetcchProduct } from "./editProduct.js";
import { router_editProduct } from "./editProduct.js";
import { router_fetchPreviousShop } from "./shopEdit.js";
import router_deleteProduct from "./deleteProduct.js";
import { router_fetchSpecificProduct } from "./editProduct.js";
import router_addProduct_cart from "./addProduct_cart.js";
import router_getProductCart from "./getProductCart.js";
import { router_addQuantity,router_minusQuantity,router_deleteQuantity } from "./manageCart.js";
import { router_submitOrder,router_getReceipt } from "./reciept.js";
import router_history from "./history.js";
import router_review from "./review.js";
import { router_admin_main, router_admin_review, router_admin_review_delete } from "./admin.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Add api to server port 3001
app.use(router_login);
app.use(router_regist);
app.use(router_profile);
app.use(router_shop);
app.use(router_main);
app.use(router_fetchProfile);
app.use(router_updateProfile);
app.use(router_fetchShop);
app.use(router_addProduct);
app.use(router_fetcchProduct);
app.use(router_editProduct);
app.use(router_fetchPreviousShop);
app.use(router_deleteProduct);
app.use(router_fetchSpecificProduct);
app.use(router_addProduct_cart);
app.use(router_getProductCart);
app.use(router_addQuantity);
app.use(router_minusQuantity);
app.use(router_deleteQuantity);
app.use(router_main_cart);
app.use(router_submitOrder);
app.use(router_getReceipt);
app.use(router_history);
app.use(router_review);
app.use(router_main_image);
app.use(router_admin_main);
app.use(router_admin_review);
app.use(router_admin_review_delete);

app.listen(3001, () => {
    console.log(`> Ready on http://localhost:3001`);
  });
  
  