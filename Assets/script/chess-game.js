import { ChessBoard, MoveCastle } from "./index-module.js";

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

        var tmpPieceX,tmpPieceY;
        
        field[move.x][move.y]=move.piece;
        field[move.piece.x][move.piece.y]=null;
        if(move.tookEnPassant){
            field[move.x][move.piece.y]=null;
        }else if(move.constructor===MoveCastle){
            var plusOrMinus=move.x>move.piece.x?1:-1;
            move.piece.x=4+1*plusOrMinus;
            field[move.x][move.y]=null;
            field[4][move.y]=null;
            field[4+1*plusOrMinus][move.y]=move.piece;
            if(!this.inCheck(this.whiteMove,field)){
                field[4+1*plusOrMinus][move.y]=null;
                field[move.x][move.y]=move.piece;
            }else{
                move.piece.x=4;
                field[4][move.y]=move.piece;
                field[4+1*plusOrMinus][move.y]=null;
                console.error("illegal castle move!");
                return;
            }
        }
        tmpPieceX=move.piece.x;
        tmpPieceY=move.piece.y;
        move.piece.x=move.x;
        move.piece.y=move.y;
        //check for checks!
        if(!this.inCheck(this.whiteMove,field)){
            //if move legal
            this.field=field;
            this.whiteMove=!this.whiteMove;
            move.piece.hasMoved=true;
            if(move.enPassantPossible){
                move.piece.enPassantPossible=move.enPassantPossible;
                move.piece.chessBoard.enPassantAblePieces.push({piece:move.piece,TTL:1});
            }
            this.enPassantAblePieces.forEach((element, index) => {
                if(element.TTL===0){
                    element.piece.enPassantPossible=false;
                }
                element.TTL--;                    
            });
            this.enPassantAblePieces=this.enPassantAblePieces.filter(x=>x.TTL>=0);
            if(move.constructor===MoveCastle){
                field[move.rock.x][move.rock.y]=null;
                field[move.xRock][move.yRock]=move.rock;
                move.rock.x=move.xRock;
                move.rock.y=move.yRock;
            }
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