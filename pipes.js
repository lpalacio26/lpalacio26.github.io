 class PipeScreensaver {
            constructor() {
                this.container = document.getElementById('pipe-container');
                this.pipeSegments = [];
                this.currentPosition = { x: 0, y: 0, z: 0 };
                this.direction = 'right';
                this.colors = ['yellow', 'orange'];
                this.pipeLength = 25;
                this.createPipe();
                this.animate();
            }

            createPipe() {
                for (let i = 0; i < this.pipeLength; i++) {
                    const segment = document.createElement('div');
                    segment.className = 'pipe-segment';
                    this.pipeSegments.push(segment);
                    this.container.appendChild(segment);
                }
            }

            updatePipe() {
                // Change direction randomly
                if (Math.random() < 0.02) {
                    this.direction = ['right', 'left', 'up', 'down'][Math.floor(Math.random() * 4)];
                }

                // Update position based on direction
                switch(this.direction) {
                    case 'right': this.currentPosition.x += 50; break;
                    case 'left': this.currentPosition.x -= 50; break;
                    case 'up': this.currentPosition.y -= 50; break;
                    case 'down': this.currentPosition.y += 50; break;
                }

                // Keep pipe within viewport bounds
                if (this.currentPosition.x > window.innerWidth - 100) this.direction = 'left';
                if (this.currentPosition.x < 0) this.direction = 'right';
                if (this.currentPosition.y > window.innerHeight - 100) this.direction = 'up';
                if (this.currentPosition.y < 0) this.direction = 'down';

                // Update segment positions and colors
                this.pipeSegments.forEach((segment, index) => {
                    const hue = (Date.now() * 0.1 + index * 10) % 360;
                    const color = `hsl(${hue}, 100%, 50%)`;
                    
                    segment.style.backgroundColor = color;
                    segment.style.transform = `
                        translate3d(
                            ${this.currentPosition.x - index * 50}px,
                            ${this.currentPosition.y}px,
                            ${-index * 50}px
                        )
                        rotateZ(${this.direction === 'right' || this.direction === 'left' ? 90 : 0}deg)
                    `;
                });
            }

            animate() {
                this.updatePipe();
                requestAnimationFrame(() => this.animate());
            }
        }

        // Initialize the screensaver
        window.addEventListener('load', () => {
            new PipeScreensaver();
        });

        // Add Y2K-style resize effect
        window.addEventListener('resize', () => {
            document.body.style.transform = `scale(${1 + Math.random() * 0.02})`;
            setTimeout(() => {
                document.body.style.transform = 'scale(1)';
            }, 100);
        });