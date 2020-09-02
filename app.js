// console.log("It's Britney B*tch");
// console.log($);

// create const $() variables:

// variable that selects the canvas tag
const canvas = document.getElementById("play-canvas");
// console.log(canvas); // checked 

// because the game will be in 2D, this allows us to acces the tools of the 2D tool box (paintbrushes and shapes)
const ctx = canvas.getContext('2d');





//create player class
// runImg, duckImg, jumpImg,, width, height, x/y location? jumpTimer? grounded? set direction or velocity?

// class Player {
    //     constructor(){
        //         this.w = x;
        //         this.h = h;
        //         this.x = x;
        //         this.y = y;
        //         this.jumpTimer = 
        //         this.grounded = false;
        //         this.runningImg =
        //         this.velocity =
        //         this.score = 0;
        //         this.gravity = 
        //     }
        
        // method to help find the right side - x-axis location of player
        // get right () {
        //     return this.x + this.width;
        // }
        // // }
        
        
        //create let variables :
        // ex: score, gravity, game speed, ground game speed
        
        
        // add horizon to canvas
        
        // set keys as event listeners : 


        // How To Play button pop up:

    const $buttonEl = $('#how-to-play');
    $buttonEl.click(function () {
        alert("Press any button to start the game. Use the up arrow to jump and the down arrow to help Mahomes dodge under these KC landmarks. The longer you run, the higher your score!");
    });

        
        //.keydown => duckImg / reduced height
        //.keyup => jumpImg / jumps + use gravity to pull back down
        // Any key starts the game
        
        // Game start function: includes speed, gravity?, score
        
        const startGame = function () {
            
        }
        
        // set timer = to score (but reformat to display 10 sec = 100points)
        
        //create jump function - .keyup event listener
        
        //create duck function  - .keydown event listener
        
        // create obstacles array: ex: shuttlecock at 0, western auto at 1 or 2. 
        
        // create a function that causes obstacles to spawn. 
        // may be able to include math function to increase the rate at which these spawn 
        // OR game speed increase set to timer intervals
        
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