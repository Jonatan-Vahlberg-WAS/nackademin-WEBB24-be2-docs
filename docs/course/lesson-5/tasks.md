---
sidebar_position: 5
title: Uppgifter
---

import CollapsibleCard from "@site/src/components/_library/CollapsibleCard/TWCollapsibleCard";

<CollapsibleCard title="Uppgift 1 - Types">

- Skapa en typ för **Person**:
    - Den ska ha egenskaperna: `firstName` (string), `lastName` (string), `phoneNumber` (string) och `address` (string), `type` (customer)
    - Den ska ha en metod `call` som inte tar några parametrar och inte returnerar något (`() => void`).
- Skapa en typ för **Employee**:
    - Den ska baseras på **Person**typen.
    - Den ska ha egenskaperna: `id` (string), `jobTitle` (string) och `hasKeys` (boolean) `type` (employee).
- Skapa en typ för **Product**:
    - Den ska ha egenskaperna: `EAN` (string), `name` (string), `description` (string), `stock` (number) och `price` (number).
    - Den kan också ha en optional egenskap `salePrice` (number).
- Skapa en typ för **Store**:
    - Den ska ha egenskaperna: `employees` (array av `Employee`), `products` (array av `Product`), `address` (string) och `id` (string).
    - Den kan också ha en optional egenskap `businessNumber` (string).
</CollapsibleCard>

<CollapsibleCard title="Uppgift 2 - Optional och functions">

1. Skapa en funktion som genererar en person: customer eller employee.
2. Skapa en funktion som genererar produkter med olika egenskaper.
3. Skapa en funktion som genererar en butik med specifika produkter och anställda.
4. Skapa en funktion där en person försöker köpa en produkt och hanterar olika scenarios, såsom att produkten är slutsåld.

### Förväntad utdata

| **Funktion** | **Parametrar** | **Förväntad utdata** |
| --- | --- | --- |
| `createPerson` | `{ type: 'customer' }` | `Ok: Customer created` |
| `createPerson` | `{ type: 'employee' }` | `Ok: Employee created` |
| `createProduct` | `{ name: 'Laptop', price: 1500, stock: 10 }` | `Ok: Product Laptop created` |
| `createProduct` | `{ name: 'Phone', price: 800, salePrice: 700, stock: 5 }` | `Ok: Product Phone created` |
| `createStore` | `{ products: [product1, product2], employees: [employee1] }` | `Ok: Store created with products and employees` |
| `purchaseProduct` | `{ person: customer, product: productOutOfStock, store: store }` | `Error: Product out of stock` |
| `purchaseProduct` | `{ person: customer, product: productInStock, store: store }` | `Ok: Purchase successful` |
| `purchaseProduct` | `{ person: employee, product: productInStock, store: store }` | `Ok: Purchase successful` |
</CollapsibleCard>

<CollapsibleCard title="Slutuppgift - API">

Hitta ett API som ni kommer åt (eget, publikt eller som ni har nycklar till) skapa ett typescript projekt som kan hämta denna data och kan se till att det blir type safe. Ibland har API:er mycket mer info än det som vi vill använda då får man vara lite smart och skriva types för den datan vi vill åt

[Lista på öppna API](https://github.com/public-apis/public-apis) (Välj dem som har Auth No för helt publika)

Ett exempel https://openlibrary.org/dev/docs/api/

**Extra:**

Hitta sätt att manipulera datan eller göra jämförelser som kräver vetskap om hur datan ser ut.
</CollapsibleCard>