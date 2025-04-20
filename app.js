let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns =[ "yellow" ,"red",   "purple", "green"];

let h2 = document.querySelector("h2");
document.addEventListener("keypress", function(){
    if (started == false){
        started = true;

        levelup();
    }

});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout( function(){
        btn.classList.remove("flash");
    }, 250);

}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout( function(){
        btn.classList.remove("userflash");
    }, 100);

}
function levelup(){
    userSeq = [];
  level++;
  h2.innerText = `level ${level}`;
  
  let randIdx =Math.floor(Math.random()* 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randBtn);

}

let highScore = 0;
let newH2 = document.createElement("h2");
newH2.setAttribute("id", "highScoreText");
newH2.innerText = `Your highest score is ${highScore} 🔥`; // set the text
document.body.appendChild(newH2); // add it to the page
function checkAns(idx) {
    
    if (userSeq[idx] == gameSeq[idx]){
        if (userSeq.length == gameSeq.length){
            setTimeout(levelup, 1200);
        }
    } else{
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start `;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white"; 
        },150);
        
        if ( highScore < level){
            highScore = level ;
            newH2.innerText = `Your highest score is ${Math.max(highScore - 1, 0)} 🔥`;
            
        }
        reset();

    }

}

function btnPress(){
    let btn = this;
    console.log("Button clicked:", btn.id); // Add this line
    userFlash(btn);
    let userColor= btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length -1);

}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


function reset(){
    started = false;
    userSeq=[];
    gameSeq =[];
    
    level=0;
}