import { Router } from 'express';
import { login } from '../controllers/AuthController';

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Get authorization token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully received token
 *       401:
 *         description: Invalid username or password
 */
router.post('/login', login);

export default router;
