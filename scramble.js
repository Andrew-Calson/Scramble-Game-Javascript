var words = [];
var passLimit = 3;
var strikeLimit = 3;
var msgStatus = {
    message: "",
    color: "",
    bgColor: "",
    borderColor: "",
};
var guessedWord = "";
var game = {
    active: true,
    points: 0,
    strikes: 0,
    index: 0,
    suffledWord: "",
    currentList: [],
    originWord: "",
};
//start game
function initGame() {
    words = [
        "penguin",
        "magazine",
        "gun",
        "paper",
        "picture",
        "friend",
        "work",
        "money",
        "call",
        "ball",
        "taco",
        "family",
        "flip",
        "wooden",
        "pinch",
        "speed",
        "original",
        "security",
        "hand",
        "explode",
    ],
    passLimit = 3,
    strikeLimit = 3,
    msgStatus = {
        message: "",
        color: "",
        bgColor: "",
        borderColor: "",
    },
    guessedWord = "",
    game = {
        active: true,
        points: 0,
        strikes: 0,
        index: 0,
        suffledWord: "",
        currentList: [],
        originWord: "",
    }
    initWords();
    display();
}

function initWords() {
    var newWords = [];
    var duplicateWords = [...words];

    for (var i = 0; i < words.length; i++) {
        randomIndex = Math.floor(Math.random() * duplicateWords.length);
        newWords.push(duplicateWords[randomIndex]);
        duplicateWords.splice(randomIndex, 1);
    }

    words = newWords;
    game.suffledWord = suffle(words[0]);
    game.originWord = words[0];
}

function suffle(src) {
    copy = [...src];

    length = copy.length;
    for (var i = 0; i < length; i++) {
         x = copy[i];
         y = Math.floor(Math.random() * length);
         z = copy[y];
        copy[i] = z;
        copy[y] = x;
    }

    if (typeof src === "string") {
        return copy.join("").toUpperCase();
    }

    return copy;
}

function checkWord(event) {
    if(event.keyCode == 13){
        var inputVal = document.getElementById('text_box').value;
        if (inputVal === "") {
            msgStatus.message = "Please guess what this word is!";
            console.log(msgStatus.message);
            msgStatus.color = "#a94442";
            msgStatus.bgColor = "#f2dede";
            msgStatus.borderColor = "#ebccd1";
            display();
            return;
        }
    
        for (var i = 0; i < words.length; i++) {
            if (game.currentList.length === words.length) {
            msgStatus.message = "You win.";
            msgStatus.color = "#3c763d";
            msgStatus.bgColor = "#dff0d8";
            msgStatus.borderColor = "#d6e9c6";
            game.active = false;
            display();
            return;
            }
            if (inputVal.toLowerCase() === game.originWord) {
            msgStatus.message = "Correct. Next word.";
            msgStatus.color = "#3c763d";
            msgStatus.bgColor = "#dff0d8";
            msgStatus.borderColor = "#d6e9c6";
            game.points++;
            game.index++;
            if (game.index > words.length - 1) {
                msgStatus.message = "You win.";
                msgStatus.color = "#3c763d";
                msgStatus.bgColor = "#dff0d8";
                msgStatus.borderColor = "#d6e9c6";
                game.active = false;
                display();
                return;
            } else {
                game.suffledWord = suffle(words[game.index]);
                game.originWord = words[game.index];
                game.currentList.push(game.originWord);
                document.getElementById("text_box").value = "";
                display();
                return;
            }
            } else {
            document.getElementById("text_box").value = "";
            msgStatus.message = "Wrong. Try again.";
            msgStatus.color = "#a94442";
            msgStatus.bgColor = "#f2dede";
            msgStatus.borderColor = "#ebccd1";
            game.strikes++;
            display();
    
            if (game.strikes >= strikeLimit) {
                msgStatus.message = "You lost.";
                msgStatus.color = "#a94442";
                msgStatus.bgColor = "#f2dede";
                msgStatus.borderColor = "#ebccd1";
                game.active = false;
                display();
                return;
            }
            return;
            }
        }
    }
}

function playAgain() {
    msgStatus.message = "";
    msgStatus.color = "";
    msgStatus.bgColor = "";
    msgStatus.borderColor = "";
    guessedWord = "";
    passLimit = 3;
    game.active = true;
    game.points = 0;
    game.strikes = 0;
    game.index = 0;
    game.suffledWord = "";
    game.currentList = [];
    game.originWord = "";
    initWords();
    display();
}
  
function passWord() {
    if (passLimit === 0) return;
    passLimit--;
    game.index++;
    msgStatus.message = "You passed. Next word.";
    msgStatus.color = "#31708f";
    msgStatus.bgColor = "#d9edf7";
    msgStatus.borderColor = "#bce8f1";
    game.suffledWord = suffle(words[game.index]);
    game.originWord = words[game.index];
    game.currentList.push(words[game.index - 1]);
    display();
}

function display() {
    document.getElementById('game_points').innerText = game.points;
    document.getElementById('game_strikes').innerText = game.strikes;
    document.getElementById('passLimit').innerText = passLimit;
    document.getElementById('suffleWord').innerText = game.suffledWord;
    document.querySelector('.msg-box').innerText = msgStatus.message;
    document.querySelector('.msg-box').style.color = msgStatus.color;
    document.querySelector('.msg-box').style.backgroundColor = msgStatus.bgColor;
    document.querySelector('.msg-box').style.borderColor = msgStatus.borderColor;
    
    if (game.active === true) {
        document.querySelector('#replay_btn').style.display = 'none';
        document.querySelector('#text_box').disabled = false;
        document.querySelector('#pass_btn').disabled = false;
    } else {
        document.querySelector('#replay_btn').style.display = 'inline-block';
        document.querySelector('#text_box').disabled = true;
        document.querySelector('#pass_btn').disabled = true;
    }
}

    
  