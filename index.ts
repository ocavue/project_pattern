import Konva from 'konva'

function findTransformers(stage: Konva.Stage) {
    let finded: any = stage.find('Transformer')
    return finded
}

function removeTransformers(stage: Konva.Stage) {
    console.log('removeTransformers')
    findTransformers(stage).destroy()
}

function createTransformer(shape: Konva.Shape, layer: Konva.Layer) {
    console.log('createTransformer shape:', shape)

    var t = new Konva.Transformer({
        centeredScaling: true,
        // rotateAnchorOffset: 20,
        // keepRatio: true,
        enabledAnchors: ['bottom-left'],
    });

    layer.add(t);
    t.attachTo(shape);
}

function refreshBackground(stage: Konva.Stage) {
    console.log('refreshBackground')
    let ts = findTransformers(stage)
    ts.hide()
    let dataURL = stage.toDataURL({});
    console.debug('dataURL:', dataURL)
    document.body.style.backgroundImage = `url(${dataURL})`
    ts.show()
}

let shapeIndex = -1
function makeShape(): Konva.Shape {
    shapeIndex += 1
    return new Konva.Path({
        y: 50 + 80 * Math.floor(shapeIndex % 5),
        x: 50 + 80 * Math.floor(shapeIndex / 5),
        data:
            `M 0.000 20.000
             L 23.511 32.361
             L 19.021 6.180
             L 38.042 -12.361
             L 11.756 -16.180
             L 0.000 -40.000
             L -11.756 -16.180
             L -38.042 -12.361
             L -19.021 6.180
             L -23.511 32.361
             L 0.000 20.000`,
        fill: 'lightsteelblue',
        scale: {
            x: 1,
            y: 1,
        },
        draggable: true,
    });
}

function main() {
    let stage = new Konva.Stage({
        container: 'container',
        width: 512,
        height: 512
    });

    let layer = new Konva.Layer();

    let shapes: Konva.Shape[] = []
    for (let i = 0; i < 20; i++) {
        shapes.push(makeShape())
    }
    for (let shape of shapes) {
        layer.add(shape)
    }
    stage.add(layer);
    layer.draw();
    refreshBackground(stage)

    for (let shape of shapes) {
        shape.on('click tap mouseup', e => {
            removeTransformers(stage)
            createTransformer(shape, layer)
            layer.draw()
        })
    }
    stage.on('click tap', e => {
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            removeTransformers(stage)
            layer.draw();
            return;
        }
    })
    stage.on('mouseup', e => {
        refreshBackground(stage)
    })

}

main()