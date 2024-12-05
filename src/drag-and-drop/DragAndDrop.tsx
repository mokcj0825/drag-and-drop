import React, {useState} from "react";
import {Column, Item} from "./Column.tsx";


export const DragAndDrop: React.FC = () => {

  const [columns, setColumns] = useState<Record<string, Item[]>>({
    column1: [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
      { id: '4', name: 'Item 4' },
      { id: '5', name: 'Item 5' },
      { id: '6', name: 'Item 6' },
      { id: '7', name: 'Item 7' },
      { id: '8', name: 'Item 8' },
      { id: '9', name: 'Item 9' },
      { id: '10', name: 'Item 10' },
    ],
    column2: [
      { id: '11', name: 'Item 11' },
      { id: '12', name: 'Item 12' },
      { id: '13', name: 'Item 13' },
      { id: '14', name: 'Item 14' },
      { id: '15', name: 'Item 15' },
      { id: '16', name: 'Item 16' },
      { id: '17', name: 'Item 17' },
      { id: '18', name: 'Item 18' },
      { id: '19', name: 'Item 19' },
      { id: '20', name: 'Item 20' },
    ],
  });

  const handleDrop = (item: Item, targetColumnId: string, targetIndex: number) => {
    setColumns((prevColumns) => {
      const sourceColumnId = Object.keys(prevColumns).find((key) =>
        prevColumns[key].some((i) => i.id === item.id)
      );

      if (!sourceColumnId) return prevColumns;

      const sourceItems = [...prevColumns[sourceColumnId]];
      const itemIndex = sourceItems.findIndex((i) => i.id === item.id);

      // Remove the item from its original position
      const [movedItem] = sourceItems.splice(itemIndex, 1);

      if (sourceColumnId === targetColumnId) {
        // Handle rearranging within the same column
        sourceItems.splice(targetIndex, 0, movedItem);
        return {
          ...prevColumns,
          [sourceColumnId]: sourceItems,
        };
      }

      // Handle moving to a different column
      const targetItems = [...prevColumns[targetColumnId]];
      targetItems.splice(targetIndex, 0, movedItem);

      return {
        ...prevColumns,
        [sourceColumnId]: sourceItems,
        [targetColumnId]: targetItems,
      };
    });
  };

  const handleLogLists = () => {
    console.log("Column 1:", columns.column1);
    console.log("Column 2:", columns.column2);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '10px', maxHeight: '50vh'}}>
      <Column
        id="column1"
        title="Column 1"
        items={columns.column1}
        onDrop={handleDrop}
      />
      <Column
        id="column2"
        title="Column 2"
        items={columns.column2}
        onDrop={handleDrop}
      />
      <button onClick={handleLogLists} style={{marginTop: "20px"}}>
        Log Columns
      </button>
    </div>
  );

}