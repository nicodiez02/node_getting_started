import express from 'express';
import { indexController } from '../controllers/IndexController.js';

const router = express.Router();

router.get('/', indexController.index);
router.get('/carrito', indexController.carrito);



router.post('/addCarrito', indexController.addCarrito);

export {router}