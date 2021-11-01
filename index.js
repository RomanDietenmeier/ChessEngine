import {loadPieceImages, ChessBoard}from './Assets/index-module.js';
var wrapperDiv=document.createElement('div');
var canvas=document.createElement('canvas');
var canvasContext=canvas.getContext("2d");
var piecePics=await loadPieceImages();
const canvasLengthPercentage=0.98;
var length=(window.innerWidth<window.innerHeight)?window.innerWidth*canvasLengthPercentage:window.innerHeight*canvasLengthPercentage;
var chessBoard=new ChessBoard();
wrapperDiv.style.marginLeft="auto";
wrapperDiv.style.marginRight="auto";
wrapperDiv.style.width=length;
wrapperDiv.style.height=length;
canvas.height=length;
canvas.width=length;
canvas.style.boxShadow="0 0 10px black";
canvas.style.backgroundColor="white";





printFieldOnCanvas(chessBoard.field);

wrapperDiv.append(canvas);
document.body.append(wrapperDiv);
canvas.onclick=(e)=>{
    const rect = canvas.getBoundingClientRect();
    const x = parseInt((e.clientX - rect.left)/(length/8));
    const y = parseInt((e.clientY - rect.top)/(length/8));
    if(chessBoard.field[y][x]===null){
        console.log(x,y,chessBoard.field[y][x]);
    }else{
        console.log(JSON.stringify(chessBoard.field[y][x].getPossibleMoves()));
    }
}

window.onresize=(e)=>{
    length=(window.innerWidth<window.innerHeight)?window.innerWidth*canvasLengthPercentage:window.innerHeight*canvasLengthPercentage;
    canvas.height=length;
    canvas.width=length;    
    wrapperDiv.style.width=length;
    wrapperDiv.style.height=length;
    printFieldOnCanvas(chessBoard.field);
}

function printFieldOnCanvas(field){
    for(var i=0;i<field.length;i++){
        for(var j=0;j<field[i].length;j++){
            canvasContext.fillStyle="grey";
            if((i+j)%2==1){
                canvasContext.fillRect(j*(length/8),i*(length/8),(length/8),(length/8));
            }
            var piece=(field[i][j]===null)?null:field[i][j].piece;
            switch(piece){
                case 'Bp':
                    canvasContext.drawImage(piecePics.Bpawn,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                case 'Br':
                    canvasContext.drawImage(piecePics.Brock,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                case 'Bk':
                    canvasContext.drawImage(piecePics.Bknight,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                case 'Bb':
                    canvasContext.drawImage(piecePics.Bbishop,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                case 'Bq':
                    canvasContext.drawImage(piecePics.Bqueen,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                case 'BK':
                    canvasContext.drawImage(piecePics.Bking,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                case 'Wp':
                    canvasContext.drawImage(piecePics.Wpawn,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                case 'Wr':
                    canvasContext.drawImage(piecePics.Wrock,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                case 'Wk':
                    canvasContext.drawImage(piecePics.Wknight,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                case 'Wb':
                    canvasContext.drawImage(piecePics.Wbishop,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                case 'Wq':
                    canvasContext.drawImage(piecePics.Wqueen,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                case 'WK':
                    canvasContext.drawImage(piecePics.Wking,j*(length/8),i*(length/8),(length/8),(length/8));
                    break;
                default:
                    break;
            }
        }
    }
}