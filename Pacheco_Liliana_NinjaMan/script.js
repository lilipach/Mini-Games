var worldMap;

var worldDic = {
    0:"empty",
    1:"wall",
    2:"coin",
    3:"Ramen",
}

var ninjaCharacter = {
    x: 1,
    y: 1,
}

var ghost1 = {
    x:12,
    y: 1,
}

var ghost2 = {
    x:1,
    y:10,
}

var score = 0;
var lifes = 5;

var timer;
var interval = 1000;
var $input = $('#playerInput')

$input.on('keyup', function(){
    clearTimeout(timer);
    timer = setTimeout(buildGhosts(true), interval);
});

$input.on('keydown', function() {
    crearTimeout(timer);
});

function runGame(){
    selectMap();
    buildLifes(lifes);
    buildScore(score);
    buildWorld();
    characterControl();
}

function selectMap(){
    mapNum = Math.floor(Math.random() * 3) ;
    if(mapNum == 0){
        worldMap = [ 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1],
        [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1],
        [1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1],
        [1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 3, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
    }
    else if(mapNum == 1){
        worldMap = [ 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 1],
        [1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1],
        [1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1],
        [1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1],
        [1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1],
        [1, 3, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
    }
    else{
        worldMap = [ 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
        [1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1],
        [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
        [1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
        [1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1],
        [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
    }
}

function buildWorld(){
    var world = "";

    for(var i = 0; i < worldMap.length; i++){
        world = world + "<div class = 'row'> ";
        for(var j = 0; j < worldMap[i].length; j++){
            world = world + "<div class = '" + worldDic[worldMap[i][j]] + "'> </div>";
        }
        world = world + "</div>"
    }

    document.getElementById("world").innerHTML = world;
}

function buildScore(){
    var scoreString = " <div id = 'scoreTittle'>SCORE</div> <div id = 'scoreValue'>" + score + "</div>";
    document.getElementById("scoreContainer").innerHTML = scoreString;
}

function buildLifes(){
    //check if touched ghost
    if(collision()){
        lifes--;
        reset();
    }

    if(lifes == 0){
        gameOver();
    }

    var lifeString  = "";
    for(var i = 0; i < lifes; i ++){
        lifeString = lifeString + "<div class = 'life'></div>";
    }
    document.getElementById("health").innerHTML = lifeString;
}

function collision(){
    if((ninjaCharacter.x == ghost1.x && ninjaCharacter.y == ghost1.y) || (ninjaCharacter.x == ghost2.x && ninjaCharacter.y == ghost2.y))
        return true;
    else  
        return false;

}

function reset(){
    ninjaCharacter.x = 1;
    ninjaCharacter.y = 1;
    drawNinja("static/naruto/naruto_down2.png", 26, 40)

    ghost1.x = 12;
    ghost1.y = 1;
    ghost2.x = 1;
    ghost2.y = 10;
    buildGhosts(false)

    document.getElementById("gameOver").innerHTML = ""
    document.getElementById("gameOver").style.height = "0px";
    document.getElementById("gameOver").style.width = "0px";
}

function gameOver(){
    document.getElementById("gameOver").innerHTML = "Game Over"
    document.getElementById("gameOver").style.height = "100px";
    document.getElementById("gameOver").style.width = "560px";


    document.onkeydown = function(e){
        if(e.keyCode == 13){
            reset();
            lifes = 5;
            score = 0;
            runGame();
        }
    }
};

function buildGhosts(move){
    if(move == false){
        console.log("here");
        drawGhosts([12, 1], [1, 10])
        return;
    }

    //ghost 1 moves randomly
    var options = checkPossibleMoves(ghost1.x, ghost1.y);
    var randomMove =options[Math.floor(Math.random() * options.length)];

    //ghost 2 follows character
    options = checkPossibleMoves(ghost2.x, ghost2.y);
    options.push([ghost2.x, ghost2.y])
    var moveToPlayer = nearestMove(options);

    console.log("Ran: " + randomMove);
    console.log("sma: " + moveToPlayer);
    drawGhosts(randomMove, moveToPlayer);
}

function drawGhosts(randomMove, moveToPlayer){
    console.log(randomMove);
    console.log(moveToPlayer);
   ghost1.x = randomMove[0];
   ghost1.y = randomMove[1];
   ghost2.x = moveToPlayer[0];
   ghost2.y = moveToPlayer[1];

   document.getElementById("ghost1").style.left = ghost1.x * 40 + "px";
   document.getElementById("ghost1").style.top =  ghost1.y * 40 + 100 + "px";
   document.getElementById("ghost2").style.left = ghost2.x * 40 + "px";
   document.getElementById("ghost2").style.top =  ghost2.y * 40 + 100 + "px";
}

function checkPossibleMoves(x, y){
    var possibleMoves = [];
    if(worldMap[y + 1][x] != 1){ //down
        possibleMoves.push([x,y + 1]);
    }

    if(worldMap[y - 1][x] != 1){ //up
        possibleMoves.push([x,y - 1]);
    }

    if(worldMap[y][x + 1] != 1){ //right
        possibleMoves.push([x + 1,y]);
    }

    if(worldMap[y][x - 1] != 1){ //left
        possibleMoves.push([x - 1,y]);
    }
    return possibleMoves;
}

function nearestMove(moveList){
    var bestMove = moveList[0];
    for(var i = 0; i < moveList.length; i++){
        if(distance(moveList[i]) < distance(bestMove)){
            bestMove = moveList[i];
        }
    }

    return bestMove;
}

function distance(move){
    var xDif = ninjaCharacter.x - move[0];
    if(xDif < 0)
        xDif = xDif * -1;

    var yDif = ninjaCharacter.y - move[1];
    if(yDif < 0)
        yDif = yDif * -1;

    var distance = 0;
    if(xDif == 0 || yDif == 0){
        distance = xDif + yDif;
    }
    else{
        distance = xDif * yDif;
    }

    return distance;
}

function characterControl(){
    var dimensions = [[26, 42], [26, 40], [26, 42], 
                      [26, 40], [26, 40], [26, 40], 
                      [31, 41], [34, 42], [34, 41], 
                      [34, 43], [34, 42], [31, 41]];

    var direction = "down";
    var counter = 2;
    document.onkeydown = function(e){
        console.log(e);
        var directionNum = 0;
        var directionChange = true;

        if(e.keyCode == 37){//Left
            if(worldMap[ninjaCharacter.y][ninjaCharacter.x - 1] != 1)
                ninjaCharacter.x--;
            
            if(direction == "left")
                directionChange = false;
            
            direction = "left";
            directionNum = 3;
        }
        else if(e.keyCode == 39){//Right
            if(worldMap[ninjaCharacter.y][ninjaCharacter.x + 1] != 1)
                ninjaCharacter.x++;
            
            if(direction == "right")
                directionChange = false;
            
            direction = "right";
            directionNum = 2;
        }
        else if(e.keyCode == 40){//Down
            if(worldMap[ninjaCharacter.y + 1][ninjaCharacter.x] != 1)
                ninjaCharacter.y++;
            
            if(direction == "down")
                directionChange = false;
        
            direction = "down";    
            directionNum = 0;
        }
        else if(e.keyCode == 38 ){//Up
            if(worldMap[ninjaCharacter.y - 1][ninjaCharacter.x] != 1)
                ninjaCharacter.y--;
                
            if(direction == "up")
                directionChange = false;
            
            direction = "up";
            directionNum  = 1;
        }

        counter = manageCounter(counter, directionChange);   
        var index = getDimIndex(counter, directionNum);

        var dimWidth  = dimensions[index][0];
        var dimHeight = dimensions[index][1];

        var imageDirectory = imageDir(direction, counter);
        update(imageDirectory, dimWidth, dimHeight);
    }
}

function update(nextImage, width, height){
    //update character position, image and dimensions
    drawNinja(nextImage, width, height)

    //keep track of score and map
    if(worldMap[ninjaCharacter.y][ninjaCharacter.x] == 2){
        score = score + 5;
    }
    else if(worldMap[ninjaCharacter.y][ninjaCharacter.x] == 3){
        score = score + 10;
    }
    worldMap[ninjaCharacter.y][ninjaCharacter.x] = 0;
    buildScore();
    buildGhosts(true);
    buildLifes();
    buildWorld();
}

function drawNinja(nextImage, width, height){
    document.getElementById("characterContainer").style.left = ninjaCharacter.x * 40 + "px";
    document.getElementById("characterContainer").style.top = ninjaCharacter.y * 40 + 100 + "px";
    document.getElementById("ninja").style.backgroundImage = "url('" + nextImage + "')";
    document.getElementById("ninja").style.height = height;
    document.getElementById("ninja").style.width = width;   
}

function imageDir(direction, imageNum){
    if(imageNum > 3)
        imageNum = 1;

    var imageDirectory = "static/naruto/naruto_" + direction + imageNum + ".png"; 
    
    return imageDirectory;
}

function getDimIndex(counter, directionNum){
    var offset = counter - 1;
    return (directionNum * 3) + offset;
}

function manageCounter(currentCounter, change){
    var newCounter = currentCounter + 1;
    
    if(newCounter > 3){
        newCounter = 1;
    }

    if(change){
        newCounter = 2;
    }

    return newCounter;
}