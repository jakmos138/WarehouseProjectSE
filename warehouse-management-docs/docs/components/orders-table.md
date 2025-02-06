# Orders Table Component

## **Overview**
The **Orders Table Component** is responsible for displaying a list of warehouse orders, their stock availability, delivery status, and processing time. It retrieves **real-time data** from the backend and allows users to interact with the inventory.

## **Structure**
The **Orders Table** consists of:  
- **Table Headers**: Displays column names such as Product Name, Availability, Delivery Status, Price, and Processing Time.  
- **Order Rows**: Each row represents an item, showing its current status and stock availability.  
- **Delete Button**: Allows removal of an order (currently a static button).

## **Code Implementation**
- **CSS File:** `OrdersTable.css`  
  - Defines **table styling**, including border, padding, and color scheme.
  - Uses **grid layout** for aligning rows and columns.
  - Highlights stock availability with different colors (`green` for in stock, `orange` for out of stock).
- **TSX File:** `OrdersTable.tsx`  
  - Fetches **order data from the backend API (`http://localhost:3000/items/`)**.
  - Uses **React’s `useEffect` and `useState` hooks** to update the table dynamically.
  - Imports and renders multiple **Order Components** to display individual rows.

## **Order Component**
Each order row in the table is handled by the **Order Component**, which:  
- Dynamically updates **availability status** based on inventory.  
- Uses a **button** with a red hover effect (`delete-btn`) to allow users to remove orders.

## **Usage**
The `OrdersTable` component is used in:
- **Orders Page** (`orders.md`), where users can manage inventory and track item statuses.
