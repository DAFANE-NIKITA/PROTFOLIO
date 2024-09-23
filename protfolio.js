const text = " Front-End Developer!";
const typingText = document.getElementById('typing-text');
let index = 0;

function type() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100); // Adjust the typing speed here
    }
}

window.onload = type;

//background
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1; // Fade out
    }

    draw() {
        ctx.fillStyle = 'rgba(#023047, #023047, #023047, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.3) {
            particlesArray.splice(index, 1);
            particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
// 


document.addEventListener('scroll', () => {
    const texts = document.querySelectorAll('.animated-text');
    const scrollPos = window.scrollY + window.innerHeight;

    texts.forEach(text => {
        if (scrollPos > text.offsetTop + 100) {
            text.classList.add('visible');
        } else {
            text.classList.remove('visible');
        }
    });
});
