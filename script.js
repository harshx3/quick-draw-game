const startButton = document.querySelector(".start-game-button");

startButton.addEventListener('click', startGame);
const gameBoard = document.createElement("div");
const adminSection = document.createElement("div");
const userSection = document.createElement("div");
userSection.className = 'user-section';

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

function makeRadioButton() {
    gameBoard.appendChild(userSection);


    const radioButtonNumberSelectionDiv = document.createElement("div");
    radioButtonNumberSelectionDiv.className = "radio-button";
    userSection.append(radioButtonNumberSelectionDiv);
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    options.forEach((option) => {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "select-number";
        radio.value = option;
        // radio.className = "radio-button";

        const label = document.createElement("label");
        label.textContent = option;
        label.appendChild(radio);
        radioButtonNumberSelectionDiv.appendChild(label);

        //add event listener to call getradiovalue every time button click changes
        radio.addEventListener("change", getRadioValue);
    })


}

function getRadioValue() {
    const radios = document.getElementsByName("select-number");
    let selectedOption = '';
    radios.forEach(radio => {
        if (radio.checked) {
            selectedOption = radio.value;
        }
    })
    console.log(selectedOption);
    coustomerSelectionBoard(selectedOption);
}

function coustomerSelectionBoard(selectedOption) {
    // console.log("coustomer board called");

    // console.log("user section appended to gameboard");
    const userNumberDiv = document.createElement("div");
    userNumberDiv.className = "user-number-div";
    userSection.append(userNumberDiv);

    let selectedCount = 0;

    for (var i = 1; i <= 80; i++) {
        const numButton = document.createElement("button");
        numButton.innerText = i;
        numButton.className = "user-number-button";

        numButton.addEventListener("click", () => {
            if (selectedOption == 0) {
                alert("Select number from 1 to 10");
            }
            else if (selectedCount < selectedOption) {
                numButton.style.backgroundColor = "lightgreen";
                numButton.disabled = true;
                selectedCount++;

            }
            else {
                alert("You have selected maximum allowed numbers");
            }

        });
        console.log(selectedCount);
        userNumberDiv.append(numButton);
    }


}



function startGame() {
    console.log("clicked");
    // document.body.innerHTML = "";
    const removeContent = document.querySelector(".main-start-game-div");
    removeContent.innerHTML = "";

    document.body.appendChild(gameBoard);
    gameBoard.classList.add("game-board");


    gameBoard.append(adminSection);
    adminSection.classList.add("admin-section");

    //numbers Div which will show number board from 1 to 80
    const numbersDiv = document.createElement("div");
    numbersDiv.classList.add("numbers-div");
    adminSection.append(numbersDiv);
    // numbersDiv.style.width = "600px";
    // numbersDiv.style.height = "500px";
    // numbersDiv.style.border = "2px solid black";
    // numbersDiv.style.display = 'flex';
    // numbersDiv.style.overflow = "hidden";
    // numbersDiv.style.flexWrap = "wrap";
    // numbersDiv.style.textAlign = "center"
    // numbersDiv.style.justifyContent = "center"
    // numbersDiv.style.alignItems = "center";
    // numbersDiv.style.gap = "1rem";


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
    makeRadioButton();
}