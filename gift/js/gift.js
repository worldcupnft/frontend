const present = document.querySelector('.present')
present.onclick = () => present.classList.toggle('open')
$('.present').click(function () { 
    $('.firework').toggleClass('pyro')
 })



    ; (function () {
        'use strict'

        // const canvas = document.querySelector('canvas')
        // const ctx = canvas.getContext('2d')

        let width, height, lastNow
        let snowflakes
        let maxSnowflakes = 100

        function init() {
            snowflakes = []
            resize()
            // render(lastNow = performance.now())
        }

        // function render(now) {
        //     requestAnimationFrame(render)

        //     const elapsed = now - lastNow
        //     lastNow = now

        //     ctx.clearRect(0, 0, width, height)
        //     if (snowflakes.length < maxSnowflakes)
        //         snowflakes.push(new Snowflake())

        //     ctx.fillStyle = ctx.strokeStyle = 'rgba(255, 255, 255, .5)'

        //     snowflakes.forEach(snowflake => snowflake.update(elapsed, now))
        // }

        // function pause() {
        //     cancelAnimationFrame(render)
        // }
        // function resume() {
        //     lastNow = performance.now()
        //     requestAnimationFrame(render)
        // }


        class Snowflake {
            constructor() {
                this.spawn()
            }

            spawn(anyY = false) {
                this.x = rand(0, width)
                this.y = anyY === true
                    ? rand(-50, height + 50)
                    : rand(-50, -10)
                this.xVel = rand(-.05, .05)
                this.yVel = rand(.02, .1)
                this.angle = rand(0, Math.PI * 2)
                this.angleVel = rand(-.001, .001)
                this.size = rand(7, 12)
                this.sizeOsc = rand(.01, .5)
            }

            update(elapsed, now) {
                const xForce = rand(-.001, .001);

                if (Math.abs(this.xVel + xForce) < .075) {
                    this.xVel += xForce
                }

                this.x += this.xVel * elapsed
                this.y += this.yVel * elapsed
                this.angle += this.xVel * 0.05 * elapsed //this.angleVel * elapsed

                if (
                    this.y - this.size > height ||
                    this.x + this.size < 0 ||
                    this.x - this.size > width
                ) {
                    this.spawn()
                }

                this.render()
            }

            render() {
                // ctx.save()
                const { x, y, angle, size } = this
                // ctx.beginPath()
                // ctx.arc(x, y, size * 0.2, 0, Math.PI * 2, false)
                // ctx.fill()
                // ctx.restore()
            }
        }

        // Utils
        const rand = (min, max) => min + Math.random() * (max - min)

        function resize() {
            // width = canvas.width = window.innerWidth
            // height = canvas.height = window.innerHeight
            maxSnowflakes = Math.max(width / 10, 100)
        }

        window.addEventListener('resize', resize)
        // window.addEventListener('blur', pause)
        // window.addEventListener('focus', resume)
        init()

    }());
// (function (window) {
//     "use strict";

//     var Particle, p;

//     Particle = function (x, y, speed, direction) {
//         this.initialize(x, y, speed, direction);
//     };

//     p = Particle.prototype;

//     p.initialize = function (x, y, speed, direction) {
//         this.position = new Vector(x, y);

//         this.velocity = new Vector(0, 0);
//         this.velocity.set(speed, direction);

//         this.gravity = new Vector(0, 0);

//         this.friction = 1;

//         return this;
//     };

//     p.setGravity = function (gravity) {
//         this.gravity = new Vector(0, gravity);
//     };

//     p.setFriction = function (friction) {
//         this.friction = friction;
//     };

//     p.accelerate = function (accel) {
//         this.velocity.add(accel);
//     };

//     p.update = function () {
//         // add gravity
//         this.velocity.add(this.gravity);

//         // multiply friction
//         this.velocity.multiply(this.friction);

//         // position
//         this.position.add(this.velocity);
//     };

//     window.Particle = Particle;
// }(window));
// $('.present').click(function () {
//     (function (window) {
//         "use strict";

//         var Vector, p;

//         Vector = function (x, y) {
//             this.initialize(x, y);
//         };

//         p = Vector.prototype;

//         p.initialize = function (x, y) {
//             this.x = x || 0;
//             this.y = y || 0;

//             return this;
//         };

//         p.set = function (length, angle) {
//             this.x = length * Math.cos(angle);
//             this.y = length * Math.sin(angle);
//         };

//         p.set2 = function (x, y) {
//             this.x = x;
//             this.y = y;
//         };

//         p.getAngle = function () {
//             return Math.atan2(this.y, this.x);
//         };

//         p.getLength = function () {
//             return Math.sqrt(this.x * this.x + this.y * this.y);
//         };

//         p.add = function (vector) {
//             this.x += vector.x;
//             this.y += vector.y;
//         };

//         p.multiply = function (value) {
//             this.x *= value;
//             this.y *= value;
//         };

//         window.Vector = Vector;
//     }(window));

//     var canvas = document.getElementById("canvas"),
//         context = canvas.getContext("2d"),
//         width = canvas.width = window.innerWidth,
//         height = canvas.height = window.innerHeight,
//         particles = [],
//         fireforks = [],
//         mouseX = 0,
//         mouseY = 0,
//         size = 3,
//         hue = 0,
//         count = 0,
//         dense = 2;


//     document.body.addEventListener("mousemove", function (event) {
//         mouseX = event.clientX;
//         mouseY = event.clientY;
//     });

//     function createParticle() {
//         var p = new Particle(width / 2, height, 10 + 5 * Math.random(), (1.4 + Math.random() * 0.2) * Math.PI);
//         p.size = size;
//         p.hue = hue;
//         p.lightness = 40 + 40 * Math.random();
//         p.setGravity(0.1);
//         p.setFriction(0.99);

//         particles.push(p);
//     }

//     function createFirefork(x, y, _size, _hue) {
//         var p = new Particle(x, y, 6 + 4 * Math.random(), Math.random() * 2 * Math.PI);
//         p.size = _size / 2;
//         p.hue = _hue;
//         p.lightness = 40 + 40 * Math.random();
//         p.setGravity(0.1);
//         p.setFriction(0.95);

//         fireforks.push(p);
//     }


//     window.setInterval(function () {
//         var i;

//         if (count % 2 === 0) {
//             for (i = 1; i <= dense; i++) {
//                 createParticle()
//             }
//         }

//         if (count % 3 === 0) {
//             for (i = 1; i <= dense; i++) {
//                 createParticle()
//             }
//         }

//         if (count % 5 === 0) {
//             for (i = 1; i <= dense; i++) {
//                 createParticle()
//             }
//         }

//         count++;

//     }, 200);

//     update();

//     function update() {

//         context.clearRect(0, 0, canvas.width, canvas.height);

//         var i, p, length, j, f, reducedParticles = [], reducedFireworks = [];

//         hue += 0.5;

//         for (i = 0, length = particles.length; i < length; i++) {
//             p = particles[i];

//             p.update();

//             if (p.position.x > 0 && p.position.x < width && p.position.y < height && !p.explode) {
//                 reducedParticles.push(p);
//             }
//         }

//         particles = reducedParticles;

//         for (i = 0, length = particles.length; i < length; i++) {
//             p = particles[i];

//             p.size += 0.015;
//             p.lightness -= 0.3;
//             p.hue += 1;

//             if (Math.random() < 0.001 || Math.sqrt(Math.pow((mouseX - p.position.x), 2) + Math.pow(mouseY - p.position.y, 2)) < 3 * p.size) {
//                 p.explode = true;

//                 for (j = 0; j < 15; j++) {
//                     createFirefork(p.position.x, p.position.y, p.size, p.hue);
//                 }
//             }

//             context.beginPath();
//             context.arc(p.position.x, p.position.y, p.size, 0, Math.PI * 2, false);
//             context.fillStyle = 'hsl(' + p.hue + ',100%, ' + p.lightness + '%)';
//             context.fill();
//         }

//         for (i = 0; i < fireforks.length; i++) {
//             f = fireforks[i];

//             if (f.lightness > 0) {
//                 reducedFireworks.push(f);
//             }
//         }

//         fireforks = reducedFireworks;

//         for (i = 0; i < fireforks.length; i++) {
//             f = fireforks[i];

//             f.update();

//             f.lightness -= 0.5;

//             context.beginPath();
//             context.arc(f.position.x, f.position.y, f.size, 0, Math.PI * 2, false);
//             context.fillStyle = 'hsl(' + f.hue + ',100%, ' + f.lightness + '%)';
//             context.fill();
//         }

//         requestAnimationFrame(update);
//     }
// })
