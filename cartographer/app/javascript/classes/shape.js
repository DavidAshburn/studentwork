export class Shape {

  constructor(index,x,y,width,height,line_width = 3,stroke = "#ef4444",fill = "#fca5a5") {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.line_width = line_width;
      this.stroke = stroke;
      this.fill = fill;
      this.held = false;
      this.selected = false;
      this.xoffset = 0;
      this.yoffset = 0;
      this.children = {
        left:-1,
        bottom:-1,
        right:-1
      };
      this.index = index;
    }

  hold() {
    this.held = true;
  }

  drop() {
    this.held = false;
  }

  select() {
    this.selected = true;
    this.line_width = 8;
  }

  deselect() {
    this.selected = false;
    this.line_width = 3;
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val,min),max);
  }

  randomRgba() {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let a = Math.random();
    return `rgba(${r},${g},${b},${a})`;
  }
}

export class Rectangle extends Shape {

  draw(c) {
    c.beginPath();
    if(this.selected)
      c.strokeStyle = "#16a34a";
    else
      c.strokeStyle = this.stroke;
    c.fillStyle = this.fill;
    c.lineWidth = this.line_width;
    c.strokeRect(this.x,this.y,this.width,this.height);
    c.fillRect(this.x,this.y,this.width,this.height);
    c.stroke();
    c.fill();
  }

  update(x,y,c) {
    if(this.held && x > 0 && y > 0) {
      this.x = this.clamp(x - this.xoffset,1,canvas.width - this.width);
      this.y = this.clamp(y - this.yoffset,1,canvas.height - this.height);
    }
    this.draw(c);
    this.showNodes(c);
  }

  inside(x,y) {
    if(x < this.x || x > this.x + this.width)
      return false;
    if(y < this.y || y > this.y + this.height)
      return false;
    return true;
  }

  showNodes(c) {
    c.lineWidth = 2;
    if(this.children.left < 0) {
      c.beginPath();
      c.strokeStyle = "#888888";
      c.arc(this.x - 20,this.y + this.height + 30,15,0,Math.PI * 2,false);
      c.stroke();
    }
    if(this.children.bottom < 0) {
      c.beginPath();
      c.strokeStyle = "#888888";
      c.arc(this.x + this.width/2,this.y + this.height + 30,15,0,Math.PI * 2,false);
      c.stroke();
    }
    if(this.children.right < 0) {
      c.beginPath();
      c.strokeStyle = "#888888";
      c.arc(this.x +this.width + 20,this.y + this.height + 30,15  ,0,Math.PI * 2,false);
      c.stroke();
    }
  }
}

export class Circle extends Shape {
  constructor(index,x,y,radius,line_width = 3,stroke = "#ef4444",fill = "#fca5a5") {
    super(index,x,y,stroke,fill);
    this.radius = radius;
    this.line_width = line_width;
    this.held = false;
    this.selected = false;
    this.xoffset = 0;
    this.yoffset = 0;
    this.children = {
        left:-1,
        bottom:-1,
        right:-1
      };
  }

  draw(c) {
    c.beginPath();
    c.strokeStyle = this.stroke;
    if(this.selected) c.strokeStyle = "#16a34a";
    c.fillStyle = this.fill;
    c.lineWidth = this.line_width;
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
    c.stroke();
    c.fill();
  }

  update(x,y,c) {
    if(this.held && x > 0 && y > 0) {
      this.x = this.clamp(x - this.xoffset,this.radius,canvas.width - this.radius);
      this.y = this.clamp(y - this.yoffset,this.radius,canvas.height - this.radius);
    }
  
    this.draw(c);
    this.showNodes(c);
  }

  inside(x,y) {
    // interactivity
    let distance = Math.sqrt((x-this.x)*(x-this.x)+(y-this.y)*(y-this.y))
    if(distance < this.radius)
      return true;
    return false;
  }

  showNodes(c) {
    c.lineWidth = 2;
    if(this.children.left < 0) {
      c.beginPath();
      c.strokeStyle = "#888888";
      c.arc(this.x - this.radius - 10,this.y + this.radius + 25,15,0,Math.PI * 2,false);
      c.stroke();
    }
    if(this.children.bottom < 0) {
      c.beginPath();
      c.strokeStyle = "#888888";
      c.arc(this.x,this.y + this.radius + 25,15,0,Math.PI * 2,false);
      c.stroke();
    }
    if(this.children.right < 0) {
      c.beginPath();
      c.strokeStyle = "#888888";
      c.arc(this.x + this.radius + 10,this.y + this.radius + 25,15  ,0,Math.PI * 2,false);
      c.stroke();
    }
  }
}

export class Triangle extends Shape {

  draw(c) {
    c.beginPath();
    if(this.selected)
      c.strokeStyle = "#16a34a";
    else
      c.strokeStyle = this.stroke;
    c.fillStyle = this.fill;
    c.lineWidth = this.line_width;
    c.moveTo(this.x,this.y);
    c.lineTo(this.x+this.width/2,this.y-this.height);
    c.lineTo(this.x+this.width,this.y);
    c.lineTo(this.x,this.y);
    c.lineTo(this.x+this.width/2,this.y-this.height);
    c.stroke();
    c.fill();
  }

  update(x,y,c) {
    if(this.held && x > 0 && y > 0) {
      this.x = this.clamp(x - this.xoffset,1,canvas.width - this.width);
      this.y = this.clamp(y - this.yoffset,1 + this.height,canvas.height - 1);
    }
    this.draw(c);
    this.showNodes(c);
  }

  //checking if mouse falls under the line y=-2x+height based on coordinate system origin in center of bottom side
  inside(x,y) {
    if(x < this.x || x > this.x + this.width)
      return false;

    if(y > this.y || y < this.y - this.height)
      return false;

    let mx = x - this.x - (this.width / 2);

    if (Math.abs(mx) * -(this.height / (this.width / 2)) + this.height >= this.y - y) return true;
    return false;
  }

  showNodes(c) {
    c.lineWidth = 2;
    if(this.children.left < 0) {
      c.beginPath();
      c.strokeStyle = "#888888";
      c.arc(this.x - 10,this.y + 30,15,0,Math.PI * 2,false);
      c.stroke();
    }
    if(this.children.bottom < 0) {
      c.beginPath();
      c.strokeStyle = "#888888";
      c.arc(this.x + this.width/2,this.y + 30,15,0,Math.PI * 2,false);
      c.stroke();
    }
    if(this.children.right < 0) {
      c.beginPath();
      c.strokeStyle = "#888888";
      c.arc(this.x +this.width + 10,this.y + 30,15  ,0,Math.PI * 2,false);
      c.stroke();
    }
  }
}