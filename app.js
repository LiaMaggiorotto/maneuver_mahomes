console.log("It's Britney B*tch");

// create const $() variables:

// variable that selects the canvas tag
const canvas = document.getElementById("play-canvas");
// console.log(canvas); // checked 

// because the game will be in 2D, this allows us to acces the tools of the 2D tool box (paintbrushes and shapes)
const ctx = canvas.getContext('2d');

// //create let variables :
// // ex: score, gravity, game speed, ground game speed; images
let runningMahomes = getElementById("runningMahomes");
let jumpingMahomes = getElementById("jumpingMahomes");
let duckingMahomes = getElementById("duckingMahomes");
let shuttlecock = getElementById("shuttleCock");
let westernAuto = getElementById("westernAuto");


canvas.width = 800;
canvas.height = 500;




//create player class
// temp: create blocks:

//Player:

ctx.fillStyle = "#ca2430";
ctx.fillRect(80, 250, 50, 150);

//Obstacles:

//shuttlecock
ctx.fillStyle ="#FFB612";
ctx.fillRect(400, 350, 50, 50);

//sign
ctx.fillStyle ="#000000";
ctx.fillRect(700, 225, 50, 50);


// To  make them animated, you have to be able to "draw" repeatedly. create class with methods:

// runImg, duckImg, jumpImg,, width, height, x/y location? jumpTimer? grounded? set direction or velocity?

// class Player {
//         constructor(x, y, w, h){
//                 this.grounded = false;
//                 this.x = x;
//                 this.y = y;
//                 this.width = x;
//                 this.height = h;
//                 this.jumpTimer = 
//                 this.runningImg =
//                 this.dx =
//                 this.dy = 
//             }
            
            // method to help find the right side - x-axis location of player
            // get right () {
                //     return this.x + this.width;
                // }
                // // }
                
                
                //create jump function - .keyup event listener

const mahomesJump = function () {
    requestAnimationFrame(mahomesJump);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.beginPath();
    ctx.fillStyle = "#ca2430";
    ctx.fillRect(80, 350, 50, 100);


}
        
        // add horizon to canvas - can do this in CSS by adding background to canvas.
        
        // set keys as event listeners : 

        // window.addEventListener("keydown", mahomesDuck, false);
        // window.addEventListener("keyup", mahomesJump, false);

        // key input logic
        // let keyUp = false; // case 38
        // let keyDown = false; // case 40




        // DONE: How To Play button pop up:

    const $buttonEl = $('#how-to-play');
    $buttonEl.click(function () {
        console.log("clickity"); // tests function
        alert("Press any button to start the game. Use the up arrow to jump and the down arrow to help Mahomes dodge under these KC landmarks. The longer you run, the higher your score!");
    });

        
        //.keydown => duckImg / reduced height

        //.keyup => jumpImg / jumps + use gravity to pull back down


        // Any key starts the game
        
        // Game start function: includes speed, gravity?, score
        
        const startGame = function () {
            
        }
        
        // set timer = to score (but reformat to display 10 sec = 100points)
        
        
        //create duck function  - .keydown event listener
        
        // create obstacles array: ex: shuttlecock at 0, western auto at 1 or 2. 
        
        // create a function that causes obstacles to spawn. 
        // may be able to include math function to increase the rate at which these spawn 
        // OR game speed increase set to timer intervals

        // detect hitting obstacles
        
        // Game over function: ensure this includes the alert and game is refreshed upon closing the alert
        
        











        
        // //creating squares practice:
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