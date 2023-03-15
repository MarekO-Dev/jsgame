const Canvas = [document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3')];
const Ctx = [Canvas[0].getContext('2d'), Canvas[1].getContext('2d')];
const Reseed_btn = document.getElementById('gl');
const pressedButtons = {};



class Square{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    Draw(){
        Ctx[1].beginPath();
        Ctx[1].fillStyle = '#005500';
        Ctx[1].rect(this.x, this.y, this.w, this.h);
        Ctx[1].fill();
    }
    
    goRight(){
        this.x++;
    }
    
}

class WallBlock{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    settings = {
        selected: false
    };

    set Selected(value){
        this.settings.selected = value;
    }

    get Selected(){
        return this.settings.selected;
    }
    get Dimensions(){
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h
        };
    }
}
let level = [
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined]
            ];
// ==============================================================
//                  UTILS
// ==============================================================
function Chance(){

    const chancepct = Math.floor(Math.random() * 100) + 1;
    const ch = {
        number: chancepct,
        percent: `${chancepct}%`
    };

    if(chancepct <= 30){
        ch.named = 'low';
    }else if(chancepct > 30 && chancepct <= 60){
        ch.named = 'moderate';
    }else if(chancepct > 60 && chancepct <= 100){
        ch.named = 'high';
    }
    return ch;

    
}
function handleKeyboardEvents(){
    if(pressedButtons['KeyA']){

    }
    else if(pressedButtons['KeyD']){

    }
    else if(pressedButtons['KeyW']){

    }
    else if(pressedButtons['KeyS']){

    }
}
// ==============================================================
//                 ENDOF UTILS
// ==============================================================
function clearLevelArray(){
    /* 
        Clear level array so that clear Rect works (removes block objects from level array)
    */
        for(let row = 0; row < level.length; row++){
            for(let column = 0; column < level[row].length; column++){
                level[row][column] = undefined;
            }
        }

}
function generateLevel(){
    function randomlyAssignWallBlocks(){
        for(let y = 0; y < level.length; y++){
            for(let x = 0; x < level[y].length; x++){
                if(Chance().named == 'high'){
                    if(level[y][x] == undefined){
                        level[y][x] = new WallBlock(x * 40, y * 30, 40, 30);
                    }
                }
            }
        }
    }
    
    function clearCanvas(){
        Ctx[0].clearRect(0,0,800,600);
    }
    function drawBlocks(){
        Ctx[0].clearRect(0,0,800,600);
        for(let row = 0; row < level.length; row++){
            Ctx[0].beginPath();
            Ctx[0].fillStyle = '#004400';
            level[row].forEach(block => {
                //console.log(block);
                if(block !== undefined){
                    Ctx[0].fillRect(block.Dimensions.x, block.Dimensions.y, block.Dimensions.w, block.Dimensions.h);
                    
                }
            });
        }
    }
    clearLevelArray();
    randomlyAssignWallBlocks();
    clearCanvas();
    drawBlocks();
}






(()=>{
    Ctx[0].beginPath();
    Ctx[0].rect(150, 150, 100, 100);
    Ctx[0].stroke();
    generateLevel();
    //console.log(level);
})();

function colourBlock(x, y){


    for(let row = 0; row < level.length; row++){
        for(let column = 0; column < level[row].length; column++){
            if(level[row][column] !== undefined){
                if(x > level[row][column].Dimensions.x &&
                    x < (level[row][column].Dimensions.x + level[row][column].Dimensions.w) &&
                    y > level[row][column].Dimensions.y &&
                    y < (level[row][column].Dimensions.y + level[row][column].Dimensions.h)){
                    console.log(level[row][column]);
                    if(!level[row][column].Selected){
                        Ctx[0].clearRect(level[row][column].Dimensions.x, level[row][column].Dimensions.y, level[row][column].Dimensions.w, level[row][column].Dimensions.h);
                        Ctx[0].beginPath();
                        Ctx[0].fillStyle = '#ff0000';
                        Ctx[0].fillRect(level[row][column].Dimensions.x, level[row][column].Dimensions.y, level[row][column].Dimensions.w, level[row][column].Dimensions.h);
                        level[row][column].Selected = true;
                    }else if(level[row][column].Selected){
                        Ctx[0].clearRect(level[row][column].Dimensions.x, level[row][column].Dimensions.y, level[row][column].Dimensions.w, level[row][column].Dimensions.h);
                        Ctx[0].beginPath();
                        Ctx[0].strokeStyle = '#000000';
                        Ctx[0].rect(level[row][column].Dimensions.x, level[row][column].Dimensions.y, level[row][column].Dimensions.w, level[row][column].Dimensions.h);
                        Ctx[0].stroke();
                        level[row][column].Selected = false;
                    }
                }
            }
        }
    }
}
function main(timestamp){
    
    

//===========================================================
handleKeyboardEvents();
window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);
//===========================================================

window.addEventListener('keydown', (e) => {
    pressedButtons[e.code] = true;
}, true);

window.addEventListener('keyup', (e) => {
    pressedButtons[e.code] = false;
}, true);

Canvas[2].addEventListener('click', (e)=>{
    //console.log(e.offsetX);
    // TEST
    colourBlock(e.offsetX, e.offsetY);
});

Reseed_btn.addEventListener('click', () => {
    generateLevel();
});