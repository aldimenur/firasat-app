import React from "react";

function Modal({ DeleteTodos, selectedData, setIsDialog, isDialog }: any) {
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 100,
      }}
    >
      <div
        style={{
          position: "absolute",
          float: "left",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="bg-white p-2 rounded-md">
          <h1 style={{ color: "black" }}>
            Apakah anda yakin ingin menghapus{" "}
            <span className="font-bold">{selectedData.title}</span>
          </h1>
          <br />
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                DeleteTodos(selectedData["_id"]);
                setIsDialog(!isDialog);
              }}
              style={{
                backgroundColor: "red",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              Delete
            </button>
            <button
              onClick={() => setIsDialog(!isDialog)}
              style={{
                backgroundColor: "blue",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
