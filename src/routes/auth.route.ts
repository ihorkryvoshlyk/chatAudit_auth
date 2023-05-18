import express, { Router } from 'express';
import { validate } from '../modules/validate';
import { authValidation, authController } from '../modules/auth';

const router: Router = express.Router();

router.post('/signup', validate(authValidation.register), authController.register);
router.post('/signin', validate(authValidation.login), authController.login);
router.post('/signout', validate(authValidation.logout), authController.logout);

export default router;
