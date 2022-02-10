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

    start();
}();