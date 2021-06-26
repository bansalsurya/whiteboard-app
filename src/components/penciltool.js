import React, { useLayoutEffect, useState, useRef } from "react";

var pos = { x: 0, y: 0 };

const Pentool = () => {
  const [points, setPoints] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const contextRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    contextRef.current = ctx;

    points.forEach((ele) => {
      contextRef.current.lineTo(ele.x, ele.y);
      contextRef.current.stroke();
    });
  }, [points]);

  const startDrawing = (event) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    pos.x = clientX;
    pos.y = clientY;
  };
  const finishDrawing = () => {
    setDrawing(false);
  };
  const draw = (event) => {
    if (!drawing) return;

    setPoints((state) => [...state, pos]);
    contextRef.current.moveTo(pos.x, pos.y);

    const { clientX, clientY } = event;
    pos.x = clientX;
    pos.y = clientY;
  };
  return (
    <div>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerWidth}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      >
        Canvas
      </canvas>
    </div>
  );
};
export default Pentool;
