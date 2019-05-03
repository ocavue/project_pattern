import Konva from 'konva'


function main() {
    let stage = new Konva.Stage({
        container: 'container',
        width: 512,
        height: 512
    });

    let layer = new Konva.Layer();

    let shape: Konva.Shape
    shape = new Konva.Path({
        x: 100,
        y: 100,
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

    layer.add(shape);
    stage.add(layer);
    layer.draw();

    stage.on('click tap mouseup', function (e) {
        // if click on empty area - remove all transformers
        if (e.target === stage) {
            let finded: any = stage.find('Transformer')
            finded.destroy();
            layer.draw();
            return;
        }

        // remove old transformers
        // TODO: we can skip it if current rect is already selected
        let finded: any = stage.find('Transformer')
        finded.destroy();

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
    });
}

main()