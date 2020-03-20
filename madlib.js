
var pi = Math.PI;
radToDeg = (a) => a * (180 / pi);
radToRev = (a) => a * (.5 / pi);
degToRad = (a) => a * (pi / 180);
degToRev = (a) => a * (.5 / 180);
revToDeg = (a) => a * (180 / .5);
revToRad = (a) => a * (pi / .5);
var rad = pi;
var rev = 1;
var deg = 180;
convertAngle = (a, from, to) => a * (to / from);
var goldenRatio = (Math.sqrt(5) + 1) / 2;
function angle(a, b) {
    if (a == 0) { return Math.PI / 2 * Math.floor(b / Math.abs(b)) }
    else if (a > 0) { return Math.atan(b / a) }
    else { return Math.atan(b / a) + Math.PI }
}
mix = (a, b, d) => (1 - d) * a + d * b;
var rand = {
    seed: 1,
    step: .005,
    len: 10,
    noise: function (x = Math.random) {
        var t = 0;
        for (let i = 0; i < rand.len; i++) {
            t += 1 / (i + 1) ** .3 * Math.sin(i ** 2 * x * rand.step + rand.seed * i);
        }
        return .5 * Math.cos(64 * Math.PI * t) + .5
    },
    int: (a, b, x = Math.random()) => Math.round(a + rand.noise(x) * (b - a)),
    real: function (a, b, acc = -1, x = Math.random()) {
        if (acc >= 0) {
            return Math.round((a + rand.noise(x) * (b - a)) * (10 ** acc)) / (10 ** acc)
        }
        return a + Math.random() * (b - a)
    },
    knuth: (a, b, c) => b < 2 || c < 1 ? a ** c : knuth(a, b - 1, knuth(a, b, c - 1)),
    gen2D: function (a, b, zero = 0) {
        var result = [];
        for (let x = zero; x < a + zero; x++) {
            var r = [];
            for (let y = zero; y < b + zero; y++) {
                r.push(rand.noise(x + ay));
            }
        }
    }
}
var bubble = {
    data: [],
    settings: {
        rangeEffectArea: 100,
        generalBehavior: 1,
        generalRangeEffect: 0
    },
    create: function (x, y, speed = 5, rs = .1, angle = 0) {
        this.data.push({ angle: angle, x: x, y: y, rspeed: rs, speed: speed });
        return this.data[this.data.length - 1]
    },
    delete: function (i) {
        var a = this.data.slice(i + 1);
        var b = this.data.slice(0, i);
        var d = this.data[i];
        this.data = b.concat(a);
        return d
    },
    tick: function (i, x, y, behavior = bubble.settings.generalBehavior, rangeEffect = bubble.settings.generalRangeEffect, homing = false) {
        var dx = x - bubble.data[i].x;
        var dy = y - bubble.data[i].y;
        var cAngle = Math.atan2(dy, dx);
        var norme = Math.sqrt(dx ** 2 + dy ** 2);
        if (behavior != 0) {
            if (behavior == -1) { behavior = 0; }
            if (homing == true) {
                var diff = cAngle - bubble.data[i].angle;
                var rs = bubble.data[i].rspeed;
                if (diff > pi) { diff += pi * 2; }
                else if (diff < -pi) { diff += pi * 2; }
                if (diff > rs) { bubble.data[i].angle += rs + pi + pi * behavior; }
                else if (diff < -rs) { bubble.data[i].angle -= rs + pi + pi * behavior; }
                else { bubble.data[i].angle = cAngle + pi + pi * behavior; }
            } else {
                bubble.data[i].angle = cAngle + pi + pi * behavior;
            }

        }
        if (bubble.data[i].angle > pi) { bubble.data[i].angle -= 2 * pi; }
        if (bubble.data[i].angle < -pi) { bubble.data[i].angle += 2 * pi; }
        bubble.data[i].x += Math.cos(mix(bubble.data[i].angle, cAngle, (1 / norme * bubble.settings.rangeEffectArea * .1) * rangeEffect)) * (bubble.data[i].speed + Math.abs(rangeEffect) * (1 / ((1 / bubble.settings.rangeEffectArea) * norme)));
        bubble.data[i].y += Math.sin(mix(bubble.data[i].angle, cAngle, (1 / norme * bubble.settings.rangeEffectArea * .1) * rangeEffect)) * (bubble.data[i].speed + Math.abs(rangeEffect) * (1 / ((1 / bubble.settings.rangeEffectArea) * norme)));
        return this.data[i]
    },
    edit: function (i, x, y, speed = 5, rs = .1, angle = 0) { this.data[i] = { angle: angle, x: x, y: y, rspeed: rs, speed: speed }; }
}
var cursor = {
    x: 1,
    y: 1
}
document.addEventListener("mousemove", function (e) {
    cursor.x = event.clientX;
    cursor.y = event.clientY;
});