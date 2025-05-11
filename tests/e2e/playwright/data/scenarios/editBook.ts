import { expect } from '@playwright/test';
import { CreateBookPayload } from '../../api/services/booksApi/interfaces/CreateBookPayload';
import { BookType } from '../../api/services/booksApi/interfaces/BookType';
import commonHelper from '../../helpers/commonHelper';

const createBookPayload: CreateBookPayload = {
    title: `Edit Book on details page Title ${new Date(Date.now()).toISOString()}`,
    author: `Edit Book on details page Author ${new Date(Date.now()).toISOString()}`,
    year: new Date().getFullYear(),
};

const updateBookData = {
    title: `Updated book Title ${new Date(Date.now()).toISOString()}`,
    author: `Updated book Author ${new Date(Date.now()).toISOString()}`,
    year: commonHelper.getRandomYear(),
    isAvailable: false,
};

const expectedUpdatedBookData = {
    id: expect.any(Number),
    type: BookType.printed,
    ...updateBookData,
};

export default {
    createBookPayload,
    updateBookData,
    expectedUpdatedBookData,
}
