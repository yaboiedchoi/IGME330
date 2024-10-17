const drawLine = (ctx, x1, y1, x2, y2) => {

    ctx.save();
    // draw line with style black, 
    // and 1 pixel width
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    // path
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();

    // draw line
    ctx.stroke();

    ctx.restore();
}

const drawShape = (ctx, shapes) => {
    // iterate through the selected shape
    for (let i = 0; i < shapes.length; i++) {
        // draw line using the shapes' coordinates, where i is
        // line number and 0-3 is the coordinate
        drawLine(ctx, 
            shapes[i][0], 
            shapes[i][1], 
            shapes[i][2], 
            shapes[i][3]);
    }
}

// export drawShape
export {drawShape};