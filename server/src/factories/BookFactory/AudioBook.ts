import { BaseBook } from './BaseBook';
import { BookType } from '../../interfaces/BookType';

export class AudioBook extends BaseBook {
    constructor(
        title: string,
        author: string | undefined,
        year: number,
        isAvailable: boolean = true,
    ) {
        super(title, author ?? 'Narrated version', year, isAvailable);
    }

    getType(): BookType {
        return BookType.audiobook;
    }
}
