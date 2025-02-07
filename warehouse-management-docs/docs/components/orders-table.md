# Orders Page

## **Overview**
The **Orders Page** is where users can **view, manage, and track warehouse orders**. It displays a table of orders and their corresponding **stock availability, processing time, and delivery status**.

## **Structure**
- **Orders Table**: Displays all **current orders**, fetched from the database.
- **Status Indicators**: Color-coded labels for **stock availability**.
- **Action Buttons**: Allows users to **manage orders** with:
  - **Create Item**: Adds new inventory items.
  - **Edit Item**: Modifies existing inventory items.
  - **Delete Item**: Removes items from the system.

## **Code Implementation**
- **TSX File:** `Orders.tsx`
  - Imports and renders the `OrdersTable` component.
  - Uses **React’s state hooks (`useState`)** to track order modifications.
  - Handles **CRUD (Create, Read, Update, Delete)** operations.

## **New Feature: Edit Item**
The **Edit Item** functionality allows users to update warehouse stock information.  
- Clicking the **"Edit" button** opens a modal where users can update item details.  
- Users can modify:  
  - **Location ID**  
  - **Details**  
  - **Quantity**  
  - **Restricted Level**  
- The updated item is **sent to the backend via an API request (`PUT /items/{id}`)**.

## **Usage**
The `OrdersTable` component is used in:  
- **Orders Page** (`orders.md`), where users can manage inventory and track item statuses.  
- The `CreateItem` and `EditItem` modals allow warehouse staff to **add or update stock details** efficiently.