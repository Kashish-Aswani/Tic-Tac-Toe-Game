let boxes = document.querySelectorAll(".box")
let reset = document.querySelector("#reset")
let output = document.getElementById("output")
//Turn
turnX = true;
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


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnX)
        {
            box.innerText="X";
            turnX=false;
        }
        else{
            box.innerText="O";
            turnX=true;
        }
        box.disabled = true
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
    })
})

reset.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.innerText="";
        box.disabled = false
    })
    console.log("Reset")
    turnX = true
    output.style.visibility = "hidden"
})