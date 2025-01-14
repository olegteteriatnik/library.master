import { Router } from 'express';
import { authenticate } from '../middleware/AuthMiddleware';
import { validateRequest } from '../middleware/ValidateRequest';
import LibraryController from '../controllers/LibraryController';
import {
    addBookRequestSchema,
    removeBookRequestSchema,
    listBooksSchema,
    searchBooksSchema,
    checkAvailabilitySchema,
} from '../services/LibraryService/validator';

const router = Router();
const libraryController = new LibraryController();

/**
 * @swagger
 * /books/add:
 *   post:
 *     summary: Add a book
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
router.post('/add', authenticate, validateRequest(addBookRequestSchema), libraryController.add);

/**
 * @swagger
 * /books/remove:
 *   delete:
 *     summary: Remove a book
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
 *               - id
 *             properties:
 *               id:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully removed a book
 *       401:
 *         description: Unauthorized
 */
router.delete('/remove', authenticate, validateRequest(removeBookRequestSchema), libraryController.remove);

/**
 * @swagger
 * /books/list:
 *   get:
 *     summary: Get books list
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [title, author, year]
 *     responses:
 *       200:
 *         description: Successfully got list
 *       401:
 *         description: Unauthorized
 */
router.get('/list', authenticate, validateRequest(listBooksSchema), libraryController.list);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Search books
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: author
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: year
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: isAvailable
 *         required: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully found books
 *       401:
 *         description: Unauthorized
 */
router.get('/search', authenticate, validateRequest(searchBooksSchema), libraryController.search);

/**
 * @swagger
 * /books/checkAvailability:
 *   get:
 *     summary: Check book availability
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully got availability
 *       401:
 *         description: Unauthorized
 */
router.get('/checkAvailability', authenticate, validateRequest(checkAvailabilitySchema), libraryController.checkAvailability);

export default router;
