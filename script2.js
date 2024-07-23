let boxes = document.querySelectorAll(".box")
let reset = document.querySelector("#reset")
let output = document.getElementById("output")

str = "";
//Turn
turnU = true;
const winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const checkWin = () => {
    for (let pattern of winningPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            console.log("won");
            return boxes[a].innerText
        }
    }
    return null

};

checkIfNoneIsEmpty = ()=>{
    
    for(let box of boxes){
        if(box.innerText == ''){
            return false
        }
    }
    return true
}

compMove = ()=>{
    let bestMove = null;

    //check for winning moves
    for(let pattern of winningPatterns){
        let [a,b,c] = pattern;
        if(boxes[a].innerText === "O" && boxes[b].innerText === "O" && boxes[c].innerText === "" ){
            bestMove = c;
        }
        else if(boxes[a].innerText === "O" && boxes[b].innerText === "" && boxes[c].innerText === "O"){
            bestMove = b;
        }
        else if(boxes[a].innerText === "" && boxes[b].innerText === "O" && boxes[c].innerText === "O"){
            bestMove = a;
        }
    }

    //if no winning move, check for blocking move
    if(bestMove==null)
    {
        for(let pattern of winningPatterns){
            let [a,b,c] = pattern;
            if(boxes[a].innerText === "X" && boxes[b].innerText === "X" && boxes[c].innerText === "" ){
                bestMove = c;
            }
            else if(boxes[a].innerText =="X" && boxes[b].innerText =="" && boxes[c].innerText === "X"){
                bestMove = b;
            }
            else if(boxes[a].innerText === "" && boxes[b].innerText === "X" && boxes[c].innerText === "X"){
                bestMove = a;
            }
        }
    }

    //no winning no blocking move then
    if(bestMove == null){
        bestMove = String(Math.floor(Math.random()*9))
        console.log("Comp initialy choosed ",bestMove)
        if(str.includes(bestMove)){
            console.log("Comp vent inside if")
            while(str.includes(bestMove) != false){
                bestMove = String(Math.floor(Math.random()*9))
            }
        }
        console.log("After if index is  ",bestMove)
        str = str + bestMove;
    }
    

    boxes[bestMove].innerText = 'O';
    boxes[bestMove].disabled = true;
    turnU = true;    
}



boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnU)
        {
            let userBoxId = box.getAttribute("id")
            str = str + userBoxId
            console.log(userBoxId)
            box.innerText="X";
            turnU=false;
            box.disabled = true
        }
        let winner = checkWin();
        if(winner!= null){
            console.log("end. Winner is ", winner)
            output.style.visibility = "visible"
            output.innerText = `Winner is ${winner}. The game has ended to play again click on reset.`
            boxes.forEach((box)=>{
                box.disabled = true
            })
        }
        else if(checkIfNoneIsEmpty() && winner == null){
            output.style.visibility = "visible"
            output.innerText = `It's a Tie. The game has ended to play again click on reset.`
        }
        else {
            // Computer makes a move only if the game hasn't ended
            compMove(); 
            //check if computer has ended the game
            winner = checkWin();
            if(winner!= null){
                console.log("end. Winner is ", winner)
                output.style.visibility = "visible"
                output.innerText = `Winner is ${winner}. The game has ended to play again click on reset.`
                boxes.forEach((box)=>{
                    box.disabled = true
                })
            }
            else if(checkIfNoneIsEmpty() && winner == null){
                output.style.visibility = "visible"
                output.innerText = `It's a Tie. The game has ended to play again click on reset.`
            }
        }
    })
})

reset.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.innerText="";
        box.disabled = false
    })
    console.log("Reset")
    turnU = true
    output.style.visibility = "hidden"
    str = ""
})