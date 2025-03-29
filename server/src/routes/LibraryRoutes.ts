import { Router } from 'express';
import { authenticate } from '../middleware/AuthMiddleware';
import { validateRequest } from '../middleware/ValidateRequest';
import LibraryController from '../controllers/LibraryController';
import {
    createBookRequestSchema,
    updateBookRequestSchema,
    deleteBookRequestSchema,
    listBooksSchema,
    searchBooksSchema,
    bookIdSchema,
} from '../services/LibraryService/validator';

const router = Router();
const libraryController = new LibraryController();

/**
 * @swagger
 * /books/create:
 *   post:
 *     summary: Create a book
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
 *         description: Successfully creates a book
 *       401:
 *         description: Unauthorized
 */
router.post('/create', authenticate, validateRequest(createBookRequestSchema), libraryController.create);

/**
 * @swagger
 * /books/get:
 *   get:
 *     summary: Get book by ID
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
 *         description: Successfully got the book
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 */
router.get('/get', authenticate, validateRequest(bookIdSchema), libraryController.read);

/**
 * @swagger
 * /books/update:
 *   put:
 *     summary: Update a book
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
 *         description: Successfully updated book
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 */
router.put('/update', authenticate, validateRequest(updateBookRequestSchema), libraryController.update);

/**
 * @swagger
 * /books/delete:
 *   delete:
 *     summary: Delete a book
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
 *         description: Successfully deletes a book
 *       401:
 *         description: Unauthorized
 */
router.delete('/delete', authenticate, validateRequest(deleteBookRequestSchema), libraryController.delete);

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
router.get('/checkAvailability', authenticate, validateRequest(bookIdSchema), libraryController.checkAvailability);

export default router;
