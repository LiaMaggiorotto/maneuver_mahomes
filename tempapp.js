const canvas = document.getElementById("play-canvas");
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

let score;
let mahomes;
let gravity;
let obstacles;
let gameSpeed; 
let keys = {};


// Event Listeners
document.addEventListener('keydown', function(event) {
        keys[event.code] = true;
});
document.addEventListener('keyup', function(event) {
    keys[event.code] = false;
});


class Player {
    constructor(x, y, w, h, c){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = c;
        
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
            
            this.draw();
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

        draw () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    
    const startGame = function () {
        ctx.font = "20px  sans-serif";
        
        gameSpeed = 3;
        gravity = 1;
        score = 0;
        // create player using above class:
        mahomes = new Player(80, 250, 50, 150, "#ca2430");
        console.log(mahomes);
        
        //use clear function to clear canvas every frame. 
        requestAnimationFrame(clear)
    }


    const clear = function () {
        requestAnimationFrame(clear);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
        mahomes.animation();
    }

    startGame();





// event listeners:

//How to Play button
const $buttonEl = $('#how-to-play');

$buttonEl.click(function () {
    console.log("clickity"); // tests function
    alert("Press any button to start the game. Use the spacebar to jump and the down arrow to help Mahomes dodge under these KC landmarks. The longer you run, the higher your score!");
});
