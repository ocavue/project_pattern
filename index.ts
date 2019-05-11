import Konva from 'konva'
import * as _ from 'lodash'
import FontFaceOnload from 'fontfaceonload'
import { Draggable } from '@shopify/draggable'
import CHARS from './icons'

const SIZE = 256
const MARGIN_X = SIZE * 2
const MARGIN_Y = SIZE * 1

class Canvas {
    width: number
    height: number
    stage: Konva.Stage
    layer: Konva.Layer
    clones: object
    selected: Konva.Shape | null

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
        this.selected = null
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

        this.insertDefaultIcons()
        await this.loadFontAwesome()
        // add the shape to the layer
        stage.add(layer);

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
        document.addEventListener('keydown', e => {
            if (e.keyCode === 8 && this.selected) {
                this.deleteIcon(this.selected)
            }
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

    insertIcon(
        char: string,
        x: number,
        y: number,
        rotation?: number,
    ) {
        let shape: Konva.Shape
        shape = new Konva.Text({
            x: x,
            y: y,
            text: char,
            fontFamily: "FontAwesome",
            fontSize: 32,
            width: 32,
            height: 32,
            draggable: true,
            fill: 'white',
            align: 'center',
            verticalAlign: 'center',
            rotation: rotation ? rotation : 0,
        })
        shape.id(String(Date.now() + Math.random()) + char)
        shape.on(
            'click tap mouseup', e => {
                this.removeTransformers()
                this.drawClones(shape)
                this.createTransformer(shape)
                this.layer.draw()
            }
        )
        this.layer.add(shape)
    }

    deleteIcon(shape: Konva.Shape) {
        delete this.clones[shape.id()]
        shape.destroy()
        this.removeTransformers()
        this.layer.draw()
        this.refreshBackground()
    }

    insertDefaultIcons() {
        _.range(16).map((index) => this.insertIcon(
            CHARS[index],
            10 + 64 * Math.floor(index % 4) + 4 * index,
            10 + 64 * Math.floor(index / 4),
            index * 10,
        ))
    }

    findTransformers() {
        let finded: any = this.stage.find('Transformer')
        return finded
    }

    createTransformer(shape: Konva.Shape) {
        console.log('createTransformer shape:', shape)
        this.selected = shape

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
        this.selected = null
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

    let draggable = new Draggable(sidebar)
    let x: number, y: number
    draggable.on('drag:move', (event) => {
        x = event.data.sensorEvent.clientX
        y = event.data.sensorEvent.clientY
    })
    draggable.on('drag:stop', (event) => {
        if (
            MARGIN_X < x && x < MARGIN_X + SIZE &&
            MARGIN_Y < y && y < MARGIN_Y + SIZE
        ) {
            let char = event.data.source.innerText
            canvas.insertIcon(
                char,
                x - MARGIN_X - 16,
                y - MARGIN_Y - 16,
            )
            canvas.layer.draw()
            canvas.refreshBackground()
        }
        [x, y] = [0, 0]
    });
}

function setupContainer() {
    document.getElementById('container').style.marginLeft = `${MARGIN_X}px`
    document.getElementById('container').style.marginTop = `${MARGIN_Y}px`
}

async function main() {
    setupContainer()

    let c = new Canvas(SIZE, SIZE)
    c.draw()

    setupSidebar(c)
}

main()
