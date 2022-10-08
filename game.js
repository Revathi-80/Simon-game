
var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


var started=false;
var level=0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").click(function () {
   var useChosenColour =$(this).attr("id");
   userClickedPattern.push(useChosenColour);
   
   playSound(useChosenColour);
   animatePress(useChosenColour);

   checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

function nextSequence() {
    userClickedPattern =[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4 );
    var randomChossenColor= buttonColor[randomNumber];
    gamePattern.push(randomChossenColor);

    $("#"+randomChossenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChossenColor);
    
}



function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
       $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(event) {
    var audio =new Audio("./sounds/"+event+".mp3");
    audio.play();
}
