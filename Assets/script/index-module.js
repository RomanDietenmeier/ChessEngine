export class ChessBoard{
    constructor(field){
        if(field===undefined){
            this.setDefaultField();
        }else{
            this.field=field;
        }
    }

    movePiece(move){
        this.field[move.x][move.y]=move.piece;
        this.field[move.piece.x][move.piece.y]=null;
        move.piece.x=move.x;
        move.piece.y=move.y;
    }

    setDefaultField(){
        var field=[];
        field.push([new Rock('Br',0,0,this),new Pawn('Bp',0,1,this),null,null,null,null,new Pawn('Wp',0,6,this),new Rock('Wr',0,7,this)]);
        field.push([new Knight('Bk',1,0,this),new Pawn('Bp',1,1,this),null,null,null,null,new Pawn('Wp',1,6,this),new Knight('Wk',1,7,this)]);
        field.push([new Bishop('Bb',2,0,this),new Pawn('Bp',2,1,this),null,null,null,null,new Pawn('Wp',2,6,this),new Bishop('Wb',2,7,this)]);
        field.push([new Queen('Bq',3,0,this),new Pawn('Bp',3,1,this),null,null,null,null,new Pawn('Wp',3,6,this),new Queen('Wq',3,7,this)]);
        field.push([new King('BK',4,0,this),new Pawn('Bp',4,1,this),null,null,null,null,new Pawn('Wp',4,6,this),new King('WK',4,7,this)]);
        field.push([new Bishop('Bb',5,0,this),new Pawn('Bp',5,1,this),null,null,null,null,new Pawn('Wp',5,6,this),new Bishop('Wb',5,7,this)]);
        field.push([new Knight('Bk',6,0,this),new Pawn('Bp',6,1,this),null,null,null,null,new Pawn('Wp',6,6,this),new Knight('Wk',6,7,this)]);
        field.push([new Rock('Br',7,0,this),new Pawn('Bp',7,1,this),null,null,null,null,new Pawn('Wp',7,6,this),new Rock('Wr',7,7,this)]);
        this.field=field;
    }
}

export class Move{
    constructor(x,y,piece){
        this.x=x;
        this.y=y;
        this.piece=piece;
    }
}

export class Piece{
    constructor(pieceName,x,y,board){
        this.x=x;
        this.y=y;
        this.chessBoard=board;

        this.pieceName=pieceName;
        this.hasMoved=false;
        this.isBlack=(pieceName[0]==='B'?true:false);
    }

    getPossibleMoves(){
        return [];
    }
}

export class Pawn extends Piece{
    constructor(pieceName,x,y,board){
        super(pieceName,x,y,board);
    }

    getPossibleMoves(field=this.chessBoard.field){
        var moves=[];
        if(this.isBlack){
            if(this.x>0 && this.y<7 && field[this.x-1][this.y+1]!==null && field[this.x-1][this.y+1].isBlack===false){
                moves.push(new Move(this.x-1,this.y+1,this));
            }
            if(this.x<7 && this.y<7 && field[this.x+1][this.y+1]!==null && field[this.x+1][this.y+1].isBlack===false){
                moves.push(new Move(this.x+1,this.y+1,this));
            }
            if(this.y<7 && field[this.x][this.y+1]===null){
                moves.push(new Move(this.x,this.y+1,this));
            }
            if(this.y===1 && field[this.x][this.y+1]===null && field[this.x][this.y+2]===null){
                moves.push(new Move(this.x,this.y+2,this));
            }
        }else{
            if(this.x>0 && this.y>0 && field[this.x-1][this.y-1]!==null && field[this.x-1][this.y-1].isBlack===true){
                moves.push(new Move(this.x-1,this.y-1,this));
            }
            if(this.x<7 && this.y>0 && field[this.x+1][this.y-1]!==null && field[this.x+1][this.y-1].isBlack===true){
                moves.push(new Move(this.x+1,this.y-1,this));
            }
            if(this.y>0 && field[this.x][this.y-1]===null){
                moves.push(new Move(this.x,this.y-1,this));
            }
            if(this.y===6 && field[this.x][this.y-1]===null && field[this.x][this.y-2]===null){
                moves.push(new Move(this.x,this.y-2,this));
            }
        }
        return moves;
    }
}

export class Knight extends Piece{
    constructor(pieceName,x,y,board){
        super(pieceName,x,y,board);
    }

    getPossibleMoves(field=this.chessBoard.field){
        var moves=[];
        if((this.y>1 && this.x>0 )&&(field[this.x-1][this.y-2]===null || field[this.x-1][this.y-2].isBlack!==this.isBlack)){
            moves.push(new Move(this.x-1,this.y-2,this));
        }
        if((this.y>1 && this.x<7 )&&(field[this.x+1][this.y-2]===null || field[this.x+1][this.y-2].isBlack!==this.isBlack)){
            moves.push(new Move(this.x+1,this.y-2,this));
        }
        if((this.y<6 && this.x>0 )&&(field[this.x-1][this.y+2]===null || field[this.x-1][this.y+2].isBlack!==this.isBlack)){
            moves.push(new Move(this.x-1,this.y+2,this));
        }
        if((this.y<6 && this.x<7 )&&(field[this.x+1][this.y+2]===null || field[this.x+1][this.y+2].isBlack!==this.isBlack)){
            moves.push(new Move(this.x+1,this.y+2,this));
        }
        if((this.y<7 && this.x<6 )&&(field[this.x+2][this.y+1]===null || field[this.x+2][this.y+1].isBlack!==this.isBlack)){
            moves.push(new Move(this.x+2,this.y+1,this));
        }
        if((this.y>0 && this.x<6 )&&(field[this.x+2][this.y-1]===null || field[this.x+2][this.y-1].isBlack!==this.isBlack)){
            moves.push(new Move(this.x+2,this.y-1,this));
        }
        if((this.y<7 && this.x>1 )&&(field[this.x-2][this.y+1]===null || field[this.x-2][this.y+1].isBlack!==this.isBlack)){
            moves.push(new Move(this.x-2,this.y+1,this));
        }
        if((this.y>0 && this.x>1 )&&(field[this.x-2][this.y-1]===null || field[this.x-2][this.y-1].isBlack!==this.isBlack)){
            moves.push(new Move(this.x-2,this.y-1,this));
        }
        return moves;
    }
}

export class Rock extends Piece{
    constructor(pieceName,x,y,board){
        super(pieceName,x,y,board);
    }

    getPossibleMoves(field=this.chessBoard.field){
        var moves=[];
        for(var step=1;this.x+step<8;step++){
            if(field[this.x+step][this.y]===null){
                moves.push(new Move(this.x+step,this.y,this));
            }else{
                if(field[this.x+step][this.y].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+step,this.y,this));
                }
                break;
            } 
        }
        for(var step=-1;this.x+step>=0;step--){
            if(field[this.x+step][this.y]===null){
                moves.push(new Move(this.x+step,this.y,this));
            }else{
                if(field[this.x+step][this.y].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+step,this.y,this));
                }
                break;
            } 
        }
        for(var step=1;this.y+step<8;step++){
            if(field[this.x][this.y+step]===null){
                moves.push(new Move(this.x,this.y+step,this));
            }else{
                if(field[this.x][this.y+step].isBlack!==this.isBlack){
                    moves.push(new Move(this.x,this.y+step,this));
                }
                break;
            } 
        }
        for(var step=-1;this.y+step>=0;step--){
            if(field[this.x][this.y+step]===null){
                moves.push(new Move(this.x,this.y+step,this));
            }else{
                if(field[this.x][this.y+step].isBlack!==this.isBlack){
                    moves.push(new Move(this.x,this.y+step,this));
                }
                break;
            } 
        }
        return moves;
    }
}

export class Bishop extends Piece{
    constructor(pieceName,x,y,board){
        super(pieceName,x,y,board);
    }

    getPossibleMoves(field=this.chessBoard.field){
        var moves=[];
        for(var step=1;this.x+step<8 && this.y+step<8;step++){
            if(field[this.x+step][this.y+step]===null){
                moves.push(new Move(this.x+step,this.y+step,this));
            }else{
                if(field[this.x+step][this.y+step].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+step,this.y+step,this));
                }
                break;
            } 
        }
        for(var step=-1;this.x+step>=0 && this.y+step>=0;step--){
            if(field[this.x+step][this.y+step]===null){
                moves.push(new Move(this.x+step,this.y+step,this));
            }else{
                if(field[this.x+step][this.y+step].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+step,this.y+step,this));
                }
                break;
            } 
        }
        for(var step=1;this.x+step<8 && this.y+(-step)>=0;step++){
            if(field[this.x+step][this.y+(-step)]===null){
                moves.push(new Move(this.x+step,this.y+(-step),this));
            }else{
                if(field[this.x+step][this.y+(-step)].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+step,this.y+(-step),this));
                }
                break;
            } 
        }
        for(var step=1;this.x+(-step)>=0 && this.y+step<8;step++){
            if(field[this.x+(-step)][this.y+step]===null){
                moves.push(new Move(this.x+(-step),this.y+step,this));
            }else{
                if(field[this.x+(-step)][this.y+step].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+(-step),this.y+step,this));
                }
                break;
            } 
        }
        return moves;
    }
}

export class Queen extends Piece{
    constructor(pieceName,x,y,board){
        super(pieceName,x,y,board);
    }

    getPossibleMoves(field=this.chessBoard.field){
        var moves=[];
        for(var step=1;this.x+step<8;step++){
            if(field[this.x+step][this.y]===null){
                moves.push(new Move(this.x+step,this.y,this));
            }else{
                if(field[this.x+step][this.y].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+step,this.y,this));
                }
                break;
            } 
        }
        for(var step=-1;this.x+step>=0;step--){
            if(field[this.x+step][this.y]===null){
                moves.push(new Move(this.x+step,this.y,this));
            }else{
                if(field[this.x+step][this.y].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+step,this.y,this));
                }
                break;
            } 
        }
        for(var step=1;this.y+step<8;step++){
            if(field[this.x][this.y+step]===null){
                moves.push(new Move(this.x,this.y+step,this));
            }else{
                if(field[this.x][this.y+step].isBlack!==this.isBlack){
                    moves.push(new Move(this.x,this.y+step,this));
                }
                break;
            } 
        }
        for(var step=-1;this.y+step>=0;step--){
            if(field[this.x][this.y+step]===null){
                moves.push(new Move(this.x,this.y+step,this));
            }else{
                if(field[this.x][this.y+step].isBlack!==this.isBlack){
                    moves.push(new Move(this.x,this.y+step,this));
                }
                break;
            } 
        }
        for(var step=1;this.x+step<8 && this.y+step<8;step++){
            if(field[this.x+step][this.y+step]===null){
                moves.push(new Move(this.x+step,this.y+step,this));
            }else{
                if(field[this.x+step][this.y+step].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+step,this.y+step,this));
                }
                break;
            } 
        }
        for(var step=-1;this.x+step>=0 && this.y+step>=0;step--){
            if(field[this.x+step][this.y+step]===null){
                moves.push(new Move(this.x+step,this.y+step,this));
            }else{
                if(field[this.x+step][this.y+step].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+step,this.y+step,this));
                }
                break;
            } 
        }
        for(var step=1;this.x+step<8 && this.y+(-step)>=0;step++){
            if(field[this.x+step][this.y+(-step)]===null){
                moves.push(new Move(this.x+step,this.y+(-step),this));
            }else{
                if(field[this.x+step][this.y+(-step)].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+step,this.y+(-step),this));
                }
                break;
            } 
        }
        for(var step=1;this.x+(-step)>=0 && this.y+step<8;step++){
            if(field[this.x+(-step)][this.y+step]===null){
                moves.push(new Move(this.x+(-step),this.y+step,this));
            }else{
                if(field[this.x+(-step)][this.y+step].isBlack!==this.isBlack){
                    moves.push(new Move(this.x+(-step),this.y+step,this));
                }
                break;
            } 
        }
        return moves;
    }
}

export class King extends Piece{
    constructor(pieceName,x,y,board){
        super(pieceName,x,y,board);
    }

    getPossibleMoves(field=this.chessBoard.field){
        var moves=[];
        if(this.x<7 && (field[this.x+1][this.y]===null || field[this.x+1][this.y].isBlack!==this.isBlack)){
            moves.push(new Move( this.x+1,this.y,this));
        }
        if(this.x<7 && this.y<7 && (field[this.x+1][this.y+1]===null || field[this.x+1][this.y+1].isBlack!==this.isBlack)){
            moves.push(new Move( this.x+1,this.y+1,this));
        }
        if(this.y<7 && (field[this.x][this.y+1]===null || field[this.x][this.y+1].isBlack !== this.isBlack)){
            moves.push(new Move( this.x,this.y+1,this));
        }
        if(this.x>0 && this.y<7 && (field[this.x-1][this.y+1]===null || field[this.x-1][this.y+1].isBlack !== this.isBlack)){
            moves.push(new Move( this.x-1,this.y+1,this));
        }
        if(this.x>0 && (field[this.x-1][this.y]===null || field[this.x-1][this.y].isBlack !== this.isBlack)){
            moves.push(new Move( this.x-1,this.y,this));
        }
        if(this.x>0 && this.y>0 && (field[this.x-1][this.y-1]===null || field[this.x-1][this.y-1].isBlack !== this.isBlack)){
            moves.push(new Move( this.x-1,this.y-1,this));
        }
        if(this.y>0 && (field[this.x][this.y-1]===null || field[this.x][this.y-1].isBlack !== this.isBlack)){
            moves.push(new Move( this.x,this.y-1,this));
        }
        if(this.x<7 &&  this.y>0 && (field[this.x+1][this.y-1]===null || field[this.x+1][this.y-1].isBlack !== this.isBlack)){
            moves.push(new Move( this.x+1,this.y-1,this));
        }
        return moves;
    }
}

export function printFieldToConsole(field){
    var retString="";
    for(var i=0;i<field.length;i++){
        for(var j=0;j<field[i].length;j++){
            retString+=`${field[j][i]===''?'  ':field[j][i]}, `;
        }
        retString+="\n";
    }
    console.log(retString);
}

export async function loadPieceImages(){
    var returnJson={
        Bpawn: new Image(),
        Brock: new Image(),
        Bknight: new Image(),
        Bbishop: new Image(),
        Bqueen: new Image(),
        Bking: new Image(),
        Wpawn: new Image(),
        Wrock: new Image(),
        Wknight: new Image(),
        Wbishop: new Image(),
        Wqueen: new Image(),
        Wking: new Image(),
    }
    returnJson.Bpawn.src='./Assets/pieces-black/pawn.png';
    returnJson.Brock.src='./Assets/pieces-black/rock.png';
    returnJson.Bknight.src='./Assets/pieces-black/knight.png';
    returnJson.Bbishop.src='./Assets/pieces-black/bishop.png';
    returnJson.Bqueen.src='./Assets/pieces-black/queen.png';
    returnJson.Bking.src='./Assets/pieces-black/king.png';

    returnJson.Wpawn.src='./Assets/pieces-white/pawn.png';
    returnJson.Wrock.src='./Assets/pieces-white/rock.png';
    returnJson.Wknight.src='./Assets/pieces-white/knight.png';
    returnJson.Wbishop.src='./Assets/pieces-white/bishop.png';
    returnJson.Wqueen.src='./Assets/pieces-white/queen.png';
    returnJson.Wking.src='./Assets/pieces-white/king.png';

    var promiseArray=[]
    Object.entries(returnJson).forEach(entry => {
        const[key,element]=entry;
        promiseArray.push(new Promise(resolve => {
            element.onload=()=>{resolve();}
        }))
    });
    await Promise.all(promiseArray);
    return returnJson;
}