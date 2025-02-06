# Orders Table Component

## **Overview**
The **Orders Table Component** is responsible for **displaying warehouse inventory data** and allowing users to **add or delete items**. It fetches **real-time data** from the backend and updates dynamically.

## **Structure**
The **Orders Table** consists of:  
- **Table Headers**: Displays column names such as **Product Name, Availability, Delivery Status, Price, and Action**.  
- **Order Rows**: Each row represents an item with its **description, price, and stock location**.  
- **Delete Button**: Allows users to **remove an item** from the inventory.  
- **Create Item Button**: Opens a modal for adding new inventory items.

## **Code Implementation**
- **CSS File:** `OrdersTable.css`
  - Defines **table styling**, including border, padding, and color scheme.
  - Uses **grid layout** for aligning rows and columns.
  - Highlights stock availability with different colors (`green` for in stock, `orange` for out of stock).

- **TSX File:** `OrdersTable.tsx`
  - **Fetches order data** from the backend API (`http://localhost:3000/api/items/`).
  - Uses **React’s `useEffect` and `useState` hooks** to update the table dynamically.
  - **Implements the `CreateItem` component**, allowing users to add new items.
  - **Handles item deletion** via `deleteItem(itemId)`, which makes an API request to remove the item.

## **New Feature: Create Item**
The `CreateItem` component allows users to **add new warehouse items** using a modal form.  
- Clicking **"Create Item"** opens the modal.
- Users enter **Item ID, Location, Details, Quantity, and Restricted Level**.
- The item is **sent to the backend** and added to the table dynamically.

## **Usage**
The `OrdersTable` component is used in:  
- **Orders Page** (`orders.md`), where users can manage inventory and track item statuses.