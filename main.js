import * as Canvas from './Canvas.js';
import * as Object from './Object.js';
import * as Gui from './gui.js';

/* 

--------Done-------
    * 
------Not Done-----
    *
*/

const AFLoop = window.requestAnimationFrame;
const Keyboard = window.addEventListener;
const Mouse = window.addEventListener;
const pressedKeys = [];

function processImage(imageUrl){
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => resolve(img);
        img.onerror = () => reject;
        img.src = imageUrl;
    });
}

const imagesToLoad = [processImage('./gfx/background.jpg'),processImage('./gfx/character.png')];

const Character = {
    x: 0,
    y: 0,
    w: 32,
    h: 32,
    sx: 0,
    sy: 32,
    animating: false,
    startCharAnim: ()=> {
        Character.animating = setTimeout(() => {
            Canvas.Layer.$2.clearRect(0,0,800,660);
            if(Character.sx >= 32){
                Character.sx = 0;
            }else{
                Character.sx += 32;
            }
            
            
            Character.startCharAnim();
        },600);
    },
    charImg: async () => {
        
        const img = await imagesToLoad[1];
        Canvas.Layer.$2.drawImage(img, Character.sx, Character.sy, 32, 32, Character.x, Character.y, 32, 32); // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
    }
};

async function drawBackground () {
    const img = await imagesToLoad[0];
    Canvas.Layer.$1.drawImage(img, 0,0);
}

(() => {
    drawBackground();
    Character.startCharAnim();
})();

function main(){
if(pressedKeys['KeyD']){
    Character.x+=2;
    Canvas.Layer.$2.clearRect(0,0,800,660);
}
if(pressedKeys['KeyA']){
    Character.x-=2;
    Canvas.Layer.$2.clearRect(0,0,800,660);
}
if(pressedKeys['KeyW']){
    Character.y-=2;
    Canvas.Layer.$2.clearRect(0,0,800,660);
}
if(pressedKeys['KeyS']){
    Character.y+=2;
    Canvas.Layer.$2.clearRect(0,0,800,660);
}
Character.charImg();

//====================
AFLoop(main);//===
}//===================
AFLoop(main);//===
//====================

Keyboard('keydown', keyDown => {pressedKeys[keyDown.code] = true;});
Keyboard('keyup', keyUp => {pressedKeys[keyUp.code] = false;});

Mouse('contextmenu', RClick =>{RClick.preventDefault();});
Mouse('click', LClick => {});
Mouse('mousedown', MD => {});
Mouse('mouseup', MU => {});