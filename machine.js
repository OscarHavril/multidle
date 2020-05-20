x = 0;
y = 0;
key.enable

var updateLogs = [
    {
        v: 'indev 0.1',
        log: [
            '+ Added update logs.',
            '+ Added a texture for the following block:',
            ['empty.'],
            ': Now using rand.lcg() in place of rand.noise() for worldgen.',
            ': Now using rand.lcg() in place of rand.noise() for textures.',
            ': Changed the textures of the following blocks:',
            ['grass', ' sand', ' snow', ' ice', ' water', ' ocean.'],
            ': Now using rand.lcg() in place of rand.noise() for the locatePattern() function.',
            ': Changed color set for update logs.',
            ': Support for the latest version of madlib.js.',
            '- Removed transitions support for now.'
        ]
    },
    {
        v: 'indev 0.1.3',
        log: [
            '+ Engine now generation-ready.',
            '+ Started biome support buildup.',
            '; Various changements in preparation for "Indev 1.0".',
            ': Built support for madlib.js v0.8.5.',
        ]
    },
    {
        v: 'indev 0.1.4',
        log: [
            ': Support for madlib.js v0.8.6.',
            ': Twisted update logs array.',
            '- Removed all log printing support.',
            '- Removed all log loading support.'
        ]
    }
];
var biomes = {
    name: 'biome',
    type: 'generative',
    priority: 1,
    size: 0.8,
    data: [
        {
            from: 'biome',
            name: 'plains',
            depth: [
                [[[0.9, 'grass'], [1, 'stone']], [[.25, 'water'], [0.3, 'sand'], [0.85, 'grass'], [1, 'stone']], [[.85, 'empty'], [1, 'stone']],],
                [[[0.9, 'grass'], [1, 'stone']], [[.25, 'water'], [0.3, 'sand'], [0.7, 'grass'], [1, 'stone']], [[.7, 'empty'], [1, 'stone']],],
                [[[0.9, 'grass'], [1, 'stone']], [[.25, 'water'], [0.3, 'sand'], [0.7, 'grass'], [1, 'stone']], [[.7, 'empty'], [1, 'stone']],],
            ]
        },
        {
            from: 'biome',
            name: 'desert',
            depth: [
                [[[0.9, 'grass'], [1, 'stone']], [[.15, 'water'], [0.85, 'sand'], [1, 'stone']], [[.85, 'empty'], [1, 'stone']],],
                [[[0.9, 'grass'], [1, 'stone']], [[.25, 'water'], [0.3, 'sand'], [1, 'stone']], [[.7, 'empty'], [1, 'stone']],],
                [[[0.9, 'grass'], [1, 'stone']], [[.25, 'water'], [0.3, 'sand'], [1, 'stone']], [[.7, 'empty'], [1, 'stone']],]
            ]
        },
        {
            from: 'biome',
            name: 'ocean',
            depth: [
                [[[0.3, 'grass'], [1, 'stone']], [[.8, 'water'], [1, 'sand']], [[1, 'empty']],],
                [[[0.9, 'grass'], [1, 'stone']], [[.25, 'water'], [0.3, 'sand']], [[.7, 'empty']],],
                [[[0.9, 'grass'], [1, 'stone']], [[.25, 'water'], [0.3, 'sand']], [[.7, 'empty']],]
            ]
        },
    ]
};
var blocks = [
    {
        name: 'empty',
        animated: false,
        random: false,
        texture: 'none',
        density: 0,
        hardness: 0,
    },
    {
        name: 'grass',
        animated: false,
        random: false,
        texture: [595724, [156, 204, 101, 255], [[124, 179, 66, 255], 0.0625]],
        density: 1,
        hardness: 5,
    },
    {
        name: 'sand',
        animated: false,
        random: false,
        texture: [87916, [255, 238, 88, 255], [[253, 216, 53, 255], 0.203125]],
        density: 1,
        hardness: 3,
    },
    {
        name: 'snow',
        animated: false,
        random: false,
        texture: [132, [238, 238, 238, 255], [[230, 230, 230, 255], 0.1]],
        playerLevel: false,
        groundLevel: true,
        solid: true,
        hardness: 3,
    },
    {
        name: 'ice',
        animated: false,
        random: false,
        texture: [132, [178, 235, 242, 255], [[128, 222, 234, 255], 0.04]],
        playerLevel: false,
        groundLevel: true,
        solid: true,
        hardness: 10,
    },
    {
        name: 'stone',
        animated: false,
        random: false,
        texture: [132, [189, 189, 189, 255], [[158, 158, 158, 255], 0.0003]],
        playerLevel: true,
        groundLevel: true,
        solid: true,
        hardness: 25,
    },
    {
        name: 'water',
        animated: false,
        random: false,
        texture: [1878396, [13, 72, 161, 255], [[21, 101, 192, 255], 0.109375]],
        playerLevel: false,
        groundLevel: true,
        solid: false,
        hardness: 500,
    },
    {
        name: 'ocean',
        animated: false,
        random: false,
        texture: [675544, [26, 35, 126, 255], [[40, 52, 147, 255], 0.1]],
        playerLevel: false,
        groundLevel: true,
        solid: false,
        hardness: 500,
    },
];
console.info('Gaem ready, version ' + updateLogs[updateLogs.length - 1].v);
logs.load(updateLogs, updateLogs[updateLogs.length - 1].v);
tiled.Setup(3, 3, 50, 5, 1, [biomes], ['region']);
tiled.blocks = blocks;
rand.setup(1 / rand.real(0, 100000000000));
tiled.World(2);
//console.dir(tiled.BuildChunk([0, 0], { biome: 'none' }));
key.enable = true;
var tickspeed = 0.1;
var timer = 0;
var c = document.getElementById("game");
var ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;
for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
        tiled.loadChunk(c, [i, j], 0);
    }
}
var res = function () { c.width = window.innerWidth; c.height = window.innerHeight; }
key.addKey("ArrowUp", function () { key.pos.y += 5 });
key.addKey("ArrowLeft", function () { key.pos.x += 5 });
key.addKey("ArrowRight", function () { key.pos.x -= 5 });
key.addKey("ArrowDown", function () { key.pos.y -= 5 });
var t = 0;
var d = new Date();
stats.create();
stats.create();
var alpha = false;
function tick() {
    var a = new Date();
    t++;
    key.action();
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            ctx.putImageData(tiled.loaded[i * 5 + j].img, tiled.settings.chunkSize * tiled.settings.blockSize * tiled.settings.pixelSize * j + key.pos.x, tiled.settings.chunkSize * tiled.settings.blockSize * tiled.settings.pixelSize * i + key.pos.y);
        }
    }
    if (Math.round(a / 1000) != Math.round(d / 1000)) stats.arr[0].li.push(t), t = 0, d = new Date();
    var b = new Date();
    stats.arr[1].li.push(b - a);
    requestAnimationFrame(tick);
};
tick();
window.onresize = res;
//setInterval(tick, 1000 / 200);
/*if (rand.seed <= .25) { chunk.biome = "cold" }
else if (rand.seed <= .5) { chunk.biome = "desert" }
else { chunk.biome = "plains" }
for (let px = 0; px < 100; px++) {
    for (let py = 0; py < 100; py++) {
        var newBlock = Math.abs(rand.marble(.01 * px, .01 * py));
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
}*/

var trans = [
    {
        from: 'sand',
        to: 'grass',
        tile: [0, 0],
    },
    {
        from: 'sand',
        to: 'grass',
        orientation: 'top',
        tile: [1, 0],
    },
    {
        from: 'sand',
        to: 'grass',
        orientation: 'top-right',
        tile: [2, 0],
    },
    {
        from: 'sand',
        to: 'grass',
        orientation: 'left',
        tile: [0, 1],
    },
    {
        from: 'sand',
        to: 'grass',
        orientation: 'right',
        tile: [2, 1],
    },
    {
        from: 'sand',
        to: 'grass',
        orientation: 'bottom-left',
        tile: [0, 2],
    },
    {
        from: 'sand',
        to: 'grass',
        orientation: 'bottom',
        tile: [1, 2],
    },
    {
        from: 'sand',
        to: 'grass',
        orientation: 'bottom-right',
        tile: [2, 2],
    },
];

//for (let i = 0; i < blocks.length; i++) {
//    tile.Block(blocks[i]);
//}
rand.gen2D(50, 50);
var max = 0;
var min = 1;
/*for (let y = 0; y < 50; y++) {
    var r = [];
    for (let x = 0; x < 50; x++) {
        if (max < rand.map.smoothed[y][x]) { max = rand.map.elem[y][x]; }
        if (min > rand.map.smoothed[y][x]) { min = rand.map.elem[y][x]; }
        var a = Math.floor(mix(0, blocks.length, rand.map.smoothed[y][x]));
        r.push(a);
    }
    coords.medium.push(r);
}*/
console.log(min, max);
function spdTest(c1, c2) {
    var x = rand.xlc;
    var d = new Date();
    var n = d.getTime();
    var v = rand.xlcg(c1);
    d = new Date();
    var a = d.getTime() - n;
    rand.xlc = x;
    d = new Date();
    var n2 = d.getTime();
    v = rand.xlcg(c2);
    d = new Date();
    var a2 = d.getTime() - n2;
    rand.xlc = x;
    console.log(a, a2, a2 / a);
}



//ctx.fillStyle = "#000000";
//var image = document.getElementById("source");
//ctx.fillRect(0, 0, 50 * 32, 50 * 32);
//ctx.imageSmoothingEnabled = false;
//ctx.scale(4, 4);
//var timer = 0;
/*for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
        if (!tile.blocks[coords.medium[y][x]].random) {
            var t = tile.blocks[coords.medium[y][x]].texture;
            if (typeof (t[1]) == 'object') {
                var t = tile.blocks[coords.medium[y][x]].texture;
                var img = ctx.createImageData(32, 32);
                var ttr = [];
                var seed = rand.seed;
                rand.setup(1 / t[0]);
                for (let my = 0; my < 8; my++) {
                    for (let mx = 0; mx < 8; mx++) {
                        var clr = t[1];
                        var a = rand.lcg();
                        var sum = a;
                        var r = [];
                        for (let i = 2; i < t.length; i++) {
                            if (sum >= 1 - t[i][1]) {
                                clr = t[i][0];
                                i = t.length;
                            } else {
                                sum += a;
                            }
                        }
                        //scale up
                        for (let dy = 0; dy < 4; dy++) {
                            for (let dx = 0; dx < 4; dx++) {
                                img.data[16 * mx + 512 * my + 4 * dx + 128 * dy] = clr[0];
                                img.data[16 * mx + 512 * my + 4 * dx + 128 * dy + 1] = clr[1];
                                img.data[16 * mx + 512 * my + 4 * dx + 128 * dy + 2] = clr[2];
                                img.data[16 * mx + 512 * my + 4 * dx + 128 * dy + 3] = clr[3];
                            }
                        }
                        r.push(clr);
                    }
                    ttr.push(r);
                }
                ctx.putImageData(img, 32 * x, 32 * y);
                rand.setup(seed);
            } else {
                var t = texture.pos(t[0], t[1]);
                ctx.drawImage(image, t[0], t[1], texture.size, texture.size, 8 * x, 8 * y, 8, 8);
            }

        } else {
            var t = tile.blocks[coords.medium[y][x]].texture;
            var img = ctx.createImageData(32, 32);
            var ttr = [];
            for (let my = 0; my < 8; my++) {
                for (let mx = 0; mx < 8; mx++) {
                    var clr = t[0];
                    var a = rand.lcg();
                    var sum = a;
                    var r = [];
                    for (let i = 1; i < t.length; i++) {
                        if (sum >= 1 - t[i][1]) {
                            clr = t[i][0];
                            i = t.length;
                        } else {
                            sum += a;
                        }
                    }
                    //scale up
                    for (let dy = 0; dy < 4; dy++) {
                        for (let dx = 0; dx < 4; dx++) {
                            img.data[16 * mx + 512 * my + 4 * dx + 128 * dy] = clr[0];
                            img.data[16 * mx + 512 * my + 4 * dx + 128 * dy + 1] = clr[1];
                            img.data[16 * mx + 512 * my + 4 * dx + 128 * dy + 2] = clr[2];
                            img.data[16 * mx + 512 * my + 4 * dx + 128 * dy + 3] = clr[3];
                        }
                    }
                    r.push(clr);
                }
                ttr.push(r);
            }
            ctx.putImageData(img, 32 * x, 32 * y);
        }
    }
}
function locateBlock(type, x0, y0) {
    var t = 0;
    for (let i = 0; i < blocks.length; i++) {
        if (type == blocks[i].name) {
            t = i;
            i = blocks.length;
        }
    }
    for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 50; x++) {
            if (t == coords.medium[y][x]) {
                return [y, x]
            }
        }
    }
    return -1
}
function locatePattern(pattern, item, range) {
    var z = 0;
    for (let i = 0; i < blocks.length; i++) {
        if (item == blocks[i].name) {
            z = i;
            i = blocks.length;
        }
    }
    var t = tile.blocks[z].texture;
    if (typeof (t[1]) == 'object') {
        for (let a = 0; a < range; a++) {
            var sd = rand.seed;
            rand.setup(1 / a);
            var cut = 0;
            for (let my = 0; my < pattern.length; my++) {
                for (let mx = 0; mx < pattern.length; mx++) {
                    var clr = 0;
                    var s = rand.lcg();
                    var sum = s;
                    for (let i = 2; i < t.length; i++) {
                        if (sum >= 1 - t[i][1]) {
                            clr = i - 1;
                            i = t.length;
                        } else {
                            sum += s;
                        }
                    }
                    if (clr != pattern[my][mx]) {
                        mx = range;
                        my = range;
                        cut = 1;
                    }
                }
            }
            rand.setup(sd);
            if (cut == 0) return a;
        }
    } else {
        for (let a = 0; a < range; a++) {
            var sd = rand.seed;
            rand.setup(a);
            var cut = 0;
            for (let my = 0; my < pattern.length; my++) {
                for (let mx = 0; mx < pattern.length; mx++) {
                    var clr = 0;
                    var s = rand.lcg();
                    var sum = s;
                    for (let i = 1; i < t.length; i++) {
                        if (sum >= 1 - t[i][1]) {
                            clr = i;
                            i = t.length;
                        } else {
                            sum += s;
                        }
                    }
                    if (clr != pattern[my][mx]) {
                        mx = range;
                        my = range;
                        cut = 1;
                    }
                }
            }
            rand.setup(sd);
            if (cut == 0) return a;
        }
    }
    return 'Not found'
}
/*(function tick() {
    timer++;
    //check updates before change
    if (updated) {
        for (let px = Math.round(x / 32); px < Math.round((c.width + x) / 32); px++) {
            for (let py = Math.round(y / 32); py < Math.round((c.height + y) / 32); py++) {
                iT = chunk.blocks[px][py];
                ctx.drawImage(image, textures[iT].x, textures[iT].y, 32, 32, 32 * px, 32 * py, 32, 32);
            }
        }
        ctx.fillRect(c.width / 2 - 3, c.height / 2 - 5, 6, 10)
        updated = false;
    }
    if (timer / 60 == Math.floor(timer / 60)) { console.count("Tick") }
    setTimeout(tick, 1000 / 60);
})()*/