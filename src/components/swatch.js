import React from "react";

export default function Swatch({ setToolType }) {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div>
            <button
              title="Pencil"
              onClick={() => {
                setToolType("pencil");
              }}
            >
              Pencil
            </button>
            <button
              title="Line"
              onClick={() => {
                setToolType("line");
              }}
            >
              Line
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
