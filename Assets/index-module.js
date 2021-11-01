export class ChessBoard{
    constructor(field){
        if(field===undefined){
            this.setDefaultField();
        }else{
            this.field=field;
        }
    }

    movePiece(move){
        this.field[move.y][move.x]=move.piece;
        this.field[move.piece.y][move.piece.x]=null;
        move.piece.x=move.x;
        move.piece.y=move.y;
    }

    setDefaultField(){
        var field=[];
        field.push([new Rock('Br',0,0,this),new Knight('Bk',1,0,this),new Bishop('Bb',2,0,this),new Queen('Bq',3,0,this),new King('BK',4,0,this),new Bishop('Bb',5,0,this),new Knight('Bk',6,0,this),new Rock('Br',7,0,this)]);
        field.push([new Pawn('Bp',0,1,this),new Pawn('Bp',1,1,this),new Pawn('Bp',2,1,this),new Pawn('Bp',3,1,this),new Pawn('Bp',4,1,this),new Pawn('Bp',5,1,this),new Pawn('Bp',6,1,this),new Pawn('Bp',7,1,this)]);
        for(var i=0;i<4;i++){
            field.push([null,null,null,null,null,null,null,null]);
        }
        field.push([new Pawn('Wp',0,6,this),new Pawn('Wp',1,6,this),new Pawn('Wp',2,6,this),new Pawn('Wp',3,6,this),new Pawn('Wp',4,6,this),new Pawn('Wp',5,6,this),new Pawn('Wp',6,6,this),new Pawn('Wp',7,6,this)]);
        field.push([new Rock('Wr',0,7,this),new Knight('Wk',1,7,this),new Bishop('Wb',2,7,this),new Queen('Wq',3,7,this),new King('WK',4,7,this),new Bishop('Wb',5,7,this),new Knight('Wk',6,7,this),new Rock('Wr',7,7,this)]);
        this.field=field;
    }
}

export class Piece{
    constructor(pieceName,x,y,board){
        this.x=x;
        this.y=y;
        this.chessBoard=board;

        this.piece=pieceName;
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

    getPossibleMoves(){
        var moves=[];
        if(this.isBlack){
            if(this.x>0 && this.y<7 && this.chessBoard.field[this.y+1][this.x-1]!==null && this.chessBoard.field[this.y+1][this.x-1].isBlack===false){
                moves.push({x:this.x-1,y:this.y+1,piece:this});
            }
            if(this.x<7 && this.y<7 && this.chessBoard.field[this.y+1][this.x+1]!==null && this.chessBoard.field[this.y+1][this.x+1].isBlack===false){
                moves.push({x:this.x+1,y:this.y+1,piece:this});
            }
            if(this.y<7 && this.chessBoard.field[this.y+1][this.x]===null){
                moves.push({x:this.x,y:this.y+1,piece:this});
            }
            if(this.y===1 && this.chessBoard.field[this.y+1][this.x]===null && this.chessBoard.field[this.y+2][this.x]===null){
                moves.push({x:this.x,y:this.y+2,piece:this});
            }
        }else{
            if(this.x>0 && this.y>0 && this.chessBoard.field[this.y-1][this.x-1]!==null && this.chessBoard.field[this.y-1][this.x-1].isBlack===true){
                moves.push({x:this.x-1,y:this.y-1,piece:this});
            }
            if(this.x<7 && this.y>0 && this.chessBoard.field[this.y-1][this.x+1]!==null && this.chessBoard.field[this.y-1][this.x+1].isBlack===true){
                moves.push({x:this.x+1,y:this.y-1,piece:this});
            }
            if(this.y>0 && this.chessBoard.field[this.y-1][this.x]===null){
                moves.push({x:this.x,y:this.y-1,piece:this});
            }
            if(this.y===6 && this.chessBoard.field[this.y-1][this.x]===null && this.chessBoard.field[this.y-2][this.x]===null){
                moves.push({x:this.x,y:this.y-2,piece:this});
            }
        }
        
        return moves;
    }
}

export class Knight extends Piece{
    constructor(pieceName,x,y,board){
        super(pieceName,x,y,board);
    }

    getPossibleMoves(){
        var moves=[];
        if((this.y>1 && this.x>0 )&&(this.chessBoard.field[this.y-2][this.x-1]===null || this.chessBoard.field[this.y-2][this.x-1].isBlack!==this.isBlack)){
            moves.push({x:this.x-1,y:this.y-2,piece:this});
        }
        if((this.y>1 && this.x<7 )&&(this.chessBoard.field[this.y-2][this.x+1]===null || this.chessBoard.field[this.y-2][this.x+1].isBlack!==this.isBlack)){
            moves.push({x:this.x+1,y:this.y-2,piece:this});
        }
        if((this.y<6 && this.x>0 )&&(this.chessBoard.field[this.y+2][this.x-1]===null || this.chessBoard.field[this.y+2][this.x-1].isBlack!==this.isBlack)){
            moves.push({x:this.x-1,y:this.y+2,piece:this});
        }
        if((this.y<6 && this.x<7 )&&(this.chessBoard.field[this.y+2][this.x+1]===null || this.chessBoard.field[this.y+2][this.x+1].isBlack!==this.isBlack)){
            moves.push({x:this.x+1,y:this.y+2,piece:this});
        }
        if((this.y<7 && this.x<6 )&&(this.chessBoard.field[this.y+1][this.x+2]===null || this.chessBoard.field[this.y+1][this.x+2].isBlack!==this.isBlack)){
            moves.push({x:this.x+2,y:this.y+1,piece:this});
        }
        if((this.y>0 && this.x<6 )&&(this.chessBoard.field[this.y-1][this.x+2]===null || this.chessBoard.field[this.y-1][this.x+2].isBlack!==this.isBlack)){
            moves.push({x:this.x+2,y:this.y-1,piece:this});
        }
        if((this.y<7 && this.x>1 )&&(this.chessBoard.field[this.y+1][this.x-2]===null || this.chessBoard.field[this.y+1][this.x-2].isBlack!==this.isBlack)){
            moves.push({x:this.x-2,y:this.y+1,piece:this});
        }
        if((this.y>0 && this.x>1 )&&(this.chessBoard.field[this.y-1][this.x-2]===null || this.chessBoard.field[this.y-1][this.x-2].isBlack!==this.isBlack)){
            moves.push({x:this.x-2,y:this.y-1,piece:this});
        }
        return moves;
    }
}

export class Rock extends Piece{
    constructor(pieceName,x,y,board){
        super(pieceName,x,y,board);
    }

    getPossibleMoves(){
        var moves=[];
        for(var step=1;this.x+step<8;step++){
            if(this.chessBoard.field[this.y][this.x+step]===null){
                moves.push({x:this.x+step,y:this.y,piece:this});
            }else{
                if(this.chessBoard.field[this.y][this.x+step].isBlack!==this.isBlack){
                    moves.push({x:this.x+step,y:this.y,piece:this});
                }
                break;
            } 
        }
        for(var step=-1;this.x+step>=0;step--){
            if(this.chessBoard.field[this.y][this.x+step]===null){
                moves.push({x:this.x+step,y:this.y,piece:this});
            }else{
                if(this.chessBoard.field[this.y][this.x+step].isBlack!==this.isBlack){
                    moves.push({x:this.x+step,y:this.y,piece:this});
                }
                break;
            } 
        }
        for(var step=1;this.y+step<8;step++){
            if(this.chessBoard.field[this.y+step][this.x]===null){
                moves.push({x:this.x,y:this.y+step,piece:this});
            }else{
                if(this.chessBoard.field[this.y+step][this.x].isBlack!==this.isBlack){
                    moves.push({x:this.x,y:this.y+step,piece:this});
                }
                break;
            } 
        }
        for(var step=-1;this.y+step>=0;step--){
            if(this.chessBoard.field[this.y+step][this.x]===null){
                moves.push({x:this.x,y:this.y+step,piece:this});
            }else{
                if(this.chessBoard.field[this.y+step][this.x].isBlack!==this.isBlack){
                    moves.push({x:this.x,y:this.y+step,piece:this});
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

    getPossibleMoves(){
        var moves=[];
        for(var step=1;this.x+step<8 && this.y+step<8;step++){
            if(this.chessBoard.field[this.y+step][this.x+step]===null){
                moves.push({x:this.x+step,y:this.y+step,piece:this});
            }else{
                if(this.chessBoard.field[this.y+step][this.x+step].isBlack!==this.isBlack){
                    moves.push({x:this.x+step,y:this.y+step,piece:this});
                }
                break;
            } 
        }
        for(var step=-1;this.x+step>=0 && this.y+step>=0;step--){
            if(this.chessBoard.field[this.y+step][this.x+step]===null){
                moves.push({x:this.x+step,y:this.y+step,piece:this});
            }else{
                if(this.chessBoard.field[this.y+step][this.x+step].isBlack!==this.isBlack){
                    moves.push({x:this.x+step,y:this.y+step,piece:this});
                }
                break;
            } 
        }
        for(var step=1;this.x+step<8 && this.y+(-step)>=0;step++){
            if(this.chessBoard.field[this.y+(-step)][this.x+step]===null){
                moves.push({x:this.x+step,y:this.y+(-step),piece:this});
            }else{
                if(this.chessBoard.field[this.y+(-step)][this.x+step].isBlack!==this.isBlack){
                    moves.push({x:this.x+step,y:this.y+(-step),piece:this});
                }
                break;
            } 
        }
        for(var step=1;this.x+(-step)>=0 && this.y+step<8;step++){
            if(this.chessBoard.field[this.y+step][this.x+(-step)]===null){
                moves.push({x:this.x+(-step),y:this.y+step,piece:this});
            }else{
                if(this.chessBoard.field[this.y+step][this.x+(-step)].isBlack!==this.isBlack){
                    moves.push({x:this.x+(-step),y:this.y+step,piece:this});
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

    getPossibleMoves(){
        var moves=[];
        for(var step=1;this.x+step<8;step++){
            if(this.chessBoard.field[this.y][this.x+step]===null){
                moves.push({x:this.x+step,y:this.y,piece:this});
            }else{
                if(this.chessBoard.field[this.y][this.x+step].isBlack!==this.isBlack){
                    moves.push({x:this.x+step,y:this.y,piece:this});
                }
                break;
            } 
        }
        for(var step=-1;this.x+step>=0;step--){
            if(this.chessBoard.field[this.y][this.x+step]===null){
                moves.push({x:this.x+step,y:this.y,piece:this});
            }else{
                if(this.chessBoard.field[this.y][this.x+step].isBlack!==this.isBlack){
                    moves.push({x:this.x+step,y:this.y,piece:this});
                }
                break;
            } 
        }
        for(var step=1;this.y+step<8;step++){
            if(this.chessBoard.field[this.y+step][this.x]===null){
                moves.push({x:this.x,y:this.y+step,piece:this});
            }else{
                if(this.chessBoard.field[this.y+step][this.x].isBlack!==this.isBlack){
                    moves.push({x:this.x,y:this.y+step,piece:this});
                }
                break;
            } 
        }
        for(var step=-1;this.y+step>=0;step--){
            if(this.chessBoard.field[this.y+step][this.x]===null){
                moves.push({x:this.x,y:this.y+step,piece:this});
            }else{
                if(this.chessBoard.field[this.y+step][this.x].isBlack!==this.isBlack){
                    moves.push({x:this.x,y:this.y+step,piece:this});
                }
                break;
            } 
        }
        for(var step=1;this.x+step<8 && this.y+step<8;step++){
            if(this.chessBoard.field[this.y+step][this.x+step]===null){
                moves.push({x:this.x+step,y:this.y+step,piece:this});
            }else{
                if(this.chessBoard.field[this.y+step][this.x+step].isBlack!==this.isBlack){
                    moves.push({x:this.x+step,y:this.y+step,piece:this});
                }
                break;
            } 
        }
        for(var step=-1;this.x+step>=0 && this.y+step>=0;step--){
            if(this.chessBoard.field[this.y+step][this.x+step]===null){
                moves.push({x:this.x+step,y:this.y+step,piece:this});
            }else{
                if(this.chessBoard.field[this.y+step][this.x+step].isBlack!==this.isBlack){
                    moves.push({x:this.x+step,y:this.y+step,piece:this});
                }
                break;
            } 
        }
        for(var step=1;this.x+step<8 && this.y+(-step)>=0;step++){
            if(this.chessBoard.field[this.y+(-step)][this.x+step]===null){
                moves.push({x:this.x+step,y:this.y+(-step),piece:this});
            }else{
                if(this.chessBoard.field[this.y+(-step)][this.x+step].isBlack!==this.isBlack){
                    moves.push({x:this.x+step,y:this.y+(-step),piece:this});
                }
                break;
            } 
        }
        for(var step=1;this.x+(-step)>=0 && this.y+step<8;step++){
            if(this.chessBoard.field[this.y+step][this.x+(-step)]===null){
                moves.push({x:this.x+(-step),y:this.y+step,piece:this});
            }else{
                if(this.chessBoard.field[this.y+step][this.x+(-step)].isBlack!==this.isBlack){
                    moves.push({x:this.x+(-step),y:this.y+step,piece:this});
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

    getPossibleMoves(){
        var moves=[];
        if(this.x<7 && (this.chessBoard.field[this.y][this.x+1]===null || this.chessBoard.field[this.y][this.x+1].isBlack!==this.isBlack)){
            moves.push({x: this.x+1,y:this.y,piece:this});
        }
        if(this.x<7 && this.y<7 && (this.chessBoard.field[this.y+1][this.x+1]===null || this.chessBoard.field[this.y+1][this.x+1].isBlack!==this.isBlack)){
            moves.push({x: this.x+1,y:this.y+1,piece:this});
        }
        if(this.y<7 && (this.chessBoard.field[this.y+1][this.x]===null || this.chessBoard.field[this.y+1][this.x].isBlack !== this.isBlack)){
            moves.push({x: this.x,y:this.y+1,piece:this});
        }
        if(this.x>0 && this.y<7 && (this.chessBoard.field[this.y+1][this.x-1]===null || this.chessBoard.field[this.y+1][this.x-1].isBlack !== this.isBlack)){
            moves.push({x: this.x-1,y:this.y+1,piece:this});
        }
        if(this.x>0 && (this.chessBoard.field[this.y][this.x-1]===null || this.chessBoard.field[this.y][this.x-1].isBlack !== this.isBlack)){
            moves.push({x: this.x-1,y:this.y,piece:this});
        }
        if(this.x>0 && this.y>0 && (this.chessBoard.field[this.y-1][this.x-1]===null || this.chessBoard.field[this.y-1][this.x-1].isBlack !== this.isBlack)){
            moves.push({x: this.x-1,y:this.y-1,piece:this});
        }
        if(this.y>0 && (this.chessBoard.field[this.y-1][this.x]===null || this.chessBoard.field[this.y-1][this.x].isBlack !== this.isBlack)){
            moves.push({x: this.x,y:this.y-1,piece:this});
        }
        if(this.x<7 &&  this.y>0 && (this.chessBoard.field[this.y-1][this.x+1]===null || this.chessBoard.field[this.y-1][this.x+1].isBlack !== this.isBlack)){
            moves.push({x: this.x+1,y:this.y-1,piece:this});
        }
        return moves;
    }
}

export function printFieldToConsole(field){
    var retString="";
    for(var i=0;i<field.length;i++){
        for(var j=0;j<field[i].length;j++){
            retString+=`${field[i][j]===''?'  ':field[i][j]}, `;
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