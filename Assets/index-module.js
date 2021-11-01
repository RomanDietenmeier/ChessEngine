export class Piece{
    constructor(pieceName){
        this.piece=pieceName;
    }
}

export function getDefaultField(){
    var field=[];
    field.push([new Piece('Br'),new Piece('Bk'),new Piece('Bb'),new Piece('Bq'),new Piece('BK'),new Piece('Bb'),new Piece('Bk'),new Piece('Br')]);
    field.push([new Piece('Bp'),new Piece('Bp'),new Piece('Bp'),new Piece('Bp'),new Piece('Bp'),new Piece('Bp'),new Piece('Bp'),new Piece('Bp')]);
    for(var i=0;i<4;i++){
        field.push([null,null,null,null,null,null,null,null]);
    }
    field.push([new Piece('Wp'),new Piece('Wp'),new Piece('Wp'),new Piece('Wp'),new Piece('Wp'),new Piece('Wp'),new Piece('Wp'),new Piece('Wp')]);
    field.push([new Piece('Wr'),new Piece('Wk'),new Piece('Wb'),new Piece('Wq'),new Piece('WK'),new Piece('Wb'),new Piece('Wk'),new Piece('Wr')]);
    return field;
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