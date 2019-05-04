import Konva from 'konva'
import * as _ from 'lodash'

let svgs = [
    require('@fortawesome/fontawesome-free/svgs/solid/ad.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/address-book.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/address-card.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/adjust.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/air-freshener.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/align-center.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/align-justify.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/align-left.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/align-right.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/allergies.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/ambulance.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/american-sign-language-interpreting.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/anchor.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/angle-double-down.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/angle-double-left.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/angle-double-right.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/angle-double-up.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/angle-down.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/angle-left.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/angle-right.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/angle-up.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/angry.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/ankh.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/apple-alt.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/archive.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/archway.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-alt-circle-down.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-alt-circle-left.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-alt-circle-right.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-alt-circle-up.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-circle-down.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-circle-left.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-circle-right.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-circle-up.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-down.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrow-up.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrows-alt-h.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrows-alt-v.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/arrows-alt.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/assistive-listening-systems.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/asterisk.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/at.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/atlas.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/atom.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/audio-description.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/award.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/baby-carriage.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/baby.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/backspace.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/backward.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bacon.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/balance-scale.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/ban.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/band-aid.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/barcode.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bars.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/baseball-ball.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/basketball-ball.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bath.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/battery-empty.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/battery-full.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/battery-half.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/battery-quarter.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/battery-three-quarters.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bed.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/beer.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bell-slash.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bell.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bezier-curve.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bible.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bicycle.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/binoculars.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/biohazard.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/birthday-cake.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/blender-phone.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/blender.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/blind.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/blog.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bold.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bolt.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bomb.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bone.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bong.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/book-dead.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/book-medical.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/book-open.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/book-reader.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/book.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bookmark.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bowling-ball.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/box-open.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/box.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/boxes.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/braille.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/brain.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/bread-slice.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/briefcase-medical.svg'),
    require('@fortawesome/fontawesome-free/svgs/solid/briefcase.svg'),
]


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

function refreshBackground(stage: Konva.Stage, layer: Konva.Layer) {
    console.log('refreshBackground')
    let ts = findTransformers(stage)
    ts.hide()
    let dataURL = layer.toDataURL({});
    console.debug('dataURL:', dataURL)
    document.body.style.backgroundImage = `url(${dataURL})`
    ts.show()
}

function makeShape(index: number, layer: Konva.Layer, stage: Konva.Stage): Promise<Konva.Shape> {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.src = svgs[index]
        img.onerror = reject
        img.onload = function () {
            let shape: Konva.Shape
            shape = new Konva.Image({
                x: 50 + 30 * Math.floor(index % 10),
                y: 50 + 30 * Math.floor(index / 10),
                image: img,
                width: 20,
                height: 20,
                draggable: true,
                // stroke: 'red',
            });
            console.debug('shape created')
            resolve(shape)
        }
    })
}

async function main() {
    let stage = new Konva.Stage({
        container: 'container',
        width: 512,
        height: 512
    });

    let layer = new Konva.Layer();

    let shapes: Konva.Shape[] = await Promise.all(
        _.range(100).map((i) => makeShape(i, layer, stage))
    )
    // add the shape to the layer
    shapes.map(shape => layer.add(shape))
    shapes.map(shape => shape.on(
        'click tap mouseup', e => {
            removeTransformers(stage)
            createTransformer(shape, layer)
            layer.draw()
        }
    ))


    console.log('ccc')
    layer.draw()

    stage.add(layer);
    layer.draw();
    refreshBackground(stage, layer)

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
        refreshBackground(stage, layer)
    })

}

main()
