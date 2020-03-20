x = 0;
y = 0;

//dictionnary for all keys and their values, and meaning
var key = {
    state: [],
    value: [],
    act: {}
}
//a 'k' before the id so Visual Studio stops screaming
for (let i = 0; i < 100; i++) {
    key.state[i] = false;
    //FIX THIS THIS IS NO GOOD
    //Fixed
    //Oh thanks god I feel better
    //You're welcome :)
    //:)
    //:)
    //Okay, back to work :)
}
function setKeyVal(k, val) { key.value[k] = val; }
function setKeyAct(k, act) { eval("key.act." + k + " = " + act + ";"); }
//Key thing that add a meaning 
//But no action tho
//Yup, this comes later
setKeyVal(90, "up")
setKeyVal(38, "up")
setKeyVal(83, "down")
setKeyVal(40, "down")
setKeyVal(81, "left")
setKeyVal(37, "left")
setKeyVal(68, "right")
setKeyVal(39, "right")
//Time for the actions!
//Setup them first,
//And then add them!




//oh yeah, and the detector
document.addEventListener("keydown", function (e) {
    e = e || event; // to deal with IE
    key.state[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
});
document.addEventListener("keyup", function (e) {
    e = e || event; // to deal with IE
    key.state[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
});
//Oops, almost forgot !
setKeyAct("up", "function up() { ctx.translate(0, -1); y--; update() }")
setKeyAct("down", "function down() { ctx.translate(0, 1); y++; update() }")
setKeyAct("left", "function left() { ctx.translate(-1, 0); x--; update() }")
setKeyAct("right", "function right() { ctx.translate(1, 0); x++; update() }")

var tickspeed = 0.1;
var timer = 0;
function deg(a) {
    return a * (180 / Math.PI)
};
function rad(a) {
    return a * (Math.PI / 180)
}
function angle(a, b) {
    if (a == 0) {
        return Math.PI / 2 * Math.floor(b / Math.abs(b))
    } else if (a > 0) {
        return Math.atan(b / a)
    } else {
        return Math.atan(b / a) + Math.PI
    }
}
function update() {

}
var chunk = {
    biome: "none",
    gui: {},
    blocks: []
};
for (let i = 0; i < 100; i++) {
    chunk.blocks.push([0]);
}
var seed = Math.random();
if (seed <= .25) { chunk.biome = "cold" }
else if (seed <= .5) { chunk.biome = "desert" }
else { chunk.biome = "plains" }
noise.seed(seed);
for (let px = 0; px < 100; px++) {
    for (let py = 0; py < 100; py++) {
        var newBlock = Math.abs(noise.simplex2(.01 * px, .01 * py));
        if (chunk.biome == "cold") {
            if (newBlock <= .25) { chunk.blocks[px][py] = "ice" }
            else { chunk.blocks[px][py] = "snow" }
        }
        if (chunk.biome == "desert") {
            if (newBlock <= .25) { chunk.blocks[px][py] = "water" }
            else { chunk.blocks[px][py] = "sand" }
        }
        if (chunk.biome == "plains") {
            if (newBlock <= .25) { chunk.blocks[px][py] = "water" }
            else if (newBlock <= .35) { chunk.blocks[px][py] = "sand" }
            else if (newBlock <= .75) { chunk.blocks[px][py] = "grass" }
            else { chunk.blocks[px][py] = "snow" }
        }
    }
}
var textures = {
    sand: { x: 192, y: 192 },
    grass: { x: 32, y: 32 },
    stone: { x: 192, y: 224 },
    snow: { x: 128, y: 32 },
    water: { x: 224, y: 32 },
    ice: { x: 224, y: 128 }
}

var c = document.getElementById("game")
c.width = document.documentElement.clientWidth;
c.height = document.documentElement.clientHeight;
var ctx = c.getContext("2d");
ctx.fillStyle = "#000000";
var image = document.getElementById("source");
ctx.fillRect(0, 0, c.width, c.height);
console.log(c.width, c.height);
var timer = 0;
(function tick() {
    timer++;
    for (i = 0; i < 100; i++) {
        if (key.state[i] == true) {
            eval('key.act.' + key.value[i] + "()");
            //God I LOVEHATE this
        }
    }
    //check updates before change
    if (updated) {
        for (let px = Math.round(x/32); px < Math.round((c.width+x)/32); px++) {
            for (let py = Math.round(y/32); py < Math.round((c.height+y)/32); py++) {
                iT = chunk.blocks[px][py];
                ctx.drawImage(image, textures[iT].x, textures[iT].y, 32, 32, 32 * px, 32 * py, 32, 32);
            }
        }
        ctx.fillRect(c.width / 2 - 3, c.height / 2 - 5, 6, 10)
        updated = false;
    }
    if (timer / 60 == Math.floor(timer / 60)) { console.count("Tick") }
    setTimeout(tick, 1000 / 60);
})()