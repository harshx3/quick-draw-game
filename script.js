const startButton = document.querySelector(".start-game-button");

startButton.addEventListener('click', startGame);
const gameBoard = document.createElement("div");


function timer(adminSection) {
    const timerDiv = document.createElement("div");
    timerDiv.className = "timer-div";
    adminSection.append(timerDiv);
    let timeLeft = 120;
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerDiv.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;
        if (timeLeft < 0) {
            timeLeft = 120;
        }
    }
    setInterval(updateTimer, 1000);
    updateTimer();

}

function startGame() {
    console.log("clicked");
    // document.body.innerHTML = "";
    const removeContent = document.querySelector(".main-start-game-div");
    removeContent.innerHTML = "";

    document.body.appendChild(gameBoard);
    gameBoard.classList.add("game-board");

    const adminSection = document.createElement("div");
    gameBoard.append(adminSection);
    adminSection.classList.add("admin-section");

    const numbersDiv = document.createElement("div");
    numbersDiv.classList.add("numbers-div");
    adminSection.append(numbersDiv);
    numbersDiv.style.width = "600px";
    numbersDiv.style.height = "500px";
    numbersDiv.style.border = "2px solid black";
    numbersDiv.style.display = 'flex';
    numbersDiv.style.overflow = "hidden";
    numbersDiv.style.flexWrap = "wrap";
    // numbersDiv.style.textAlign = "center"
    numbersDiv.style.justifyContent = "center"
    numbersDiv.style.alignItems = "center";
    numbersDiv.style.gap = "1rem";


    for (let i = 1; i <= 80; i++) {
        setTimeout(() => {
            const number = document.createElement("div");
            number.innerHTML = i;
            number.style.width = "20px";
            number.style.height = "20px";
            number.style.textAlign = "center";
            number.style.border = "2px solid black";
            number.style.borderRadius = "0.5rem";
            number.style.padding = "1rem";
            number.style.display = "flex";
            number.style.justifyContent = "center"
            number.style.alignItems = "center";



            numbersDiv.appendChild(number);
        }, i * 1000);

    }
    timer(adminSection);
}