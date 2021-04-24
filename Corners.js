class Corners {
    corner1;
    corner2;
    y;

    constructor(corner1, corner2, y) {
        this.corner1 = corner1;
        this.corner2 = corner2;
        this.y = y;
    }

    getCorners1() {
        return this.corner1;
    }

    getCorners2() {
        return this.corner2;
    }

    getY() {
        return this.y;
    }
}

export { Corners as default };