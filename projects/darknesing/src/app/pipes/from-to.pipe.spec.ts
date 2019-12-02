import {FromToPipe} from './from-to.pipe';

describe('FromToPipe', () => {
    it('create an instance', () => {
        const pipe = new FromToPipe();
        expect(pipe).toBeTruthy();
    });

    it('transform number', () => {
        const pipe = new FromToPipe();
        const input = 5;
        const result = pipe.transform(input);
        expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    it('transform array', () => {
        const pipe = new FromToPipe();
        const input: [number, number] = [3, 6];
        const result = pipe.transform(input);
        expect(result).toEqual([3, 4, 5, 6]);
    });
});
