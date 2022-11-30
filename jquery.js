var playing=false;
var score;
var trialsleft;
var step;
var action;  //used for setInterval
const fruits=["8150","190698","211303","37957","131485","88669","308905","12995","172302"];
$(function(){

    //when click on start/ reset button
    $("#startreset").click(function(){

    //if we r playing
    if(playing==true){

        //reload page
        location.reload();
    }

    else{

        //not playing
        playing=true; //initiaalize the game

        score=0;
        $("#scorevalue").html(score);

        //show trials left
        $("#trialsleft").show();
        trialsleft=5;
        addHearts();

        //hide game over box
        $("#gameOver").hide();

        //change button text to "reset game"
        $("#startreset").html("Reset Game");

        //1.create a random fruit
        startAction();
    }
    });

//slice a fruit
$("#fruit1").mouseover(function(){
    score+=1;
    $("#scorevalue").html(score);    //updating the score
    
    //stop and hide fruit 
    clearInterval(action);
    // document.getElementById("slicesoud").play();
  
    $("#slicesound")[0].play();    //play soundd

    //hide fruits through animation
    $("#fruit1").hide("explode",400);    //slice the fruit, 2nd parameter duration in ms

    //send new fruit
    setTimeout(startAction,600);    
});    

    function addHearts(){
        $("#trialsleft").empty();

    for(i=0;i<trialsleft;i++){
        $("#trialsleft").append('<img src="images/trial.png" class="t">');
    }
    }


    function startAction(){

        //generate a random function
        $("#fruit1").show();
        chooseFruit();   //choose random fruit
        $("#fruit1").css({'left':Math.round(550*Math.random()),'top':-50});

    //generate a random step
        step=1 + Math.round(5*Math.random());    //change the step

        //move fruit down by 1 step every 10ms
        action=setInterval(function(){
            $("#fruit1").css('top',$("#fruit1").position().top+step);

            //check fruit is too low
            if($("#fruit1").position().top > $("#fruitContainer").height()){
                //check whether the trials are left
                if(trialsleft > 1){
                    //generate a random function
        $("#fruit1").show();
        chooseFruit();   //choose random fruit
        $("#fruit1").css({'left':Math.round(550*Math.random()),'top':-50});

    //generate a random step
        step=1 + Math.round(5*Math.random());    //change the step

        //reduce no. of trials
        trialsleft--;

        //populate trialsleft box
        addHearts();
                }
                else{
                    //game over
                    playing=false;

                    $("#startreset").html("Start Game");

                    $("#gameOver").show()
                    $("#gameOver").html("<p>GAME OVER!</p><p>YOUR SCORE IS "+score+"</p>");
                    $("#trialsleft").hide();
                        stopAction();
                }
            }
        },10);
}

    function chooseFruit(){
        $("#fruit1").attr('src','https://openclipart.org/image/100px/'+fruits[Math.round(8*Math.random())]);  //apple
        // grape https://openclipart.org/image/100px/8150    
        // banana https://openclipart.org/image/100px/211303
        // cherry https://openclipart.org/image/100px/37957
        // mango https://openclipart.org/image/100px/131485
        // orange https://openclipart.org/image/100px/88669
        // pach https://openclipart.org/image/100px/308905
        // pineapple https://openclipart.org/image/100px/12995
        // watermelon https://openclipart.org/image/100px/172302
    }
//stop dropping fruit
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});