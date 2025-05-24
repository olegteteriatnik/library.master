import { expect } from './chai';

interface ExpectedError {
    message?: string;
    type?: ErrorConstructor;
}

export async function expectErrorFrom(
    fnOrPromise: (() => Promise<unknown>) | Promise<unknown>,
    { message, type = Error }: ExpectedError = {}
): Promise<void> {
    try {
        const isFunction = typeof fnOrPromise === 'function';
        await (isFunction ? (fnOrPromise as () => Promise<unknown>)() : fnOrPromise);
        throw new Error('Expected function to throw an error, but it did not.');
    } catch (error) {
        expect(error).to.be.instanceOf(type);
        if (message) {
            expect((error as Error).message).to.include(message);
        }
    }
}
