console.log("It's Britney B*tch");

// create const $() variables:

// variable that selects the canvas tag
const canvas = document.getElementById("play-canvas");
// console.log(canvas); // checked 

// because the game will be in 2D, this allows us to acces the tools of the 2D tool box (paintbrushes and shapes)
const ctx = canvas.getContext('2d');

//create let variables :

// formatting canvas within js so I can call it later
canvas.width = 800;
canvas.height = 500;


// setting images as variables so they can be used in my draw methods
const runningMahomes = document.getElementById("runningMahomes");
let jumpingMahomes = document.getElementById("jumpingMahomes");
let duckingMahomes = document.getElementById("duckingMahomes");
let shuttlecock = document.getElementById("shuttleCock");
let westernAuto = document.getElementById("westernAuto");
let score;
let player;
let gravity;
let obstacles;
let gameSpeen; 
let keys = [];


//create player class
// temp: create blocks:

//Player:

// ctx.fillStyle = "#ca2430";
// ctx.fillRect(80, 250, 50, 150);

//Obstacles:

//shuttlecock
ctx.fillStyle ="#FFB612";
ctx.fillRect(400, 350, 50, 50);

//sign
ctx.fillStyle ="#000000";
ctx.fillRect(700, 225, 50, 50);

// DONE: How To Play button pop up:

const $buttonEl = $('#how-to-play');
$buttonEl.click(function () {
console.log("clickity"); // tests function
alert("Press any button to start the game. Use the up arrow to jump and the down arrow to help Mahomes dodge under these KC landmarks. The longer you run, the higher your score!");
});

// To  make them animated, you have to be able to "draw" repeatedly and clear the canvas within each drawing. Need a class to ensure smooth transitions?

// runImg, duckImg, jumpImg,, width, height, x/y location? jumpTimer? grounded? set direction or velocity?

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
            }
            
           // method to help find the right side - x-axis location of player
            getRight () {
                    console.log(this.x + this.width);
            }

            //create draw method - where squares are populated
            Draw () {
                // begin path ensures last drawing ends before new begins.
                ctx.beginPath();
                ctx.fillStyle = this.c;
                ctx.fillRect(this.x, this.y, this.w, this.h);
                ctx.stroke();
                console.log("drawing")
            }
        }

        
        
        
        
        
        
        // add horizon to canvas id - can do this in CSS by adding background-imge to canvas, setting background repeat to repeat on the x-axis, setting size to cover, and setting animation. Look at keyframes para.
        
        // set keys as event listeners : 
        
        // window.addEventListener("keydown", mahomesDuck, false);
        // window.addEventListener("keyup", mahomesJump, false);
        
        // key input logic
        // let keyUp = false; // case 38
        // let keyDown = false; // case 40
        
        
        
        
        
        
        //.keydown => duckImg / reduced height
        
        //.keyup => jumpImg / jumps + use gravity to pull back down
        
        
        // Any key starts the game
        
        // Game start function: includes speed, gravity?, score
        
        const startGame = function () {
            ctx.font = "20px  sans-serif";
            
            gameSpeed = 3;
            gravity = 1;
            score = 0;
            // create player using above class:
            const mahomes = new Player(80, 250, 50, 150, "#ca2430");
            
            requestAnimationFrame(clear)
        }

        const clear = function () {
            requestAnimationFrame(clear);
            //clear canvas to remove previously drawn Mahomes every frame
                ctx.clearRect(0, 0, canvas.innerWidth, canvas.innerHeight);

                // mahomes.Draw();
                // player.x++;
                
        }

        startGame();
        
            // const animateMahomes = function () {
            //     requestAnimationFrame(animateMahomes);
                
            //     // clear canvas to remove previously drawn Mahomes
            //     ctx.clearRect(0, 0, canvas.innerWidth, canvas.innerHeight);
            //     ctx.beginPath();
            //     ctx.fillStyle = "#ca2430";
            //     ctx.fillRect(80, 350, 50, 100);
                
            //     dy += 
        
        
        
        // set timer = to score (but reformat to display 10 sec = 100points?)
        
        
        //create duck function  - .keydown event listener
        
        // create obstacles array. 
        
        // create a function that causes obstacles to spawn. 
        // may be able to include math function to increase the rate at which these spawn 
        // OR game speed increase set to timer intervals

        // detect hitting obstacles
        
        // Game over function: ensure this includes the alert and game is refreshed upon closing the alert
        
        











        
        // //creating squares in canvas practice:
        // function init () {
        // ctx.beginPath()
        // ctx.strokeRect(50, 35, 50, 50)
        // ctx.beginPath()
        // ctx.fillRect(125, 35, 50, 50)
        
        // ctx.beginPath()
        // ctx.strokeStyle = 'red'
        // ctx.fillStyle = 'blue'
        // ctx.lineWidth = 5
        // ctx.rect(200, 35, 50, 50)
        // ctx.fill()
        // ctx.stroke()
        // }
        
        // init ()