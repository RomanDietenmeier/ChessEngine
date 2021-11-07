import { ChessGame } from './Assets/script/chess-game.js';
import {loadPieceImages}from './Assets/script/index-module.js';
var wrapperDiv=document.createElement('div');
var canvas=document.createElement('canvas');
var canvasContext=canvas.getContext("2d");
var piecePics=await loadPieceImages();
const canvasLengthPercentage=1;
var length=(window.innerWidth<window.innerHeight)?window.innerWidth*canvasLengthPercentage:window.innerHeight*canvasLengthPercentage;
var chessGame=new ChessGame();
var moves=[];
wrapperDiv.style.marginLeft="auto";
wrapperDiv.style.marginRight="auto";
wrapperDiv.style.textAlign="center";
wrapperDiv.style.width=length;
wrapperDiv.style.height=length;
canvas.height=length;
canvas.width=length;
canvas.style.boxShadow="0 0 10px black";
canvas.style.backgroundColor="white";





printFieldOnCanvas(chessGame.field);

wrapperDiv.append(canvas);
document.body.append(wrapperDiv);
canvas.onclick=(e)=>{
    const rect = canvas.getBoundingClientRect();
    const x = parseInt((e.clientX - rect.left)/(length/8));
    const y = parseInt((e.clientY - rect.top)/(length/8));
    for(var i=0;i<moves.length;i++){
        if(x===moves[i].x && y===moves[i].y){
            chessGame.movePiece(moves[i]);
            printFieldOnCanvas(chessGame.field);
            moves=[];
            return;
        }
    }
    if(chessGame.field[x][y]===null){
        console.log(x,y,chessGame.field[x][y]);
    }else{
        moves=chessGame.field[x][y].getPossibleMoves();
        printFieldOnCanvas(chessGame.field);
        console.log(moves,chessGame.field[x][y]);
        moves.forEach(move => {
            canvasContext.beginPath();
            canvasContext.arc(move.x*(length/8)+(length/16),move.y*(length/8)+(length/16),length/17,0,2*Math.PI);
            canvasContext.lineWidth=1;
            canvasContext.strokeStyle='#003300';
            canvasContext.stroke();
        });
        // ctx.beginPath();
        // ctx.arc(x*100+50,y*100+50, 45, 0, 2 * Math.PI);
        // ctx.lineWidth = 5;
        // ctx.strokeStyle = '#003300';
        // ctx.stroke(); 
    }
}

window.onresize=(e)=>{
    length=(window.innerWidth<window.innerHeight)?window.innerWidth*canvasLengthPercentage:window.innerHeight*canvasLengthPercentage;
    canvas.height=length;
    canvas.width=length;    
    wrapperDiv.style.width=length;
    wrapperDiv.style.height=length;
    printFieldOnCanvas(chessGame.field);
}

function printFieldOnCanvas(field){
    for(var i=0;i<field.length;i++){
        for(var j=0;j<field[i].length;j++){
            if((i+j)%2==1){
                canvasContext.fillStyle="grey";
                canvasContext.fillRect(j*(length/8),i*(length/8),(length/8),(length/8));
            }else{
                canvasContext.fillStyle="white";
                canvasContext.fillRect(j*(length/8),i*(length/8),(length/8),(length/8));
            }
            var piece=(field[j][i]===null)?null:field[j][i].pieceName;
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