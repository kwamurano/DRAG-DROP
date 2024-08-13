import React, { useState } from "react";
import "./App.css";

function App() {
  const [leftItems, setLeftItems] = useState([
    "List Item 1",
    "List Item 2",
    "List Item 3",
    "List Item 4",
  ]);
  const [rightItems, setRightItems] = useState([]);

  const handleDragStart = (e, item, index, box) => {
    e.dataTransfer.setData("text/plain", item);
    e.dataTransfer.setData("fromBox", box);
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, targetBox) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");
    const fromBox = e.dataTransfer.getData("fromBox");
    const fromIndex = e.dataTransfer.getData("index");

    if (fromBox === targetBox) {
      const items = targetBox === "left" ? [...leftItems] : [...rightItems];
      items.splice(fromIndex, 1);
      const dropIndex = Array.from(e.target.parentNode.children).indexOf(
        e.target
      );
      items.splice(dropIndex, 0, item);

      if (targetBox === "left") {
        setLeftItems(items);
      } else {
        setRightItems(items);
      }
    } else {
      if (targetBox === "right") {
        setLeftItems(leftItems.filter((i) => i !== item));
        setRightItems([...rightItems, item]);
      } else {
        setRightItems(rightItems.filter((i) => i !== item));
        setLeftItems([...leftItems, item]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div
        id="left"
        className="box"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "left")}
      >
        {leftItems.map((item, index) => (
          <div
            key={index}
            className="list"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item, index, "left")}
          >
            <img src="drag_drop_icon.png" alt="drag icon" /> {item}
          </div>
        ))}
      </div>
      <div
        id="right"
        className="box"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "right")}
      >
        {rightItems.map((item, index) => (
          <div
            key={index}
            className="list"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item, index, "right")}
          >
            <img src="drag_drop_icon.png" alt="drag icon" /> {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
