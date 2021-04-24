class Position {
    x;
    z;

    constructor(x, z) {
        this.x = x;
        this.z = z;
    }

    getX() {
        return this.x;
    }

    getZ() {
        return this.z;
    }
}

export { Position as default };