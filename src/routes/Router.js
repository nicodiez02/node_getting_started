import express from 'express';
import { indexController } from '../controllers/IndexController.js';

const router = express.Router();

router.get('/', indexController.index);

export {router}