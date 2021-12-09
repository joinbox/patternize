import mapTree from './mapTree.mjs';

/**
 * Abstraction around mapTree that uses a class to provide chaining. Changes notation from
 * functional to class-based which is a bit more readable.
 */
export default class Structure {

    #data = null;

    constructor(data) {
        this.#data = [...data];
    }

    map(mapFunction) {
        return new Structure(mapTree(this.#data, mapFunction));
    }

    get data() {
        return this.#data;
    }
}
