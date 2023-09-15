const cell = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winCondition = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],  //first condition to win!

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],  //second condition to win!

    [0, 4, 8],
    [6, 4, 2]   //third condition to win!
];

let option = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X" && "O";
let running = false;

startGame();

function startGame() {

   cell.forEach(cell => cell.addEventListener("click", cellClicked));
   restartBtn.addEventListener("click", resetGame);
   statusText.textContent = `${currentPlayer} it's your turn`;
   running = true;
}

function cellClicked() {
  
    const cellIndex = this.getAttribute("cellIndex");

    if(option[cellIndex] !="" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, Index){

    option[Index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){

    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer} it's your turn`;
}

function checkWinner(){
    
    let roundWon = false;

   for(let i=0; i < winCondition.length; i++){
    const condition = winCondition[i];
    const cellA = option[condition[0]];
    const cellB = option[condition[1]];
    const cellC = option[condition[2]];

   if(cellA =="" || cellB =="" || cellC ==""){
        continue;
   }

   if(cellA == cellB && cellB === cellC){
        roundWon = true;
        break;
   }
   
}

if(roundWon){
    statusText.textContent = `${currentPlayer} you wins!`;
    running = false;
}

else if(!option.includes("")){
    statusText.textContent = "Draw!";
    running = false;
}

else{
    changePlayer();
}
}

function resetGame(){

    currentPlayer = "X";
    option = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cell.forEach(cell => cell.textContent = "");
    running = true;
}