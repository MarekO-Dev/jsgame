function colourBlock(x, y){
    let colouredBlocks = 0;

    function Mark(row,column){
        Ctx[0].clearRect(level[row][column].Dimensions.x, level[row][column].Dimensions.y, level[row][column].Dimensions.w, level[row][column].Dimensions.h);
        Ctx[0].beginPath();
        Ctx[0].fillStyle = '#ff0000';
        Ctx[0].fillRect(level[row][column].Dimensions.x, level[row][column].Dimensions.y, level[row][column].Dimensions.w, level[row][column].Dimensions.h);
        level[row][column].Selected = true;
        colouredBlocks++;
        info.innerText = `Selected blocks: ${colouredBlocks}`;

    }

    function UnMark(row, column){
        Ctx[0].clearRect(level[row][column].Dimensions.x, level[row][column].Dimensions.y, level[row][column].Dimensions.w, level[row][column].Dimensions.h);
        Ctx[0].beginPath();
        Ctx[0].fillStyle = '#004400';
        Ctx[0].fillRect(level[row][column].Dimensions.x, level[row][column].Dimensions.y, level[row][column].Dimensions.w, level[row][column].Dimensions.h);
        level[row][column].Selected = false;
    }

    for(let row = 0; row < level.length; row++){
        for(let column = 0; column < level[row].length; column++){
            if(level[row][column] !== undefined){
                if(x > level[row][column].Dimensions.x &&
                    x < (level[row][column].Dimensions.x + level[row][column].Dimensions.w) &&
                    y > level[row][column].Dimensions.y &&
                    y < (level[row][column].Dimensions.y + level[row][column].Dimensions.h)){
                    console.log(level[row][column]);
                    if(!level[row][column].Selected){
                        Mark(row, column);
                    }else if(level[row][column].Selected){
                        UnMark(row, column);
                    }
                }
            }
        }
    }
}
function checkIfOverButton(mouseX, mouseY){
    for(const Button in GUI.Buttons){
        if(mouseX > GUI['Buttons'][Button].x &&
            mouseX < GUI['Buttons'][Button].x + GUI['Buttons'][Button].w &&
            mouseY > GUI['Buttons'][Button].y &&
            mouseY < GUI['Buttons'][Button].y+GUI['Buttons'][Button].h){
                
                GUI['Buttons'][Button].colour = '#ffffff';
                GUI['Buttons'][Button].Draw();
                console.log(`I am over ${GUI['Buttons'][Button].text}`);
        }else{
            GUI['Buttons'][Button].colour = '#440304';
            GUI['Buttons'][Button].Draw();
        }
    }
}