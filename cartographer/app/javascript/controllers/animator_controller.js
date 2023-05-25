import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
static targets = [ 
  "canvas" 
  ]

  connect() {
    this.canvasTarget.width = window.innerWidth;
    this.canvasTarget.height = Math.floor(window.innerHeight * .6);
    this.aniHandle;
  }

  clear() {
    let c = this.canvasTarget.getContext("2d");
    c.beginPath();
    c.clearRect(0,0,this.canvasTarget.width,this.canvasTarget.height);

    if(this.aniHandle) {
      cancelAnimationFrame(this.aniHandle);
    }
  }

  dvdCircle() {
    let c = this.canvasTarget.getContext("2d");
    var width = this.canvasTarget.width;
    var height = this.canvasTarget.height;
    
    var radius = 30;
    var x = Math.min(Math.max(Math.random() * width, radius + 1), width - radius);
    var y = Math.min(Math.max(Math.random() * height, radius + 1), height - radius);
    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;

    //clear any previous animation on animator_controller
    if(this.aniHandle) {
      cancelAnimationFrame(this.aniHandle);
      this.clear();
    }

    //we'll access this via closure to get 'this.aniHandle' into animate()
    var self = this;

    const animate = function() {
      self.aniHandle = requestAnimationFrame(animate);
      c.clearRect(0,0,width,height);

      c.beginPath();
      c.arc(x,y,radius,0,Math.PI * 2,false);
      c.fillStyle = "#dd5512";
      c.fill();
      
      if(x + radius > width || x - radius < 0)
        dx = -dx;
      if(y + radius > height || y - radius < 0)
        dy = -dy;

      x += dx;
      y += dy;

    }
    //assigning this variable calls the next frame
    this.aniHandle = requestAnimationFrame(animate);
  }

  fillBubbles() {
    let c = this.canvasTarget.getContext("2d");

    if(this.aniHandle) {
      cancelAnimationFrame(this.aniHandle);
      this.clear();
    }
    var self = this;

    const animate = function() {
      self.aniHandle = requestAnimationFrame(animate);

      for(let i = 0; i < 1; i++) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * (window.innerHeight * .6);
        c.lineWidth = Math.max(Math.random() * 10, 2);

        let radius = Math.random() * 100;
        let style = `rgba(${Math.random() * 50},${Math.random() * 255},${Math.random() * 255},${Math.random()})`;
        if(i%3==0) {
          c.beginPath();
          c.arc(x,y,radius,0,Math.PI * 2,false);
          c.strokeStyle = style;
          c.stroke();
        } else {
          c.beginPath();
          c.arc(x,y,radius,0,Math.PI * 2,false);
          c.fillStyle = style;
          c.fill();
        }
      }
    }
    
    this.aniHandle = requestAnimationFrame(animate);
  }

  movingCircles() {
    let c = this.canvasTarget.getContext("2d");
    var width = this.canvasTarget.width;
    var height = this.canvasTarget.height;

    if(this.aniHandle) {
      cancelAnimationFrame(this.aniHandle);
      this.clear();
    }
    var self = this;
    
    function Circle(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;

      this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle = "#dd5512";
        c.fillStyle = "#efa395";
        c.stroke();
        c.fill();
      }

      this.update = function() {
        if(this.x + this.radius > width || this.x - this.radius < 0)
          this.dx = -this.dx;
        if(this.y + this.radius > height || this.y - this.radius < 0)
          this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    let randoC = function(w,h) {
      let out = [];
      let speedMult = 3;
      let r = Math.max(Math.random() * 30, 5);
      out.push(Math.min(Math.max(Math.random() * w, r + 1), w - r));
      out.push(Math.min(Math.max(Math.random() * h, r + 1), h - r));
      out.push((Math.random() - 0.5) * speedMult);
      out.push((Math.random() - 0.5) * speedMult);
      out.push(r);
      return out;
    }

    let circleArray = [];
    for(let i = 0; i < 200; i++) {
      circleArray.push(new Circle(...randoC(width,height)));
    }
    let time = 0;
    let diff = 1;
    c.lineWidth = diff;

    const animate = function() {
      self.aniHandle = requestAnimationFrame(animate);
      c.clearRect(0,0,width,height);

      time < 60 ? time++ : time = 0;
      if(time % 4 == 0) {
        diff = (Math.random() * 4) - 2;
        c.lineWidth < 15 ? c.lineWidth += diff : c.lineWidth -= 2;
      }

      for(let circle of circleArray) {
        circle.update(); 
      }

    }
    this.aniHandle = requestAnimationFrame(animate);
  }

  growingCircles() {
    let c = this.canvasTarget.getContext("2d");
    c.lineWidth = 2;
    var width = this.canvasTarget.width;
    var height = this.canvasTarget.height;
    let rect = this.canvasTarget.getBoundingClientRect();
    let mouse = {
      x: undefined,
      y: undefined
    }
    window.addEventListener('mousemove',
      function(event) {
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        if(mouse.x > rect.width)
          mouse.x = -1;
        if(mouse.y > rect.height)
          mouse.y = -1;
      })
    if(this.aniHandle) {
      cancelAnimationFrame(this.aniHandle);
      this.clear();
    }
    var self = this;

    //Circle Object manages itself entirely with calls to update()
    function Circle(x, y, dx, dy, radius, stroke, fill) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.stroke = stroke;
      this.fill = fill;

      this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle = this.stroke;
        c.fillStyle = this.fill;
        c.stroke();
        c.fill();
      }

      this.inside = function(width, height) {
        if(this.x + this.radius + 1 > width)
          return false;
        if(this.y + this.radius + 1 > height)
          return false;
        if(this.y - (this.radius + 1) < 0)
          return false;
        if(this.x - (this.radius + 1) < 0)
          return false;
        return true;
      }

      this.update = function() {
        //wall bounces
        if(this.x + this.radius > width || this.x - this.radius < 0)
          this.dx = -this.dx;
        if(this.y + this.radius > height || this.y - this.radius < 0)
          this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        let distance = Math.sqrt((mouse.x-this.x)*(mouse.x-this.x)+(mouse.y-this.y)*(mouse.y-this.y))
        if(distance < this.radius && this.inside(width, height)) {
          this.radius += 1;
        }

        this.draw();
      }
    }

    let randoRgbaTemplate = function() {
      let r = Math.random() * 255;
      let g = Math.random() * 255;
      let b = Math.random() * 255;
      let a = Math.random();
      return `rgba(${r},${g},${b},${a})`;
    }

    //generating randomized circles
    //creates an array that will get spread out in the Circle call below
    let randoC = function(w,h) {
      let out = [];
      let speedMult = 3;
      let r = Math.max(Math.random() * 30, 5);
      out.push(Math.min(Math.max(Math.random() * w, r + 1), w - r));
      out.push(Math.min(Math.max(Math.random() * h, r + 1), h - r));
      out.push((Math.random() - 0.5) * speedMult);
      out.push((Math.random() - 0.5) * speedMult);
      out.push(r);
      out.push(randoRgbaTemplate());
      out.push(randoRgbaTemplate());

      return out;
    }

    let circleArray = [];
    for(let i = 0; i < 100; i++) {
      circleArray.push(new Circle(...randoC(width,height)));
    }

    //our actual animate loop
    const animate = function() {
      self.aniHandle = requestAnimationFrame(animate);
      c.clearRect(0,0,width,height);

      for(let circle of circleArray) {
        circle.update(); 
      }

    }
    this.aniHandle = requestAnimationFrame(animate);
  }

	trailCircles() {
    let c = this.canvasTarget.getContext("2d");
    c.lineWidth = 1;
    let width = this.canvasTarget.width;
    let height = this.canvasTarget.height;
    let rect = this.canvasTarget.getBoundingClientRect();
    //mouse tracking and adjustment to canvas coords
    let mouse = {
      x: undefined,
      y: undefined
    }

    window.addEventListener('mousemove',
      function(event) {
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        if(mouse.x > rect.width)
          mouse.x = -1;
        if(mouse.y > rect.height)
          mouse.y = -1;
      })

    if(this.aniHandle) {
      cancelAnimationFrame(this.aniHandle);
      this.clear();
    }
    var self = this;

    //Circle Object manages itself entirely with calls to update()
    function Circle(x, y, dx, dy, radius, stroke, fill) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.stroke = stroke;
      this.fill = fill;

      this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle = this.stroke;
        c.fillStyle = this.fill;
        c.stroke();
        c.fill();
      }

      this.update = function(time) {
        //gravity
        if(time % 5 == 0) {
          this.dy++;
        }

        //wall bounces
        //accounting for radius and future movement prevents circles from piercing the walls and stalling out
        if(this.x + this.radius + this.dx >= width || this.x - this.radius + this.dx <= 0)
          this.dx = -this.dx * .8;
        if(this.y + this.radius + this.dy >= height || this.y - this.radius + this.dy <= 0)
          this.dy = -this.dy * .8;

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    let randoRgbaTemplate = function() {
      let r = Math.random() * 100;
      let g = Math.random() * 255;
      let b = Math.random() * 200;
      let a = Math.random();
      return `rgba(${r},${g},${b},${a})`;
    }

    //generating randomized circles
    //creates an array that will get spread out in the Circle call below
    let randoC = function() {
      let out = [];
      let speedMult = 3;
      let r = Math.max(Math.random() * 20, 5);
      out.push(mouse.x);
      out.push(mouse.y);
      out.push((Math.random() - 0.5) * speedMult);
      out.push(Math.random() * speedMult * -1);
      out.push(r);
      out.push(randoRgbaTemplate());
      out.push(randoRgbaTemplate());

      return out;
    }

    let time = 0;
    let circleArray = [];

    //our actual animate loop
    //will only add circles if the x and y > 1
    const animate = function() {
      self.aniHandle = requestAnimationFrame(animate);
      c.clearRect(0,0,width,height);

      time < 60 ? time++ : time = 0;

      if(time % 10 == 0 && mouse.x > 1 && mouse.y > 1) {
        circleArray.push(new Circle(...randoC()));
        if(circleArray.length > 30) circleArray.shift();
      }
      

      for(let circle of circleArray) {  
        circle.update(time); 
      }
    }
    this.aniHandle = requestAnimationFrame(animate);
	}
}