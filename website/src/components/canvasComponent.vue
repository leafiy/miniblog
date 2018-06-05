<template>
    <canvas ref="canvas" :id="id" :height="height" :width="width">
        <svg :width="width" :height="height" :id="id+'-svg'" :viewBox="'0 0 '+ width +' ' + height" v-if="jelly" style="display:none">
            <path :d="path? path : circlePath" />
        </svg>
    </canvas>
</template>
<script>
import Jelly from 'jelly.js'
export default {
    data() {
        return {
            cxt: null
        }
    },
    props: {
        'width': {
            type: Number
        },
        'height': {
            type: Number
        },
        'id': {
            type: String
        },
        'shape': {
            type: String
        },
        'fill': {
            type: String,
            default: '#d0e6f1'
        },
        'storke': {
            type: String
        },
        'jelly': {
            type: Boolean,
            default: true
        },
        'radius': {
            type: Number
        },
        'path': {
            type: String
        }
    },
    mounted() {
        this.renderCanvas()
    },
    activated() {
        this.renderCanvas()
    },
    computed: {
        circlePath() {
            let cx = this.width / 2
            let cy = this.height / 2
            let r = this.radius ? this.radius : this.width / 2
            let x = (Math.sqrt(2) - 1) * 4 / 3
            let path = `M ${cx} ${0}
           c ${-r*x}    , 0
           ${-r}      , ${r*(1-x)}
           ${-r}      , ${r}

                  0, ${r*x}
            ${r*(1-x)}, ${r}
            ${r}      , ${r}

            ${r*x}    , 0
            ${r}      ,${-r*(1-x)}
            ${r}      ,${-r}

                  0,${-r*x}
           ${-r*(1-x)},${-r}
           ${-r}      ,${-r}`

            path += `
            z
            `


            return path
        }
    },
    methods: {
        renderCanvas() {
            let canvas = this.$refs['canvas']
            let cxt = canvas.getContext('2d')
            this.cxt = cxt
            this.draw(this.shape)
        },
        draw(shape) {
            if (shape == 'circle') {
                this.cxt.beginPath()
                this.cxt.arc(this.width / 2, this.height / 2, this.width / 2, 0, Math.PI * 2);
                this.cxt.closePath();
                this.cxt.fillStyle = this.fill
                this.cxt.fill();
                if (this.jelly) {
                    this.makeJelly()
                }
            }
        },
        makeJelly() {
            let path = `#${this.id}-svg path`
            if (!document.querySelector(path)) {
                throw new Error('path missing')
            }
            let options = {
                paths: `#${this.id}-svg path`,
                pointsNumber: 10,
                color: this.fill,
                mouseIncidence: 10,
                debug: false

            }
            var jelly = new Jelly('#' + this.id, options);
            var startX, startY, dx, dy, endX = 0,
                endY = 0,
                x = 0,
                y = 0,
                lastX = 0,
                lastY = 0;
            var down = false;
            var shakeLimit = 5;
            let container = this.$refs['canvas']

            document.addEventListener('mousemove', function(e) {
                if (down) {
                    x = e.clientX - startX;
                    y = e.clientY - startY;
                    container.style.transform = 'translate(' + (endX + x) + 'px, ' + (endY + y) + 'px)';

                    dx = x - lastX;
                    dy = y - lastY;
                    if (dx > shakeLimit || dx < -shakeLimit) dx = dx < 0 ? -shakeLimit : shakeLimit;
                    if (dy > shakeLimit || dy < -shakeLimit) dy = dy < 0 ? -shakeLimit : shakeLimit;

                    // The `shake` function will "move" the half of the points (alternately) the distance defined
                    jelly.shake({ x: -dx, y: -dy });

                    lastX = x;
                    lastY = y;
                }
            });

            function mouseUp() {
                if (down) {
                    down = false;
                    endX += x;
                    endY += y;
                }
            }


            document.addEventListener('mouseout', function(e) {
                if (e.target.nodeName == 'HTML') {
                    mouseUp();
                }
            });
        }
    }
}
</script>