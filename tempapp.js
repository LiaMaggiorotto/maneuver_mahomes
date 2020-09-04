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
let obImgArray = [shuttlecock, westernAuto];


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
        this.originalWidth = w;
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
            this.height= this.originalHeight / 1.5;
            this.width = this.originalWidth / 1.5;
        } else {
            this.height = this.originalHeight;
            this.width = this.originalWidth;
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
    constructor (img, x, y, w, h) {
        this.image = img;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        
        // velocity on the x axis
        this.dx = -gameSpeed;
    }
     
    update () {
        this.x += this.dx
        this.drawImage();
        this.dx = -gameSpeed;

    }
    drawImage () {
        ctx.beginPath();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
    let size = randomRange(50, 100);
    let type = randomRange(0, 1); // 0 is on the ground and 1 is floating
    let img =  obImgArray[Math.floor(Math.random() * obImgArray.length)];
    let obstacle = new Obstacles(img, canvas.width + size, canvas.height - size, size, size); 
    // canvas.width + size allows image to be drawn just off side of the canvas prior to entering it. canvas.height - size ensures we are reducing the height of the obstacles so it isn't pushed past the edge (y axis starts at the top of the image)

    if (type == 1) {
        obstacle.y -= mahomes.originalHeight - 10; // setting the height to be just shorter than mahomes height so that they will collide. 
    }
    obstacles.push(obstacle)
}



const winGame = function () {
    location.replace("winGame.html");
}



//setting variables, creating mahomes image, and calling on the "clear" function to reset canvas between frames.
const startGame = function () {
    ctx.font = "20px  sans-serif";
    
    gameSpeed = 3;
    gravity = 1;
    score = 0;


    // create players using above class:
    mahomes = new Player(runningMahomes, 80, 250, 225, 225);
    jumpMahomes = new Player(jumpingMahomes, 80, 250, 225, 225);
    duckMahomes = new Player(duckingMahomes, 80, 250, 186, 150);

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

    //collision dection - based on locatedion of x and y axis
    if (mahomes.x < ob.x + ob.width &&
        mahomes.x + mahomes.width > ob.x &&
        mahomes.y < ob.y + ob.height &&
        mahomes.y + mahomes.height > ob.y) {
            resetGame();

                // window.localStorage.setItem('highscore', highscore);
        }

    ob.update();
}

mahomes.animation();

// increase score and create score text:
score ++;
scoreText.text = "Score: " + score;
scoreText.draw();

if (score >= 2000){
    winGame();
}

if (score > highscore) {
    highscore = score;
    highScoreText.text = "Highscore: " + highscore; 
    highScoreText.color = "#ca2430";
    highScoreText.size = 17;
} else {
    highScoreText.color = "#000000";
    highScoreText.size = 13;
}

highScoreText.draw();

// increase gamespeed:
gameSpeed += 0.003;
}

const resetGame = function () {
    obstacles = [];
    score = 0;
    spawnTimer = initialSpawnTimer
    gameSpeed = 3;
    window.localStorage.setItem('highscore', highscore);
}


startGame();


//External features

//How to Play button
const $buttonEl = $('#howToPlay');

$buttonEl.click(function () {
    console.log("clickity"); // tests function
    alert("Use the up arrow and down arrow to help Mahomes dodge these KC landmarks. The longer you run, the higher your score!");
});


