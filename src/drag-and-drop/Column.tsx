import React, {useState} from "react";

export type Item = {
  id: string;
  name: string;
}

type ColumnProps = {
  id: string;
  title: string;
  items: Item[];
  onDrop: (item: Item, fromColumnId: string, targetIndex: number) => void;
}

export const Column: React.FC<ColumnProps> = ({ id, title ,items, onDrop}) => {

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const mouseY = event.clientY;
    const newIndex = calculateDropIndex(mouseY, items);
    setHoverIndex(newIndex);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const itemData = event.dataTransfer.getData('text/plain');
    const item: Item = JSON.parse(itemData);

    //const targetIndex = calculateDropIndex(event.clientY, items);
    const targetIndex = hoverIndex ?? items.length;

    onDrop(item, id, targetIndex);
    setHoverIndex(null);
  }

  const handleDragLeave = () => {
    setHoverIndex(null);
  };

  const calculateDropIndex = (mouseY: number, items: Item[]): number => {
    for (let i = 0; i < items.length; i++) {
      const itemElement = document.getElementById(items[i].id);
      if (itemElement) {
        const rect = itemElement.getBoundingClientRect();
        if (mouseY < rect.top + rect.height / 2) {
          return i;
        }
      }
    }

    return items.length;
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      style={{
        flex: 1,
        padding: '10px',
        border: '1px solid black',
        margin: '10px',
        minHeight: '200px',
        maxHeight: '50vh',
        width: '500px',
        overflow: 'auto',
      }}
    >
      <h3>{title}</h3>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {hoverIndex === index && (
            <div
              style={{
                height: "2px",
                backgroundColor: "blue",
                margin: "5px 0",
              }}
            />
          )}
          <div
            id={item.id}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("text/plain", JSON.stringify(item));
            }}
            style={{
              padding: "5px",
              margin: "5px 0",
              backgroundColor: "#202020",
              border: "1px solid #ccc",
              cursor: "grab",
              height: "50px",
            }}
          >
            {item.name}
          </div>
        </React.Fragment>
      ))}
      {hoverIndex === items.length && (
        <div
          style={{
            height: "10px",
            backgroundColor: "blue",
            margin: "5px 0",
          }}
        />
      )}
    </div>
  );
}