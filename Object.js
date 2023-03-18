export class Block{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    visible = true;

    Draw (layer) {
        return layer;
    }
}
export class Wall extends Block{
    constructor(x, y, w, h){
        super(x, y, w, h);
    }
}