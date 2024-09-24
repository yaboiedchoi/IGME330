export const drawRectangle = (ctx,
                              x, 
                              y, 
                              width, 
                              height, 
                              pFillStyle="black", 
                              pLineWidth=0, 
                              pStrokeStyle="black") => {
    ctx.save();

    ctx.beginPath();
    ctx.rect(x - (0.5 * width), y - (0.5 * height), width, height);
    ctx.closePath();
    ctx.fillStyle = pFillStyle;
    ctx.fill();
    ctx.lineWidth = pLineWidth;
    ctx.strokeStyle = pStrokeStyle;
    ctx.stroke();

    ctx.restore();
}

export const drawArc = (ctx,
                        x,
                        y,
                        radius,
                        pFillStyle="black",
                        pLineWidth=0,
                        pStrokeStyle="black",
                        pStartAngle=0,
                        pEndAngle=Math.PI * 2) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, pStartAngle, pEndAngle);
    ctx.closePath();
    ctx.fillStyle = pFillStyle;
    ctx.fill();
    // if outline is specified
    if (pLineWidth > 0) {
        ctx.lineWidth = pLineWidth;
        ctx.strokeStyle = pStrokeStyle;
        ctx.stroke();
    }
    ctx.restore();
}

export const drawLine = (ctx,
                         x1,
                         y1,
                         x2,
                         y2,
                         pLineWidth=1,
                         pStrokeStyle="black") => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.lineWidth = pLineWidth;
    ctx.strokeStyle = pStrokeStyle;
    ctx.stroke();
    ctx.restore();
}