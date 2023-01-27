const cells = document.querySelectorAll(".cell");
const status = document.querySelector("#player-turn");
const restartBtn = document.querySelector("#restart");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options =["","","","","","","","",""];
let  running = false;
let currentPlayer = "X";

init();
function init(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    status.textContent = `${currentPlayer}'s turn`;
    running = true;
}


function cellClicked(){
    const cellIndex = this.getAttribute("index");
    if((options[cellIndex]!="")||(!running)){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}


function updateCell(cell,index){
    options[index] = currentPlayer ;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer =="X") ? "O" : "X";
    status.textContent = `${currentPlayer}'s turn`;
}


function checkWinner(){
    let roundWon = false;
    for( let i = 0; i<winConditions.length ; i++){
        const condition = winConditions[i];
        
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        console.log(cellA);
        console.log(cellB);
        console.log(cellC);
        if(cellA == ""||cellB == ""||cellC == ""){
            continue;
            
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
            
        }
    }

    if(roundWon){
        status.textContent = `${currentPlayer} wins !!!`;
        running = false;
    }
    else if(!options.includes("")){
        status.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }

}
function restartGame(){
    options =["","","","","","","","",""];
    running = true;
    currentPlayer = "X";
    status.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
}

