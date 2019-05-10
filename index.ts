import Konva from 'konva'
import * as _ from 'lodash'
import FontFaceOnload from 'fontfaceonload'
import { Draggable } from '@shopify/draggable'
import CHARS from './icons'

class Canvas {
    width: number
    height: number
    stage: Konva.Stage
    layer: Konva.Layer
    clones: object

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.stage = new Konva.Stage({
            container: 'container',
            width: width,
            height: height,
        });

        this.layer = new Konva.Layer();
        this.clones = {}
    }

    loadFontAwesome(): Promise<void> {
        return new Promise((resolve, reject) => {
            FontFaceOnload("FontAwesome", {
                success: () => {
                    resolve()
                },
                error: () => {
                    alert('Failed to load FontAwesome')
                },
                timeout: 120 * 1000 // in ms. Optional, default is 10 seconds
            })
        })
    }

    async draw() {
        let stage = this.stage
        let layer = this.layer

        let shapes: Konva.Shape[] = _.range(25).map((i) => this.makeShape(i))
        await this.loadFontAwesome()
        // add the shape to the layer
        shapes.map(shape => layer.add(shape))
        shapes.map(shape => shape.on(
            'click tap mouseup', e => {
                this.removeTransformers()
                this.createTransformer(shape)
                layer.draw()
            }
        ))

        stage.add(layer);

        for (let shape of shapes) {
            shape.on('click tap mouseup', e => {
                this.removeTransformers()
                this.drawClones(shape)
                this.createTransformer(shape)
                layer.draw()
            })
        }
        stage.on('click tap', e => {
            // if click on empty area - remove all transformers
            if (e.target === stage) {
                this.removeTransformers()
                layer.draw();
                return;
            }
        })
        stage.on('mouseup', e => {
            this.refreshBackground()
        })

        // Hide layout at fist, so that the brower will not show those squares since font-awesome hasn't been loaded yet.

        this.refreshBackground()
        layer.draw()
    }

    drawClones(shape: Konva.Shape): void {
        let size = this.getSize(shape)
        for (let clone of this.clones[shape.id()] || []) {
            clone.destroy()
        }
        this.clones[shape.id()] = []

        let bewteen = (a: number, x: number, b: number) => a < x && x < b

        for (let dx of [-this.width, 0, +this.width]) {
            for (let dy of [-this.height, 0, +this.height]) {
                if (dx === 0 && dy === 0) continue
                let y1 = size.top + dy
                let x1 = size.left + dx
                let x2 = size.right + dx
                let y2 = size.bottom + dy


                let points = []
                for (let x of [x1, x2]) {
                    for (let y of [y1, y2]) {
                        points.push([x, y])
                    }
                }

                for (let [x, y] of points) {
                    if (bewteen(0, x, this.width) && bewteen(0, y, this.height)) {
                        let clone = shape.clone({ x: x1, y: y1, draggable: false })
                        this.clones[shape.id()].push(clone)
                        this.layer.add(clone)
                        this.layer.draw()
                        break
                    }
                }
            }
        }

        let emptyKeys = Object.keys(this.clones).filter((key) => !this.clones[key])
        for (let key of emptyKeys) {
            delete this.clones[key]
        }
        console.log('clones:', this.clones)
    }

    getSize(shape: Konva.Shape): { left: number, top: number, right: number, bottom: number } {
        let position = shape.position()
        let [left, top] = [position.x, position.y]
        let right = left + shape.size().width * shape.scale().x
        let bottom = top + shape.size().height * shape.scale().y
        return { left, top, right, bottom, }
    }

    makeShape(index: number): Konva.Shape {
        let shape: Konva.Shape
        shape = new Konva.Text({
            x: 10 + 102 * Math.floor(index % 5),
            y: 10 + 102 * Math.floor(index / 5),
            // text: "\uf641",
            text: CHARS[index],
            fontFamily: "FontAwesome",
            fontSize: 60,
            width: 60,
            height: 60,
            draggable: true,
            fill: 'white',
            // stroke: 'red',
        })
        shape.id(String(Date.now() + index + Math.random()))
        return shape
    }

    findTransformers() {
        let finded: any = this.stage.find('Transformer')
        return finded
    }

    createTransformer(shape: Konva.Shape) {
        console.log('createTransformer shape:', shape)

        var t = new Konva.Transformer({
            centeredScaling: true,
            rotateAnchorOffset: 0,
            // keepRatio: true,
            enabledAnchors: ['bottom-left'],
        });

        this.layer.add(t);
        t.attachTo(shape);
    }

    removeTransformers() {
        console.log('removeTransformers')
        this.findTransformers().destroy()
    }

    refreshBackground() {
        console.log('refreshBackground')
        let ts = this.findTransformers()
        ts.hide()
        let dataURL = this.layer.toDataURL({});
        console.debug('dataURL:', dataURL)
        document.body.style.backgroundImage = `url(${dataURL})`
        ts.show()
    }
}

function setupSidebar(canvas: Canvas) {
    let sidebar = document.getElementById('sidebar')

    // Add icons
    for (let char of CHARS) {
        let icon = document.createElement('span');
        icon.innerHTML = char
        icon.classList.add('draggable-source')
        icon.onclick = () => alert('clicked')
        sidebar.appendChild(icon)
    }

    let icons = new Draggable(sidebar)

    let x: number, y: number
    icons.on('drag:move', (event) => {
        x = event.data.sensorEvent.clientX
        y = event.data.sensorEvent.clientY
    })
    icons.on('drag:stop', (event) => {
        if (512 < x && x < 1024 && 512 < y && y < 1024) {
            console.log('IN')
            let shape = canvas.makeShape(0)  // TODO
            shape.setAttr('x', x - 512)
            shape.setAttr('y', y - 512)
            canvas.layer.add(shape)
            canvas.layer.draw()
            canvas.refreshBackground()
        } else {
            console.log('OUT')
        }
        [x, y] = [0, 0]
    });
}

async function main() {
    let c = new Canvas(512, 512)
    c.draw()

    setupSidebar(c)
}

main()
