let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let bird = new Image();
bird.src = "images/bird.png";

let bg = new Image();
bg.src = "images/bg.png";

let chao = new Image();
chao.src = "images/chao.png";

let canocima = new Image();
canocima.src = "images/canocima.png";

let canobaixo = new Image();
canobaixo.src = "images/canobaixo.png";

//distancia dos canos
let eec = 100;
let constant;
let bX = 33;
let bY = 200;
let gravit = 1.4;
let scor = 0;
let cano = [];

cano[0] =
{
    x: canvas.width,
    y: 0,
}

let fly = new Audio();
fly.src = "sounds/fly.mp3";

let score = new Audio();
score.src = "sounds/score.mp3";

document.addEventListener("keydown", voa);
function voa() {
    bY -= 26;
    fly.play();
}


function jogo() {

    ctx.drawImage(bg, 0, 0)
    bY += gravit;

    for (let i = 0; i < cano.length; i++) {
        constant = canocima.height + eec;
        ctx.drawImage(canocima, cano[i].x, cano[i].y)
        ctx.drawImage(canobaixo, cano[i].x, cano[i].y + constant)
        //movimentaçao dos canos
        cano[i].x = cano[i].x - 1;
        if (cano[i].x == 125) {
            cano.push({
                x: canvas.width,
                y: Math.floor(Math.random() * canocima.height) - canocima.height
            })
        }
        //
        if (bX + bird.width >= cano[i].x &&
            bX <= cano[i].x + canocima.width &&
            (bY <= cano[i].y + canocima.height || bY + bird.height >= cano[i].y + constant) ||
            bY + bird.height >= canvas.height - chao.height) {
            location.reload();
        }
        if (cano[i].x == 5) {
            scor += 1;
            score.play();
        }
    }
    ctx.drawImage(chao, 0, canvas.height - chao.height)
    ctx.drawImage(bird, bX, bY)

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Placar: " + scor, 10, canvas.height - 20)


    requestAnimationFrame(jogo)
}

jogo();

