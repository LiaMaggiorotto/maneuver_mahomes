const canvas = document.getElementById("play-canvas");
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

let runningMahomes = document.getElementById("runningMahomes");
let jumpingMahomes = document.getElementById("jumpingMahomes");
let duckingMahomes = document.getElementById("duckingMahomes");
let shuttlecock = document.getElementById("shuttleCock");
let westernAuto = document.getElementById("westernAuto");
let score;
let highscore = 0;
let mahomes;
let gravity;
let obstacles = [];
let gameSpeed; 
let keys = {};
let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer
let scoreText;
let highScoreText;


// Event Listeners
document.addEventListener('keydown', function(event) {
    keys[event.code] = true;
});
document.addEventListener('keyup', function(event) {
    keys[event.code] = false;
});




class Player {
    constructor(img, x, y, w, h){
        this.image = img;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        
        // jump velocity
        this.dy = 0;
        this.jumpTimer = 0;
        this.originalHeight = h;
        this.grounded = false;
        this.jumpForce = 10;
    }
    
    // animation methods:
    animation () {
        // jump
        if (keys['ArrowUp']) { 
            this.jump();
        } else {
            this.jumpTimer = 0; 
        }
        
        if (keys['ArrowDown']) {
            this.height= this.originalHeight / 2;
        } else {
            this.height = this.originalHeight
        }
        
        this.y += this.dy; // HAS TO BE ABOVE THE GRAVITY
        
        // creating gravity:
        if(this.y + this.height < canvas.height) {
            this.dy += gravity;
        } else {
            this.dy = 0; // no velocity
            this.grounded = true;
            this.y = (canvas.height - this.height);
        }
        
        this.drawImage();
    }
    
    //jump/jump velocity
    jump () {
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 10) {
            this.jumpTimer++;
            this.dy = -this.jumpForce - (this.jumpTimer/50);
        }
    }
    
    // create images of mahomes
    drawImage () {
        ctx.beginPath();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.stroke();
    }


}





// creating a class for obstacles
class Obstacles {
    constructor (x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = c;
        
        // velocity on the x axis
        this.dx = -gameSpeed;
    }
     
    update () {
        this.x += this.dx
        this.draw();
        this.dx = -gameSpeed;
    }
    draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}


// creating a class for on canvas text
class Text {
    constructor(t, x, y, a, c, s) {
        this.text = t;
        this.x = x;
        this.y = y;
        this.align = a;
        this.color = c;
        this.size = s;
    }

    draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = this.size + "px sans-serif";
        ctx.textAlign = this.align;
        ctx.fillText(this.text, this.x, this.y);
        ctx.stroke();
    }
}






// GAME FUNCTIONS: 

const randomRange = function(min, max) {
    return Math.round(Math.random() * (max-min) + min);
}


const createObstacles = function () {
    let size = randomRange(25, 80);
    let type = randomRange(0, 1) // 0 is on the ground and 1 is floating 
    let obstacle = new Obstacles(canvas.width + size, canvas.height - size, size, size, "#FFB612"); // canvas.width + size allows image to be drawn just off side of the canvas prior to entering it. canvas.height - size ensures we are reducing the height of the obstacles so it isn't pushed past the edge (y axis starts at the top of the image)

    if (type == 1) {
        obstacle.y -= mahomes.originalHeight - 10; // setting the height to be just shorter than mahomes height so that they will collide. 
    }
    obstacles.push(obstacle)
    }





//setting variables, creating mahomes image, and calling on the "clear" function to reset canvas between frames.
const startGame = function () {
    ctx.font = "20px  sans-serif";
    
    gameSpeed = 3;
    gravity = 1;
    score = 0;
    
    //pulling highscore from previous plays even upon refresh!!!! I'm dead and this is amazing. 
    if (localStorage.getItem('highscore')) {
        highscore = localStorage.getItem('highscore');
    }

    // create player using above class:
    mahomes = new Player(runningMahomes, 80, 250, 150, 150);

    scoreText = new Text("Score: " + score, 25, 25, "left", "#000000", 17);
    highScoreText = new Text("Highscore: " + highscore, 25, 50, "left", "#00000", 13)
    
    //use clear function to clear canvas every frame. 
    requestAnimationFrame(clear)
}


const clear = function () {
    requestAnimationFrame(clear);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //reduce spawn times for increased speed
spawnTimer--;
if(spawnTimer<=0) {
    createObstacles();
    spawnTimer = initialSpawnTimer - gameSpeed * 8;

    if (spawnTimer < 60) { // set a base
    spawnTimer = 60;
    }
}

//Spawn
for (let i = 0; i < obstacles.length; i++) {
    let ob = obstacles[i];

    if(ob.x + ob.width < 0) {
    obstacles.splice(i, 1); // deleting blocks after they leave the canvas frame
    }

    if (mahomes.x < ob.x + ob.width &&
        mahomes.x + mahomes.width > ob.x &&
        mahomes.y < ob.y + ob.height &&
        mahomes.y + mahomes.height > ob.y) {
            obstacles = [];
            score = 0;
            spawnTimer = initialSpawnTimer
            gameSpeed = 3;
            window.localStorage.setItem('highscore', highscore);
        }

    ob.update();
}

mahomes.animation();

// increase score and create score text:
score ++;
scoreText.text = "Score: " + score;
scoreText.draw();

if (score > highscore) {
    highscore = score;
    highScoreText.text = "Highscore: " + highscore; 
    highScoreText.color = "#ca2430";
} else {
    highScoreText.color = "#000000";
}

// if (score >= 5000) {
// insert new html link to indicate MVP with button to play again? 
// }

highScoreText.draw();

// increase gamespeed:
gameSpeed += 0.003;
}

startGame();






//External features

//How to Play button
const $buttonEl = $('#how-to-play');

$buttonEl.click(function () {
    console.log("clickity"); // tests function
    alert("Use the up arrow and down arrow to help Mahomes dodge these KC landmarks. The longer you run, the higher your score!");
});