var x = 317;
var y = 560;
var dx = 3;
var dxP = 3;
var dxN = -3;
var dy = -5;
var dyP = 5;
var dyN = -5;
var width = 625;
var height = 600;
var ctx;
var canvas;
var radZoge = 10;
var paddlex;
var paddleh;
var paddlew;
var paddleSP = 5;
var paddleSN = -5;
var rightDown = false;
var leftDown = false;
var NROWS = 4;
var NCOLS = 5;
var bricks = new Array(NROWS);
var BRICKWIDTH = (width / NCOLS) - 45;
var BRICKHEIGHT = 15;
var PADDING = 20;
var sekunde = 0;
var sekundeI;
var minuteI;
var intTimer;
var drawTimer;
var izpisTimer = "00:00";
var lives = 3;
var play = false;
var points = 000;
var sekunde1 = 0;
var sekundeI1;
var minuteI1;
var izpisTimer1 = 00;
var start = false;
var intTimer1;
var nakljucna = 0;
var nakljucna1 = 0;
var zmaga = false;
var winPoints = 0;
var dropBonusPointsBall = false;
var dropBonusLivesBall = false;
var dropPaddleBall = false;
var dropDirectBall = false;
var x2;
var y2;
var x3;
var y3;
var x4;
var y4;
var x5;
var y5;
var dyD = 3;
var allowBonusLivesTrue = 0;
var allowBonusPointsTrue = 0;
var allowPaddle = 0;
var allowDirect = 0;
var checkTimePaddle = 0;
var checkTimeDirect = 0;
var checkTimeLives = 0;
var won = false;
var allowBonusLives = true;
var allowBonusPoints = true;
var allowBigPaddle = true;
var allowDirectWays = true;
var directWaysGo = false;
var paddleON = false;
var LivesOn = false;
var directionsON = false;
var newLVL = 0;
var audio = new Audio('audio/StartGame.wav');
var audio3 = new Audio('audio/GameLost.wav');
var audio4 = new Audio('audio/TheGame.mp3');
audio4.loop= true;
audio4.volume=0.5;
var audio5 = new Audio('audio/Win.wav');
var audio2 = new Audio('audio/bounce.wav');
var audio6 = new Audio('audio/Bonus.wav');
var audio7 = new Audio('audio/newLVL.wav');
audio7.volume=0.3;
var bigPaddle = document.getElementById("zelen");
var wrongDirrections = document.getElementById("rdečobrat");

function nakljucnaPot() {
    nakljucna = Math.floor((Math.random() * 100 + 0));
    nakljucna1 = Math.floor((Math.random() * 5 + 1));
    if (nakljucna % 2 == 0) {
        dx = nakljucna1;
    } else
        dx = -nakljucna1;

}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function timer() {
    sekunde++;

    sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
    minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
    izpisTimer = minuteI + ":" + sekundeI;

    document.getElementById("timercic").innerHTML = izpisTimer;
}
function timer2() {
    sekunde1++;
    audio.play();
    sekundeI1 = ((sekundeI1 = (sekunde1 % 60)) > 9) ? sekundeI1 : "0" + sekundeI1;
    switch (sekundeI1) {
        case "01": izpisTimer1 = 3; break;
        case "02": izpisTimer1 = 2; break;
        case "03": izpisTimer1 = 1; break;
        case "04": izpisTimer1 = "GO"; break;
        default: start = true; break;
    }
    zacetek();
    document.getElementById("count").innerHTML = izpisTimer1;

}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initPaddle();
    initbricks();
    drawBall();
    drawPaddlet();
    drawBricks();
    nakljucnaPot();
    if (play)
        intTimer = setInterval(timer, 1000);

}

function draw() {
    if (play) {
        audio4.play();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();

        if (directWaysGo == true) {
            if (rightDown && paddlex > 1)
                paddlex = paddlex + paddleSP;
            else if (leftDown && paddlex < width - paddlew)
                paddlex = paddlex + paddleSN;
        } else {
            if (rightDown && paddlex < width - paddlew)
                paddlex = paddlex + paddleSP;
            else if (leftDown && paddlex > 1)
                paddlex = paddlex + paddleSN;
        }

        drawPaddlet();
        drawBricks();
        if (dropBonusPointsBall)
            drawBonusPointsBall();
        if (dropBonusLivesBall)
            drawBonusLifeBall();
        if (dropPaddleBall)
            drawPaddleBall();
        if (dropDirectBall)
            drawDirectBall();

        //bounce

        if (x + dx > width - 10) {

            dx = dxN;
        }
        if (x + dy < 10) {

            dx = dxP;
        }
        if (y + dy > height - 10) {

            dy = dyN;
        }
        if (y + dy < 10) {

            dy = dyP;
        }

        if (x + dx > paddlex && x + dx < paddlex + paddlew && y + dy > height - paddleh - 30) {
            dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
            dy = dyN;
            audio2.volume= 0.1;
            audio2.play();
        }
        

        if (dropBonusPointsBall) {
            if (y2 > height - 5) {
                x2 = 900;
            } else
                y2 = y2 + dyD;
        }
        if (dropPaddleBall) {
            if (y3 > height - 5) {
                x3 = 1000;
            } else
                y3 = y3 + dyD;
        }
        if (dropBonusLivesBall) {
            if (y4 > height - 5) {
                x4 = 900;
            } else
                y4 = y4 + dyD;
        }
        if (dropDirectBall) {
            if (y5 > height - 5) {
                x5 = 900;
            } else
                y5 = y5 + dyD;
        }
        if (x2 > paddlex && x2 < paddlex + paddlew && y2 + dyD > height - paddleh - 30 && dropBonusPointsBall == true && allowBonusPointsTrue == 0) {
            allowBonusPointsTrue++;
            points = points + 50;
            audio6.play();
            if (points < 100)
                document.getElementById("points").innerHTML = "0" + points + "+50";
            else
                document.getElementById("points").innerHTML = points + "+50";
            allowBonusPoints = false;
        }
        if (x3 > paddlex && x3 < paddlex + paddlew && y3 + dyD > height - paddleh - 30 && dropPaddleBall == true && allowPaddle == 0) {
            allowPaddle++;
            checkTimePaddle = sekundeI;
            paddlew = 150;
            allowBigPaddle = false;
            paddleON = true;
            bigPaddle.style.display = "inline-block";
        }
        if (x4 > paddlex && x4 < paddlex + paddlew && y4 + dyD > height - paddleh - 30 && dropBonusLivesBall == true && allowBonusLivesTrue == 0) {
            allowBonusLivesTrue++;
            lives = lives + 1;
            audio6.play();
            checkTimeLives = sekundeI;
            LivesOn = true;
            document.getElementById("lives").innerHTML = lives + "+1";
            allowBonusLives = false;

        }
        if (x5 > paddlex && x5 < paddlex + paddlew && y5 + dyD > height - paddleh - 30 && dropDirectBall == true && allowDirect == 0) {
            allowDirect++;
            checkTimeDirect = sekundeI;
            paddleSN = 5;
            paddleSP = -5;
            allowDirectWays = false;
            directWaysGo = true;
            directionsON = true;
            wrongDirrections.style.display = "inline-flex";
        }

        if (sekundeI - checkTimePaddle == 10 && paddleON == true) {
            paddleON = false;
            paddlew = 85;
            bigPaddle.style.display = "none";

        }
        if (sekundeI - checkTimeLives == 5 && LivesOn == true) {
            LivesOn = false;
            document.getElementById("lives").innerHTML = lives;
        }
        if (sekundeI - checkTimeDirect == 10 && directionsON == true) {
            directionsON = false;
            paddleSP = 5;
            paddleSN = -5;
            directWaysGo = false;
            wrongDirrections.style.display = "none";
        }

        if (y + dy > height - 15) {
            lives = lives - 1;
            if (lives < 1) {
                lives = 0;
                if (sekundeI > 10) {
                    sekundeI = sekundeI;
                } else {
                    switch (sekundeI1) {
                        case "01": sekundeI = 1; break;
                        case "02": sekundeI = 2; break;
                        case "03": sekundeI = 3; break;
                        case "04": sekundeI = 4; break;
                        case "05": sekundeI = 5; break;
                        case "06": sekundeI = 6; break;
                        case "07": sekundeI = 7; break;
                        case "08": sekundeI = 8; break;
                        case "09": sekundeI = 9; break;
                        default: break;
                    }
                }
                if (minuteI > 10) {
                    minuteI = minuteI;
                } else {
                    switch (minuteI) {
                        case "01": minuteI = 1; break;
                        case "02": minuteI = 2; break;
                        case "03": minuteI = 3; break;
                        case "04": minuteI = 4; break;
                        case "05": minuteI = 5; break;
                        case "06": minuteI = 6; break;
                        case "07": minuteI = 7; break;
                        case "08": minuteI = 8; break;
                        case "09": minuteI = 9; break;
                        default: break;
                    }
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops',
                    text: 'You lost all of the lives!\n You played for ' + minuteI + ' : ' + sekundeI + ' seconds and you recived ' + points + ' points',
                    backdrop: `
                    rgb(179, 0, 0,0.7)
                    `,
                    confirmButtonText: `Try Again`,
                    confirmButtonColor: 'rgb(38, 57, 115)'
                }).then((result) => {
                    if (result.isConfirmed) {
                        reset();
                    }
                })
            }
            document.getElementById("lives").innerHTML = lives;

        }

        x += dx;
        y += dy;

        theEnd();
        if (won) {
            play = false;
        }
    }
}

function initPaddle() {
    paddlex = (width / 2) - 33;
    paddleh = 10;
    paddlew = 85;
}

function onKeyDown(evt) {
    if (evt.keyCode == 39)
        rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;
}

function onKeyUp(evt) {
    if (evt.keyCode == 39)
        rightDown = false;
    else if (evt.keyCode == 37) leftDown = false;
}

function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(0, 0, 13)";
    ctx.arc(x, y, radZoge, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}
var bonusPointsAllowance = 0;
var paddleAllowance = 0;
var bonusLivesAllowance = 0;
var directionsAllowance = 0;
function drawBonusPointsBall() {
    if (allowBonusPoints) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 204, 0)";
        ctx.arc(x2, y2, radZoge, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    } else if (bonusPointsAllowance == 0) {
        bonusPointsAllowance = 1;
        ctx.beginPath();
        ctx.clearRect(x2 - radZoge - 1, y2 - radZoge - 1, radZoge * 2 + 2, radZoge * 2 + 2);
        ctx.closePath();
    }
}
function drawPaddleBall() {
    if (allowBigPaddle) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(0, 230, 0)";
        ctx.arc(x3, y3, radZoge, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    } else if (paddleAllowance == 0) {
        paddleAllowance = 1;
        ctx.beginPath();
        ctx.clearRect(x2 - radZoge - 1, y2 - radZoge - 1, radZoge * 2 + 2, radZoge * 2 + 2);
        ctx.closePath();
    }
}
function drawBonusLifeBall() {
    if (allowBonusLives) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 204, 0)";
        ctx.arc(x4, y4, radZoge, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    } else if (bonusLivesAllowance == 0) {
        bonusLivesAllowance = 1;
        ctx.beginPath();
        ctx.clearRect(x4 - radZoge - 1, y4 - radZoge - 1, radZoge * 2 + 2, radZoge * 2 + 2);
        ctx.closePath();
    }
}
function drawDirectBall() {
    if (allowDirectWays) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 26, 26)";
        ctx.arc(x5, y5, radZoge, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    } else if (directionsAllowance == 0) {
        directionsAllowance = 1;
        ctx.beginPath();
        ctx.clearRect(x5 - radZoge - 1, y5 - radZoge - 1, radZoge * 2 + 2, radZoge * 2 + 2);
        ctx.closePath();
    }
}

function drawPaddlet() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(0, 0, 13)";
    ctx.rect(paddlex, height - paddleh - 20, paddlew, paddleh);
    ctx.closePath();
    ctx.fill();
}

function drawBricks() {

    for (i = 0; i < bricks.length; i++) {
        for (j = 0; j < bricks[i].length; j++) {
            if (bricks[i][j] == 1) {
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.beginPath();
                ctx.rect(j * (BRICKWIDTH + PADDING) + PADDING, i * (BRICKHEIGHT + PADDING) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                ctx.closePath();
                ctx.fill();
            }
            if (bricks[i][j] == 2) {
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.beginPath();
                ctx.rect(j * (BRICKWIDTH + PADDING) + PADDING, i * (BRICKHEIGHT + PADDING) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                ctx.closePath();
                ctx.fill();
                x2 = (j * (BRICKWIDTH + PADDING) + PADDING) + 40;
                y2 = (i * (BRICKHEIGHT + PADDING) + PADDING);
            }
            if (bricks[i][j] == 3) {
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.beginPath();
                ctx.rect(j * (BRICKWIDTH + PADDING) + PADDING, i * (BRICKHEIGHT + PADDING) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                ctx.closePath();
                ctx.fill();
                x3 = (j * (BRICKWIDTH + PADDING) + PADDING) + 40;
                y3 = (i * (BRICKHEIGHT + PADDING) + PADDING);
            }
            if (bricks[i][j] == 4) {
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.beginPath();
                ctx.rect(j * (BRICKWIDTH + PADDING) + PADDING, i * (BRICKHEIGHT + PADDING) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                ctx.closePath();
                ctx.fill();
                x4 = (j * (BRICKWIDTH + PADDING) + PADDING) + 40;
                y4 = (i * (BRICKHEIGHT + PADDING) + PADDING);
            }
            if (bricks[i][j] == 5) {
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.beginPath();
                ctx.rect(j * (BRICKWIDTH + PADDING) + PADDING, i * (BRICKHEIGHT + PADDING) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                ctx.closePath();
                ctx.fill();
                x5 = (j * (BRICKWIDTH + PADDING) + PADDING) + 40;
                y5 = (i * (BRICKHEIGHT + PADDING) + PADDING);
            }
            if (bricks[i][j] == 6) {
                ctx.fillStyle = "#f2ae07";
                ctx.beginPath();
                ctx.rect(j * (BRICKWIDTH + PADDING) + PADDING, i * (BRICKHEIGHT + PADDING) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                ctx.closePath();
                ctx.fill();
            }
            if (bricks[i][j] == 7) {
                ctx.fillStyle = "#ff0000";
                ctx.beginPath();
                ctx.rect(j * (BRICKWIDTH + PADDING) + PADDING, i * (BRICKHEIGHT + PADDING) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                ctx.closePath();
                ctx.fill();
            }

            var rowheight = BRICKHEIGHT + PADDING + 4;
            var colwidth = BRICKWIDTH + PADDING;
            var row = Math.floor(y / rowheight);
            var col = Math.floor(x / colwidth);


            if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
                dy = -dy; bricks[row][col] = 0;
                points = points + 10;
                if (points < 100)
                    document.getElementById("points").innerHTML = "0" + points;
                else
                    document.getElementById("points").innerHTML = points;
                winPoints++;
                if (winPoints > 23 && newLVL == 0) {
                    newLVL = 1;
                    document.getElementById("levels").innerHTML = 2;
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                    bigPaddle.style.display = "none";
                }
                if (winPoints > 29 && newLVL == 1) {
                    newLVL = 2;
                    document.getElementById("levels").innerHTML = 3;
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                    bigPaddle.style.display = "none";
                }
                if (winPoints > 35 && newLVL == 2) {
                    wrongDirrections.style.display = "none";
                    win();
                    bigPaddle.style.display = "none";
                }

            }
            if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 2) {
                dy = -dy; bricks[row][col] = 0;
                dropBonusPointsBall = true;
                winPoints++;
                points = points + 20;
                if (points < 100)
                    document.getElementById("points").innerHTML = "0" + points;
                else
                    document.getElementById("points").innerHTML = points;

                if (winPoints > 23 && newLVL == 0) {
                    newLVL = 1;
                    document.getElementById("levels").innerHTML = 2;
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                    bigPaddle.style.display = "none";
                }
                if (winPoints > 29 && newLVL == 1) {
                    newLVL = 2;
                    document.getElementById("levels").innerHTML = 3;
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                    bigPaddle.style.display = "none";
                }
                if (winPoints > 35 && newLVL == 2) {
                    wrongDirrections.style.display = "none";
                    win();
                    bigPaddle.style.display = "none";
                }

            }
            if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 3) {
                dy = -dy; bricks[row][col] = 0;
                dropPaddleBall = true;
                winPoints++;
                points = points + 20;
                if (points < 100)
                    document.getElementById("points").innerHTML = "0" + points;
                else
                    document.getElementById("points").innerHTML = points;
                if (winPoints > 23 && newLVL == 0) {
                    newLVL = 1;
                    document.getElementById("levels").innerHTML = 2;
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                }
                if (winPoints > 29 && newLVL == 1) {
                    newLVL = 2;
                    document.getElementById("levels").innerHTML = 3;
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                }
                if (winPoints > 35 && newLVL == 2) {
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    win();
                }
            }
            if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 4) {
                dy = -dy; bricks[row][col] = 0;
                dropBonusLivesBall = true;
                winPoints++;
                points = points + 20;
                if (points < 100)
                    document.getElementById("points").innerHTML = "0" + points;
                else
                    document.getElementById("points").innerHTML = points;
                if (winPoints > 23 && newLVL == 0) {
                    newLVL = 1;
                    document.getElementById("levels").innerHTML = 2;
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                }
                if (winPoints > 29 && newLVL == 1) {
                    newLVL = 2;
                    document.getElementById("levels").innerHTML = 3;
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                }
                if (winPoints > 35 && newLVL == 2) {
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    win();
                }
            }
            if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 5) {
                dy = -dy; bricks[row][col] = 0;
                dropDirectBall = true;
                winPoints++;
                points = points + 20;
                if (points < 100)
                    document.getElementById("points").innerHTML = "0" + points;
                else
                    document.getElementById("points").innerHTML = points;
                if (winPoints > 23 && newLVL == 0) {
                    newLVL = 1;
                    document.getElementById("levels").innerHTML = 2;
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                }
                if (winPoints > 29 && newLVL == 1) {
                    newLVL = 2;
                    document.getElementById("levels").innerHTML = 3;
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                }
                if (winPoints > 35 && newLVL == 2) {
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    win();
                }
            }
            if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 6) {
                dy = -dy;
                y += dy;
                points = points + 10;
                if (points < 100)
                    document.getElementById("points").innerHTML = "0" + points;
                else
                    document.getElementById("points").innerHTML = points;
                winPoints++;
                bricks[row][col] = 1;
                if (winPoints > 23 && newLVL == 0) {
                    newLVL = 1;
                    document.getElementById("levels").innerHTML = 2;
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();

                }
                if (winPoints > 29 && newLVL == 1) {
                    newLVL = 2;
                    document.getElementById("levels").innerHTML = 3;
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                }
                if (winPoints > 35 && newLVL == 2) {
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    win();
                }

            }
            if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 7) {
                dy = -dy;
                y += dy;
                points = points + 10;
                if (points < 100)
                    document.getElementById("points").innerHTML = "0" + points;
                else
                    document.getElementById("points").innerHTML = points;
                winPoints++;
                bricks[row][col] = 6;
                if (winPoints > 23 && newLVL == 0) {
                    newLVL = 1;
                    document.getElementById("levels").innerHTML = 2;
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                }
                if (winPoints > 29 && newLVL == 1) {
                    newLVL = 2;
                    document.getElementById("levels").innerHTML = 3;
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    audio7.play();
                    newLevel();
                }
                if (winPoints > 35 && newLVL == 2) {
                    bigPaddle.style.display = "none";
                    wrongDirrections.style.display = "none";
                    win();
                }

            }




            if (x + dx > width - 5 || x + dx < 5)
                dx = -dx;
            if (y + dy < 5)
                dy = -dy;
            else if (y + dy > BRICKHEIGHT - (5)) {


                if (y + dy > BRICKHEIGHT - 5) {
                    clearInterval(draw);

                }

            }
        }
    }
}

function initbricks() {
    var randomBrick;
    var countBalls = 0;
    var countBalls1 = 0;
    var countBalls2 = 0;
    var countBalls3 = 0;
    for (var c = 0; c < bricks.length; c++) {
        bricks[c] = new Array(6);
        for (var r = 0; r < bricks[c].length; r++) {
            randomBrick = Math.floor((Math.random() * 10 + 2));
            if (newLVL == 2 && c == 3) {
                bricks[c][r] = 7;
            } else if (newLVL == 1 && c == 3) {
                bricks[c][r] = 6;
            } else if (randomBrick == 3 && countBalls == 0 && c != 3) {
                bricks[c][r] = 2;
                countBalls = 1;
            } else if (randomBrick == 5 && countBalls1 == 0 && c != 3) {
                bricks[c][r] = 3;
                countBalls1 = 1;
            } else if (randomBrick == 7 && countBalls2 == 0 && c != 3) {
                bricks[c][r] = 4;
                countBalls2 = 1;
            } else if (randomBrick == 9 && countBalls3 == 0 && c != 3) {
                bricks[c][r] = 5;
                countBalls3 = 1;
            } else
                bricks[c][r] = 1;
        }
    }
}

function theEnd() {
    if (lives == 0) {
        audio3.play();
        audio4.pause();
        play = false;
        clearInterval(intTimer);
    }
}

var count1 = document.getElementById("count");



function zacetni1() {

    countOut.style.display = "block";
    intTimer1 = setInterval(timer2, 650);
}

function sklic() {
    init();
    sweetStart();
}
function zacetek() {
    if (start) {
        clearInterval(intTimer1);
        count1.style.display = "none";
        play = true;
        if (play)
            intTimer = setInterval(timer, 1000);
        drawTimer = setInterval(draw, 9);
    }
}
function win() {
    won = true;
    clearInterval(intTimer);
    audio4.pause();
    audio5.play();
    Swal.fire({
        icon: 'success',
        title: 'WINNER',
        text: 'You have won the game!!\n You played for ' + minuteI + ' : ' + sekundeI + ' seconds and you recived ' + points + ' points',
        backdrop: `rgb(0, 255, 0,0.7)`,
        confirmButtonText: `Back to the Start`,
        confirmButtonColor: 'rgb(38, 57, 115)',
        showDenyButton: true,
        denyButtonText: `Play Again`,
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        } else if (result.isDenied) {
            reset();
        }
    })
}
function instructions() {
    modal.style.display = "none";
    okno2.style.display = "block";
}

function reset() {
    x = 317;
    y = 560;
    dx = 3;
    dxP = 3;
    dxN = -3;
    dy = -5;
    dyP = 5;
    dyN = -5;
    width = 625;
    height = 600;
    ctx;
    canvas;
    radZoge = 10;
    paddlex;
    paddleh;
    paddlew;
    paddleSP = 5;
    paddleSN = -5;
    rightDown = false;
    leftDown = false;
    NROWS = 4;
    NCOLS = 5;
    bricks = new Array(NROWS);
    BRICKWIDTH = (width / NCOLS) - 45;
    BRICKHEIGHT = 15;
    PADDING = 20;
    sekunde = 0;
    sekundeI;
    minuteI;
    intTimer;
    drawTimer;
    izpisTimer = "00:00";
    lives = 3;
    play = false;
    points = 000;
    sekunde1 = 0;
    sekundeI1;
    minuteI1;
    izpisTimer1 = 00;
    start = false;
    intTimer1;
    nakljucna = 0;
    nakljucna1 = 0;
    zmaga = false;
    winPoints = 0;
    dropBonusPointsBall = false;
    dropBonusLivesBall = false;
    dropPaddleBall = false;
    dropDirectBall = false;
    x2;
    y2;
    x3;
    y3;
    x4;
    y4;
    x5;
    y5;
    dyD = 3;
    allowBonusLivesTrue = 0;
    allowBonusPointsTrue = 0;
    allowPaddle = 0;
    allowDirect = 0;
    checkTimePaddle = 0;
    checkTimeDirect = 0;
    checkTimeLives = 0;
    won = false;
    allowBonusLives = true;
    allowBonusPoints = true;
    allowBigPaddle = true;
    allowDirectWays = true;
    directWaysGo = false;
    paddleON = false;
    LivesOn = false;
    directionsON = false;
    newLVL = 0;
    document.getElementById("lives").innerHTML = 3;
    document.getElementById("points").innerHTML = "000";
    document.getElementById("levels").innerHTML = "1";
    document.getElementById("timercic").innerHTML = izpisTimer;
    clearInterval(intTimer);
    clearInterval(intTimer1);
    clearInterval(drawTimer);

    init();
    zacetni1();
}

function newLevel() {
    x = 317;
    y = 560;
    dx = 3;
    dxP = 3;
    dxN = -3;
    dy = -5;
    dyP = 5;
    dyN = -5;
    play = false;
    start = false;
    intTimer1;
    nakljucna = 0;
    nakljucna1 = 0;
    zmaga = false;
    winPoints = 0;
    dropBonusPointsBall = false;
    dropBonusLivesBall = false;
    dropPaddleBall = false;
    dropDirectBall = false;
    allowBonusLivesTrue = 0;
    allowBonusPointsTrue = 0;
    allowPaddle = 0;
    allowDirect = 0;
    checkTimePaddle = 0;
    checkTimeDirect = 0;
    checkTimeLives = 0;
    won = false;
    allowBonusLives = true;
    allowBonusPoints = true;
    allowBigPaddle = true;
    allowDirectWays = true;
    directWaysGo = false;
    paddleON = false;
    LivesOn = false;
    directionsON = false;
    init();
    play = true;
    clearInterval(drawTimer);
    drawTimer = setInterval(draw,9);
}

function sweetStart(){
    Swal.fire({
        title: 'WELCOME',
        text: 'This is the game of bricks. Your goal is to destroy all of the bricks to win the level. There are 3 levels. As levels rise the first line of bricks will be stronger. Next Level will start as soon as you hit the last brick of last level. Hope you enjoy it.',
        backdrop: `rgb(255, 153, 0, 0.4)`,
        confirmButtonText: `Next`,
        confirmButtonColor: 'rgb(0,0,0)',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Instructions!',
                text: 'To control your paddle you can move him by pressing left or right arrow',
                backdrop: `rgb(255, 26, 26, 0.2)`,
                confirmButtonText: `Next`,
                confirmButtonColor: 'rgb(0,0,0)',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Instructions!',
                        text: 'In every level there can be 4 different bricks. If you hit them they will drop different colored balls. yellow balls will give you more points and life on the other hand red and green will give you bigger paddle or reverse controls. Carefull with that :) Lets jump into the game.',
                        backdrop: `rgb(255, 26, 26, 0.2)`,
                        confirmButtonText: `Start Game`,
                        confirmButtonColor: 'rgb(0,0,0)',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            zacetni1();
                        } 
                    })
                } 
            })
        } 
    })
}