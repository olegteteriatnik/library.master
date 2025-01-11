import { Router } from 'express';
import { authenticate } from '../middleware/AuthMiddleware';
import { validateRequest } from '../middleware/ValidateRequest';
import { bookSchema } from '../services/LibraryService/validator';
import LibraryController from '../controllers/LibraryController';

const router = Router();
const libraryController = new LibraryController();

/**
 * @swagger
 * /books/addBook:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - year
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: number
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successfully added a book
 *       401:
 *         description: Unauthorized
 */
router.post('/addBook', authenticate, validateRequest(bookSchema), libraryController.add);

export default router;
