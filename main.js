//랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 렌덤번호가 < 유저번호 Down!
// 랜덤번호가 > 유저 번호 up
// Rest버튼을 누르면 게임이 리셋
// 5번의 기회를 다쓰면 게임이 끝난다.  (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지않는다.

let computerNum = 0
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area");
let history=[] // 지금까지의 숫자들을 알아야하기 때문에 배열로 기입.

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus",function(){userInput.value=""} )
// focus는 커서를 input에 클릭했을 때 clear되는 것.
// 익명의 함수, 즉 선언 안해도됨. 단순하거나 다른 곳에 사용되지 않을 때 사용할 수 있음.

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100)+1;
    console.log("정답", computerNum);
}

function play() {
    let userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultArea.textContent="Please enter a number between 1 and 100"
        return;
    }

    if(history.includes(userValue)){
        resultArea.textContent="It's already entered. Change the value."
        return;
    }

    chances --;
    chanceArea.textContent = `The remaining chance : ${chances}번`
    console.log("chance", chances);

    if (userValue < computerNum) {
        resultArea.textContent = "up!!";
    } else if (userValue > computerNum) {
        resultArea.textContent = "down!!";
    } else if (userValue == computerNum) {
        resultArea.textContent = "collect!!";
        gameOver = true;
    
        }

        history.push(userValue)
        console.log(history);
        
        if (chances <1){
        gameOver=true
       }
       if (gameOver == true){
        playButton.disabled = true
    }

   
}
function reset() {
    // user input 창 깨끗 정리
    userInput.value = "";
    // 새로운 번호 생성
    pickRandomNum();

    resultArea.textContent="The result value appears!";
    // 게임 오버 플래그 초기화
    gameOver = false;
    // 기회 횟수 초기화
    chances = 5;
    // 기회 횟수 표시 초기화
    chanceArea.textContent = `The remaining chance : ${chances}번`;
    // 플레이 버튼 활성화
    playButton.disabled = false;
    // 히스토리 초기화
    history = [];
}


pickRandomNum();