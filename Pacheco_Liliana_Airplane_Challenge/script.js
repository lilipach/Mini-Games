var player = {
    left: window.innerWidth/2,
    top: window.innerHeight - 100,
}

var enemies = [
    {left: window.innerWidth/2 - 200, top: window.innerHeight/2 - 200},
    {left: window.innerWidth/2 - 100, top: window.innerHeight/2 - 200},
    {left: window.innerWidth/2, top: window.innerHeight/2 - 200},
    {left: window.innerWidth/2 + 100, top: window.innerHeight/2 - 200},
    {left: window.innerWidth/2 + 200, top: window.innerHeight/2 - 200},

    {left: window.innerWidth/2 - 100, top: window.innerHeight/2 - 100},
    {left: window.innerWidth/2, top: window.innerHeight/2 - 100},
    {left: window.innerWidth/2 + 100, top: window.innerHeight/2 - 100},
]

var missiles = [];

function runGame(){
    drawPlayer();

    drawEnemies();
    moveEnemies();

    drawMissiles();
    moveMissiles();

    playerControl();

    setTimeout(runGame, 80);
};

function drawPlayer(){
    playerList = "";
    //iterate later?
    playerList = playerList + "<div class='player' style = 'left: " + player.left + "px; top: " 
                              + player.top + "px;'></div>"

    document.getElementById("players").innerHTML = playerList;
}

function drawEnemies(){
    enemiesList = "";

    for(var i = 0; i < enemies.length; i++){
        if(enemies[i].top > window.innerHeight - 70){
            enemies[i].top = 0
            enemies[i].left = Math.floor(Math.random() * (window.innerWidth - 75));
        }
        else{
            enemiesList = enemiesList + "<div class='enemy' style = 'left: " + enemies[i].left + "px; top: " 
                                  + enemies[i].top + "px;'></div>"
        }
    }

    document.getElementById("enemies").innerHTML = enemiesList;
}

function moveEnemies(){
    for(var i = 0; i < enemies.length; i++){
        enemies[i].top = enemies[i].top + 5;
    }
}

function drawMissiles(){
    var missileList = "";
    for(var i = 0; i < missiles.length; i++){
        missileList = missileList + "<div class = 'missile' style = 'left: " + (missiles[i].left + 60) + "px; top: "
                                     + (missiles[i].top - 20) + "px;'></div>";
    }
    document.getElementById("missiles").innerHTML = missileList;
}

function moveMissiles(){
    for(var i = 0; i < missiles.length; i++){
        if(missiles[i].top < 0)
            console.log(missiles.splice(i, 1));
        else
            missiles[i].top = missiles[i].top - 15;
    }
}

function playerControl(){
    var playerRange = window.innerHeight - (window.innerHeight/3);

    document.onkeydown = function (e){
        if(e.keyCode == 37){//Left
            if(player.left  - 10 > 0)
                player.left = player.left - 10;
        }
        else if(e.keyCode == 39){//Right
            if(player.left + 10 < window.innerWidth - 145)
                player.left = player.left + 10;

        }
        else if(e.keyCode == 40){//Down
            if(player.top + 10 < window.innerHeight - 90)
                player.top = player.top + 10;
        }
        else if(e.keyCode == 38 ){//Up
            if(player.top - 10 > playerRange - 50)
                player.top = player.top -10;
        }
        else if(e.keyCode = 32){ //fire
            missiles.push({left: player.left, top: player.top });
        }
        drawPlayer();
    }
}
