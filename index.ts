import Konva from 'konva'

function removeTransformers(stage: Konva.Stage) {
    let finded: any = stage.find('Transformer')
    finded.destroy();
}

function refreshBackground(stage: Konva.Stage) {
    removeTransformers(stage)  // remove all transformers from stage but don't redraw layout
    let dataURL = stage.toDataURL({});
    console.log('dataURL:', dataURL)
    document.getElementById('background').style.backgroundImage = `url(${dataURL})`
}

function makeShape(): Konva.Shape {
    return new Konva.Path({
        x: Math.random() * 200 + 100,
        y: Math.random() * 200 + 100,
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
        fill: 'green',
        scale: {
            x: 2,
            y: 2,
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

    layer.add(makeShape());
    layer.add(makeShape());
    stage.add(layer);
    layer.draw();

    stage.on('click tap mouseup', function (e) {
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            removeTransformers(stage)
            layer.draw();
            return;
        }

        // remove old transformers
        // TODO: we can skip it if current rect is already selected
        removeTransformers(stage)

        // create new transformer
        var t = new Konva.Transformer({
            centeredScaling: true,
            // rotateAnchorOffset: 20,
            // keepRatio: true,
            enabledAnchors: ['bottom-left'],
        });

        layer.add(t);
        t.attachTo(e.target);
        layer.draw();

        refreshBackground(stage)
    });
}

main()