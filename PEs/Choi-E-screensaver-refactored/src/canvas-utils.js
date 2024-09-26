import { getRandomInt, getRandomColor } from "./utils.js";

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

export const drawRandomRect = (ctx) => {
	drawRectangle(ctx,
                  getRandomInt(-10, 650), 
				  getRandomInt(-10, 490), 
	     		  getRandomInt(10, 30), 
				  getRandomInt(10, 30), 
				  getRandomColor(), 
				  1, 
				  "white");
}

export const drawRandomArc = (ctx) => {
	drawArc(ctx,
            getRandomInt(0, 640), // random x
			getRandomInt(0, 480), // random y
			getRandomInt(10, 100), //random radius
			getRandomColor(), //random color
			getRandomInt(0, 20), // random line width
			getRandomColor(), // random border color
			getRandomInt(0, Math.PI * 2), 
			getRandomInt(0, Math.PI * 2));
}

export const drawRandomLine = (ctx) => {
	drawLine(ctx,
             getRandomInt(0, 640), // random x1
			 getRandomInt(0, 480), // random y1
			 getRandomInt(0, 640), // random x2
			 getRandomInt(0, 480), // random y2
			 getRandomInt(1, 20), // random line width
			 getRandomColor()); // random color
}