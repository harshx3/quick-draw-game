const startButton = document.querySelector(".start-game-button");

startButton.addEventListener('click', startGame);

//main page = game board;
const gameBoard = document.createElement("div");

//admin section
const adminSection = document.createElement("div");

//user section
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

// function getRadioValue() {
//     const radios = Array.from(document.getElementsByName("select-number"));
//     let selectedOption = '';
//     radios.forEach(radio => {
//         if (radio.checked) {
//             selectedOption = radio.value;
//         }
//     })
//     console.log(selectedOption);
//     coustomerSelectionBoard(selectedOption);
// }

// function coustomerSelectionBoard(selectedOption) {
//     // console.log("coustomer board called");

//     // console.log("user section appended to gameboard");
//     const isPresent = document.querySelector("user-number-div");
//     if (isPresent) {
//         isPresent.remove();
//     }
//     const userNumberDiv = document.createElement("div");
//     userNumberDiv.className = "user-number-div";
//     userSection.append(userNumberDiv);

//     let selectedCount = 0;
//     let userSelectedNumbers = [];

//     for (var i = 1; i <= 80; i++) {
//         const numButton = document.createElement("button");
//         numButton.innerText = i;
//         numButton.className = "user-number-button";

//         numButton.addEventListener("click", () => {
//             const userSelectedNumberValue = parseInt(numButton.innerText);

//             if (numButton.classList.contains("selected-numbers")) {
//                 numButton.classList.remove("selected-numbers");
//                 const index = userSelectedNumbers.indexOf(userSelectedNumberValue);

//                 selectedCount--;
//             }
//             else if (selectedCount < selectedOption) {
//                 numButton.classList.add("selected-numbers");
//                 selectedCount++;
//             }
//             else {
//                 alert("You have selected maximum allowed numbers");
//             }


//         });
//         console.log(selectedCount);
//         userNumberDiv.append(numButton);
//     }


// }


// Move these variables outside the function to maintain their state
let selectedCount = 0;
let userSelectedNumbers = [];
let currentSelectedOption = 0;
let selectedOption = '';
let winningNumbers = [];

function getRadioValue() {
    const radios = Array.from(document.getElementsByName("select-number"));

    radios.forEach(radio => {
        if (radio.checked) {
            selectedOption = parseInt(radio.value);
        }
    });
    console.log("number", selectedOption);
    console.log("arra", userSelectedNumbers);

    // Reset state when a new radio button is selected
    selectedCount = 0;
    userSelectedNumbers = [];
    currentSelectedOption = selectedOption;

    coustomerSelectionBoard(selectedOption);
}

function coustomerSelectionBoard(selectedOption) {
    // Remove existing user number div if present
    const existingDiv = document.querySelector(".user-number-div");
    if (existingDiv) {
        existingDiv.remove();
    }

    const userNumberDiv = document.createElement("div");
    userNumberDiv.className = "user-number-div";
    userSection.append(userNumberDiv);

    let canSelectBetAmount = false;

    for (var i = 1; i <= 80; i++) {
        const numButton = document.createElement("button");
        numButton.innerText = i;
        numButton.className = "user-number-button";

        numButton.addEventListener("click", () => {
            const userSelectedNumberValue = parseInt(numButton.innerText);

            if (numButton.classList.contains("selected-numbers")) {
                // Unselect the button
                numButton.classList.remove("selected-numbers");

                // Remove from selected numbers array
                const index = userSelectedNumbers.indexOf(userSelectedNumberValue);
                if (index > -1) {
                    userSelectedNumbers.splice(index, 1);
                }
                selectedCount--;
            }
            else if (selectedCount < currentSelectedOption) {
                // Select the button
                numButton.classList.add("selected-numbers");

                // Add to selected numbers array
                userSelectedNumbers.push(userSelectedNumberValue);
                selectedCount++;
            }
            else {
                alert(`You have selected maximum allowed numbers (${currentSelectedOption})`);
            }

            console.log("Selected Numbers:", userSelectedNumbers);
            console.log("Selected Count:", selectedCount);


        });

        userNumberDiv.append(numButton);
    }
    betAmount();

}


function betAmount() {

    const isPresent = document.querySelector(".amount-div");
    if (isPresent) {
        isPresent.remove();
    }

    const amountRadioButton = document.createElement("div");
    amountRadioButton.className = 'amount-div';
    userSection.append(amountRadioButton);
    const name = document.createElement("p");
    name.innerText = "Bet Amount";
    amountRadioButton.append(name);
    let amounts = [1, 2, 5, 10];
    amounts.forEach((amount) => {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "select-amount";
        radio.value = amount;

        const label = document.createElement("label");
        label.textContent = amount;
        label.appendChild(radio);
        amountRadioButton.append(label);
        radio.addEventListener("change", getAmountValue);
    });

}

function getAmountValue() {
    const radios = Array.from(document.getElementsByName("select-amount"));
    let selectedAmount = '';
    radios.forEach(radio => {
        if (radio.checked) {
            selectedAmount = parseInt(radio.value);
        }
    })
    console.log("amount", selectedAmount);
    selectWinningNumbers();
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
        // setTimeout(() => {
        const number = document.createElement("div");
        number.className = "gameboard-numbers"
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
        // }, i * 1000);

    }
    timer(adminSection);
    makeRadioButton();
}


// select the wining number
function selectWinningNumbers() {
    let i = 0;
    while (i < 20) {
        let lotteryNumber = Math.floor(Math.random() * 80) + 1;
        if (!isLotterNumberPresent(lotteryNumber)) {
            winningNumbers.push(lotteryNumber);
            i++;
        }
    }
    console.log("winnig", winningNumbers);
    showWinningNumbers(winningNumbers);
}

function isLotterNumberPresent(number) {
    return winningNumbers.includes(number);
}

// result view section
function showWinningNumbers(winningNumbers) {
    const resultDiv = document.createElement("div");
    resultDiv.className = "result-div";
    adminSection.appendChild(resultDiv);

    winningNumbers.map((number) => {
        const numBox = document.createElement("div");
        numBox.className = "result-num-box"
        resultDiv.appendChild(numBox);
        numBox.innerText = number;
    })
    putWinningNumberOnBoard();
}

function putWinningNumberOnBoard() {

    let numbersss = document.querySelectorAll(".gameboard-numbers");
    let boardNumbers = Array.from(numbersss);
    for (let i = 0; i <= winningNumbers.length; i++) {
        setTimeout(() => {
            boardNumbers.forEach((boardNumber) => {
                if (parseInt(boardNumber.innerHTML) === winningNumbers[i]) {
                    boardNumber.style.backgroundColor = "red";
                }
            })
        }, i * 2000);

    }
}