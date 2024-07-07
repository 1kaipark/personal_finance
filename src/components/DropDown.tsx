import React, { useState } from "react";

interface Props {
  items: string[];
  defaultText: string;
  onItemClick: (index: number, item: string) => void;
}

const DropDown: React.FC<Props> = ({ items, defaultText, onItemClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedText, setSelectedText] = useState(defaultText);

  const handleItemClick = (index: number, item: string) => {
    setSelectedIndex(index);
    setSelectedText(item);
    onItemClick(index, item); // Call the prop callback with index and item
  };

  return (
    <div className="dropdown" data-bs-theme="dark">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="month-select"
      >
        {selectedText}
      </button>
      <ul className="dropdown-menu">
        {items.map((item, index) => (
          <li key={index}>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleItemClick(index, item)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
