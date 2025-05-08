import express from 'express';
import { addClass, listClasses } from '../controllers/classController';
import { validateClassRequest } from '../middleware/validator/classesValidator';
const router = express.Router();

router.post('/',validateClassRequest, addClass);
router.get('/', listClasses);

export default router;

