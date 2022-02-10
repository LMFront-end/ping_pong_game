// inicio de la funcion auto ejecutable

const game = function() {

    // Se declaran las variables del juego

    let time = 30; // cambiar la velocidad de la pelota ⚾
    let movement = 20;
    let movementBar = 20;
    let width = document.documentElement.clientWidth - movement; // medidas del ancho de la pantalla
    let height = document.documentElement.clientHeight - movement; // medidas de la longitud de la pantalla
    let controlGame;
    let player1;
    let player2;

    // empezar el juego

    function start() {
        // iniciar el juego
        init();
        // control del juego (se pasan como parametro el inicio, y la velocidad de la bola)
        controlGame = setInterval(play, time);
    }

    function init() {

        ball.style.left = 0;
        ball.state = 1;
        ball.direction = 1; // right 1, left 2
        player1 = new Object();
        player2 = new Object();
        player1.keyPress = false;
        player1.keyCode = null;
        player2.keyPress = false;
        player2.keyCode = null;
    }

    function stop() {
        clearInterval(controlGame);
        //document.body.style.background = url("../assets/gameOver.png");
        swal("Game over", "F5 to play again", "error");
    }

    function play() {
        moveBall(); // mover pelota
        moveBar(); // mover bola
        checkIfLost(); // mensaje por consola, ganador (sin puntuación)
    }

    function checkIfLost() {
        if (ball.offsetLeft >= width) {
            stop();
            console.log("punto player 1");
        }
        if (ball.offsetLeft <= 0) {
            stop();
            console.log("punto player 2");
        }
    }

    function moveBall() {
        checkStateBall();
        switch (ball.state) {
            case 1: // derecha, abajo
                ball.style.left = (ball.offsetLeft + movement) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;
            case 2: // derecha, arriba
                ball.style.left = (ball.offsetLeft + movement) + "px";
                ball.style.top = (ball.offsetTop - movement) + "px";
                break;
            case 3: // izquierda, abajo
                ball.style.left = (ball.offsetLeft - movement) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;
            case 4: // izquierda, arriba
                ball.style.left = (ball.offsetLeft - movement) + "px";
                ball.style.top = (ball.offsetTop - movement) + "px";
                break;
        }
    }

    function checkStateBall() {

        if (collidePlayer2()) {
            ball.direction = 2;
            if (ball.state == 1) ball.state = 3;
            if (ball.state == 2) ball.state = 4;
        } else if (collidePlayer1()) {
            ball.direction = 1;
            if (ball.state == 3) ball.state = 1;
            if (ball.state == 4) ball.state = 2;
        }

        if (ball.direction === 1) {
            if (ball.offsetTop >= height) ball.state = 2;
            else if (ball.offsetTop <= 0) ball.state = 1;
        } else {
            if (ball.offsetTop >= height) ball.state = 4;
            else if (ball.offsetTop <= 0) ball.state = 3;
        }
    }

    function collidePlayer1() {
        if (ball.offsetLeft <= (bar1.clientWidth) &&
            ball.offsetTop >= bar1.offsetTop &&
            ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)) {
            return true;
        }

        return false;
    }

    function collidePlayer2() {
        if (ball.offsetLeft >= (width - bar2.clientWidth) &&
            ball.offsetTop >= bar2.offsetTop &&
            ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight)) {
            return true;
        }
        return false;

    }

    function moveBar() {
        if (player1.keyPress) {
            if (player1.keyCode == 87 && bar1.offsetTop >= 0)
                bar1.style.top = (bar1.offsetTop - movementBar) + "px";
            if (player1.keyCode == 83 && (bar1.offsetTop + bar1.clientHeight) <= height)
                bar1.style.top = (bar1.offsetTop + movementBar) + "px";

        }
        if (player2.keyPress) {
            if (player2.keyCode == 38 && bar2.offsetTop >= 0)
                bar2.style.top = (bar2.offsetTop - movementBar) + "px";
            if (player2.keyCode == 40 && (bar2.offsetTop + bar2.clientHeight) <= height)
                bar2.style.top = (bar2.offsetTop + movementBar) + "px";
        }
    }

    document.onkeydown = function(e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 87: // w
            case 83: // s
                player1.keyCode = e.keyCode;
                player1.keyPress = true;
                break;
            case 38: // flecha Arriba
            case 40: // flecha Abajo
                player2.keyCode = e.keyCode;
                player2.keyPress = true;
                break;
        }
    }

    document.onkeyup = function(e) {
        if (e.keyCode == 87 || e.keyCode == 83)
            player1.keyPress = false;
        if (e.keyCode == 38 || e.keyCode == 40)
            player2.keyPress = false;
    }

    start();
}();