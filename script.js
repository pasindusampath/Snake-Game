let direction =1;
document.addEventListener('keyup', (e) => {

    //clearInterval(interval);
    if (e.code === "ArrowDown") direction=0;
    else if (e.code === "ArrowUp") direction=1;
    else if (e.code === "ArrowRight") direction=2;
    else if (e.code === "ArrowLeft") direction=3;
    else if (e.code === "Space" ){
        if(interval!==null){
            clearInterval(interval)
            interval=null;
        }else {
            interval = setInterval(moveNext,300);
        }
    }


});
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
        elementPosition.i<39 ? elementPosition.i=elementPosition.i+1 : elementPosition.i=0;
    }else if(direction===1){
        elementPosition.i>0 ? elementPosition.i=elementPosition.i-1 : elementPosition.i=39;
    }else if(direction===2){
        elementPosition.j<39 ? elementPosition.j=elementPosition.j+1 : elementPosition.j=0;
    }else if(direction===3){
        elementPosition.j>0 ? elementPosition.j=elementPosition.j-1 : elementPosition.j=39;
    }
    return elementPosition;
}

function moveNext(item,pos){
    ar[pos.i][pos.j].div.css({"background-color":"black"})
    ar[pos.i][pos.j].move=true;
    ar[pos.i][pos.j].number=item.number;
    item.number=-1;
    item.move=false;
    item.div.css({"background-color":"red"})
}

function next(){
    let movableItems = getMovableItems();
    for (const movableItemsKey in movableItems) {
        let nextPos = findNextPositionToGo(parseInt(movableItemsKey+1));
        moveNext(movableItems[movableItemsKey],nextPos)
    }
}

let number = generateRandom(0,1600);
count=0;
l1:for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 40; j++) {
        if(count===number){
            ar[i][j].div.css({
                'background-color':'black'
            })
            ar[i][j].move = true;
            ar[i][j].color = 'black';
            ar[i][j].number = 1;
            console.log(ar[i][j]);
            break l1;
        }
        count++;
    }
}

console.log(ar)
function generateRandom(min, max) {

    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor( rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

setInterval(next,1000)