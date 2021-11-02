import { ChessBoard } from "./index-module.js";

export class ChessGame extends ChessBoard{
    constructor(field,whiteMove=true){
        super(field);
        this.whiteMove=whiteMove;
    }

    movePiece(move){
        if(move.piece.isBlack===this.whiteMove){
            console.error("wrong player to move!");
            return;
        }

        var field=[];
        this.field.map(x=>{field.push(x.slice())}); //copy field
        
        field[move.x][move.y]=move.piece;
        field[move.piece.x][move.piece.y]=null;
        var tmpPieceX=move.piece.x;
        var tmpPieceY=move.piece.y;
        move.piece.x=move.x;
        move.piece.y=move.y;
        //check for checks!
        if(!this.inCheck(this.whiteMove,field)){
            //if move legal
            this.field=field;
            this.whiteMove=!this.whiteMove;
        }else{
            move.piece.x=tmpPieceX;
            move.piece.y=tmpPieceY;
            console.error("illegal move!");
            return;
        }
    }

    inCheck(white=false,field){
        var kingPieceName=white?'WK':'BK';
        var king=null;
        for(var i=0;i<field.length;i++){
            for(var j=0;j<field[i].length;j++){
                if(field[i][j]!==null && field[i][j].pieceName===kingPieceName){
                    king=field[i][j];
                }    
            }
        }
        console.log('king',king);
        for(var i=0;i<field.length;i++){
            for(var j=0;j<field[i].length;j++){
                if(field[i][j]!==null && field[i][j].isBlack===white){
                    var moves=field[i][j].getPossibleMoves(field);
                    for(var k=0;k<moves.length;k++){
                        if(moves[k].x===king.x && moves[k].y===king.y){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}