import Konva from 'konva'


function main() {
    let stage = new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight
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
        }
    });
    shape.draggable(true)

    layer.add(shape);
    stage.add(layer);
}

main()