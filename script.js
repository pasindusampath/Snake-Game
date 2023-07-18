let direction =0;
let ar=[];
let children = $('.main').children('div');
let count = 0;
for (let i = 0; i < 40; i++) {
    ar[i]=[];
    for (let j = 0; j < 40 ; j++) {
        ar[i][j]={
            i:i,
            j:j,
            div:children.eq(count++),
            move:false,
            direction:-1,
            number:0
        }
    }
}

function getMovableItems(){
    let movable = [];
    for (let i = 0; i < 40; i++) {
        for (let j = 0; j < 40; j++) {
            if(ar[i][j].move===true){
                movable.push(ar[i][j]);
            }
        }
    }
    return movable;
}


function getElementPosition(num){
    let movableItems = getMovableItems();
    let find = movableItems.find((obj)=>obj.number===num);
    return {i:find.i,j:find.j}
}


function findNextPositionToGo(num){
    let elementPosition = getElementPosition(num);
    if(direction===0){
        if(elementPosition.i<40){
            elementPosition.i=elementPosition.i+1;
        }
    }else if(direction===1){
        elementPosition.i=elementPosition.i-1;
    }else if(direction===2){
        elementPosition.j=elementPosition.j+1;
    }else if(direction===2){
        elementPosition.j=elementPosition.j-1;
    }
}

