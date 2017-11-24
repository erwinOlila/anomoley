require('../css/style.css')

var canvas = document.getElementById('canvas');

// set canvas dimension based on browser's full width and height

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


// ensures the canvas dimension spans with the browser's dimension dynamically
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

const maxRadius = 20;
// const minRadius = 2;

const colors = [
  'rgba(62,43,56,0.9)',
  'rgba(115,45,65,0.9)',
  'rgba(152,28,45,0.9)',
  'rgba(218,124,7,0.9)',
  'rgba(244,176,6,0.9)',
];

class Circle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }


  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fill();
    this.update();
  }

  update() {
    this.dx = ((this.x + this.radius > innerWidth || this.x - this.radius < 0 ) ? -this.dx : this.dx);
    this.dy = ((this.y + this.radius > innerHeight || this.y - this.radius < 0 ) ? -this.dy : this.dy);

    this.x += this.dx;
    this.y += this.dy;

    // interactivity, if cursor is near the circles at a specified distance
    if (mole.getLoc().x - this.x < 50 && mole.getLoc().x - this.x > -50 && mole.getLoc().y - this.y < 50 && mole.getLoc().y - this.y > -50 && this.radius < maxRadius) {
      this.radius += 5;
    } else if (this.radius > this.minRadius) {
      this.radius -= 0.2;
    }
  }
}

class Mole extends Circle {
  constructor(x, y, radius, dx, dy) {
    super(x, y, radius, dx, dy);
  }
  getLoc() {
    return {
      x : this.x,
      y : this.y
    }
  }
}
var circles = []
var mole = new Mole(100, 100, 2, 4, 4);

var mole_loc = {
  x: mole.x,
  y: mole.y
}
function init() {
  circles = [];
  for (let i = 0; i < 2000; i++) {
    const radius = Math.random() * 3 + 1;
    // prevents spawning circle behind the borders of the screen
    const x = Math.random()* (innerWidth - 2*radius) + radius; // min: radius, max: screen width-r
    const y = Math.random()* (innerHeight - 2*radius) + radius; // min: radius, max: screen height-r
    const dx = (Math.random() - 0.5) ;
    const dy = (Math.random() - 0.5) ;

    let circle = new Circle(x, y, radius, dx, dy);
    circles.push(circle);
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight) // clear canvas everytime this function is called

  circles.forEach(circle => {
    circle.draw();
  })
  mole.draw();

}

init();
animate();
