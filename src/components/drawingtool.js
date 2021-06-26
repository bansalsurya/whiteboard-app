import React, { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

const gen = rough.generator();

function createElement(x1, y1, x2, y2) {
  const roughEle = gen.line(x1, y1, x2, y2);
  return { x1, y1, x2, y2, roughEle };
}

const DrawingTool = () => {
  //creating a state of a shape element which is initially empty
  const [elements, setElements] = useState([]);
  //creating a state of drawing which is initially false
  const [drawing, setDrawing] = useState(false);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    //clearing the screen everytime it's re-rendered
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rc = rough.canvas(canvas);

    //performs a specified action for each element in the array
    elements.forEach((ele) => rc.draw(ele.roughEle));
  }, [elements]);

  const startDrawing = (event) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    const newEle = createElement(clientX, clientY, clientX, clientY);
    setElements((state) => [...state, newEle]); //copying to the previous state
  };
  const finishDrawing = () => {
    setDrawing(false);
  };
  const draw = (event) => {
    if (!drawing) return; //not in a mousedown postion

    const { clientX, clientY } = event;
    console.log(clientX, clientY);
    const index = elements.length - 1; //last element of the array "elements"
    const { x1, y1 } = elements[index];
    const updatedEle = createElement(x1, y1, clientX, clientY);

    //update the position with the new element instead of the previous one

    const copyElement = [...elements];
    copyElement[index] = updatedEle; //replacing last index
    setElements(copyElement);
  };
  return (
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
  );
};
export default DrawingTool;
