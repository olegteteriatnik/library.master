import { expect } from '@playwright/test';
import { BookPrototype } from '../../prototypes/BookPrototype';
import { BookType } from '../../api/services/booksApi/interfaces/BookType';
import commonHelper from '../../helpers/commonHelper';

const initialBookData = {
    title: 'Edit Book on details page Title',
    author: 'Edit Book on details page Author',
};

const createBookPayload = new BookPrototype(initialBookData);

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
