var tileValues = [];
var clickedTiles = [];
var clickedTileIds = [];
var flipped = 0;
Array.prototype.randomize = function() {
    var i = this.length;
    var rand;
    var temp;
    while(--i > 0){
        rand = Math.floor(Math.random() * (i+1));
        temp = this[rand];
        this[rand] = this[i];
        this[i] = temp;
    }
}

function newGame(difficulty) {
    flipped = 0;
    var output = '';
    tileValues.randomize();

    for(var i = 0; i < tileValues.length; i++){
        output += '<div id="tile_'+i+'"><img src=image'+tileValues[i]+'.jpg></div>';
    }
    document.getElementById('board').innerHTML = output;
    output="";

    setTimeout(function(){
        for(var i = 0; i < tileValues.length; i++){
            output += '<div id="tile_'+i+'" onclick="flip(this,\''+tileValues[i]+'\')"></div>';
        }
        document.getElementById('board').innerHTML = output;
    }, difficulty);
   
    setTimeout(function() {
        timer();
    }, difficulty-500);
    
}
function flip(tile,value) {
    if(tile.innerHTML == "" && clickedTiles.length < 2) {
        tile.innerHTML = '<img src=image'+value+'.jpg>';
        if(clickedTiles.length == 0){
            clickedTiles.push(value);
            clickedTileIds.push(tile.id);
        }
        else if(clickedTiles.length == 1) {
            clickedTiles.push(value);
            clickedTileIds.push(tile.id);
            if(clickedTiles[0] == clickedTiles[1]) {
                flipped += 2;
                clickedTiles = [];
                clickedTileIds = [];
                if(flipped == tileValues.length){
                    alert("🥳 You won!");
                    location.reload();
                }
            }
            else {
                function flipBack() {
                    var tile1 = document.getElementById(clickedTileIds[0]);
                    var tile2 = document.getElementById(clickedTileIds[1]);
                    tile1.innerHTML = "";
                    tile2.innerHTML = "";
                    clickedTiles = [];
                    clickedTileIds = [];
                }
                
                setTimeout(flipBack, 1000);
            }
        }
    }
}

function timer(){
    if(document.getElementById("numPics8").checked)
        var time = 120000;
    if(document.getElementById("numPics10").checked)
        var time = 150000;
    if(document.getElementById("numPics12").checked)
        var time = 180000;
    
    var countDownDate = new Date().getTime()+time;

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = '<b>'+ minutes + ":" + seconds+'</b>';

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "😢 You ran out of time!";
            alert("You ran out of time.");
            location.reload();
        }
    }, 1000);
}
//validation
function radioCheck(){
    if(document.getElementById("numPics8").checked)
        tileValues = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8'];
    if(document.getElementById("numPics10").checked)
        tileValues = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9','10','10'];
    if(document.getElementById("numPics12").checked)
        tileValues = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9','10','10','11','11','12','12'];
}