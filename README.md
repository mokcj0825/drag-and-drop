# Drag-and-Drop Demonstration

This project is a simple demonstration of implementing drag-and-drop functionality in React using TypeScript. It showcases how items can be dynamically managed and moved between columns in an intuitive drag-and-drop interface.

## Features

- **Interactive Drag-and-Drop**: Drag items between columns with smooth handling.
- **Reusable Components**: Modular design with components like `Column` and `DragAndDrop`.
- **State Management**: Centralized state for managing columns and items using React hooks.

## File Overview

### 1. `App.tsx`
The entry point of the demonstration. It renders the main UI by including the `DragAndDrop` component.

### 2. `DragAndDrop.tsx`
The core component of the demonstration, responsible for managing the drag-and-drop behavior.

Key Highlights:
- Manages the `columns` state, which maps column IDs to their items.
- Renders multiple `Column` components, each representing a group of draggable items.
- Handles drag-and-drop logic, including updating the state when items are moved between columns.

### 3. `Column.tsx`
A reusable component representing an individual column in the interface.

Key Highlights:
- Accepts props for column data (ID, title, items) and drag-and-drop event handlers.
- Provides visual feedback during drag-and-drop operations using local state.