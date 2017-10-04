/*use canvas html 5 (canvas tag creates a 2 dimensional grid)*/

/*create a simple snake game that allows user to press arrow keys and move the snake
snake moves around canvas eating food as it eats food the points increase and the size of the snake
the more food the snake eats the more points the user gets if snake leaves the canvas, game over*/

$(document).ready(function(){//once page loads trigger this function
  var canvas = $("#canvas")[0]; // variable holding canvas element
  var ctx = canvas.getContext("2d"); // making game 2d
  var w = canvas.width; //accessing height and width of the canvas
  var h = canvas.height;//accessing height and width of the canvas
  var cw = 15; // size of the snake and food
  var d = "right";//snake starts towards right
  var food;//declaring food variable
  var score;//declaring score variable
  var speed = 100; // speed of the snake

  //snake array
  var snake_array;//declaring the snake

  //initializer for the game
  function init(){
    d = "right";// direction snake is always starting travel
    create_snake();// calling create snake
    create_food();//calling food
    score = 0; // setting score at 0

    if(typeof game_loop != "undefined") clearInterval(game_loop);//if the variable game loop is not defined clear the existing
    game_loop = setInterval(paint, speed);//interval whos id is game loop, calling paint every 100 milliseconds-speed
  }

  init();//run initializer

  function create_snake(){ //create snake
    var length = 5; //size of the snake
    snake_array = [];//creating snake array
    for(var i = length - 1; i >= 0; i--){
      snake_array.push({x: i, y: 0});//loop for the snake pushing i and y
    }
  }

/* function for creating the snakes food at random places on the canvas*/
  function create_food(){
    food = {
      x:Math.round(Math.random()*(w-cw)/cw),
      y:Math.round(Math.random()*(h-cw)/cw)
    };
  }


  //paint snake function

  function paint(){
    ctx.fillStyle = "black";// painting canvas black
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = "white";//boorder of the canvas black
    ctx.strokeRect(0,0,w,h);

    var nx = snake_array[0].x;
    var ny = snake_array[0].y;

    if(d == "right") nx++;//if direction is right move right
    else if(d == "left") nx--;//if direction is left decrease one causing it to move left
    else if(d == "up") ny--;//if direction is up  decrease by one
    else if(d == "down") ny++;//if direction of snake

    //collide code
    if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array)){
      //final score
      $("#final_Score").html(score);
      //show overlay that says play again and high score
      $("#overlay").fadeIn(300);
      return;
    }
    /*if conditional for the snake getting larger as it eats the food
    it pops another tail peice to the array*/
    if(nx == food.x && ny == food.y){
      var tail = {x: nx,y: ny};
      score++;
      //create food
      create_food();
    } else{
      var tail = snake_array.pop();
      tail.x = nx; tail.y = ny;
    }

    snake_array.unshift(tail);
    
    /*loop for the snake to be able to get bigger as it eats the food*/
    
    for(var i = 0; i < snake_array.length;i++){
      var c = snake_array[i];
      paint_cell(c.x,c.y);
    }

    //paint cell
    paint_cell(food.x,food.y);

    //check score
    //check_score(score);

    $(".score").html("Your Score: " + score);
  }
  
/*canvas methods for coloring blocks on the canvas
this is the function that creates the snake */
  
  function paint_cell(x,y){
    ctx.fillStyle= "orange";
    ctx.fillRect(x*cw, y*cw,cw,cw);
    ctx.strokeStyle="white";
    ctx.strokeRect(x*cw, y*cw,cw,cw);
  }
  
  //check collision function

  function check_collision(x, y, array){
    for(i = 0; i < array.length; i++){
      if(array[i.x == x && array[i].y == y])

        return true;
    }
    return false;
  }

  //keyboard controller
  /*the controller is the arrow keys conditional for the direction the snake is going to move when 
  these keys are press*/

  $(document).keydown(function(e){
    var key = e.which;
    if(key == "37" && d !="right") d = "left";
    else if( key == "38" && d!="down") d = "up";
    else if( key == "39" && d!="left") d = "right";
    else if( key == "40" && d!="up") d = "down";
  });
});
