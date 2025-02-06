# Warehouse System REST API

## Request and response body syntax
The syntax used for the response structure in this document is similar to JSON, but with types instead of values, for example:
```
{
    key1: type1,
    key2: {
        subkey1: subtype1,
        subkey2: subtype2
    },
    key3: type3
}
```
The possible types are:
### `[type]`
Array of items of type `type`.
### `type?`
Item of type `type` or `null`.
### `bool`
`true` or `false`.
### `int`
Integer.
### `decimal`
Real number with precision given by digits to the right of the decimal point.
### `decimal(n)`
`decimal` with fixed precision – `n` digits to the right of the decimal point.
### `string`
String of characters.
### `timestamp`
Timestamp. *How the timestamp is passed is to be decided.*
### `object`
Generic object. Wherever possible, the full specification of the object is specified rather than `object`.

URL parameters are specified like this in a given endpoint:
`/url/:param`
All URL parameters are `int`s that correspond to resource IDs.

## Request and response structure
The response body is in JSON format. If, for example, the object's description is:
```
{
    key1: int,
    key2: string
}
```
then the following JSON data could be received for that object:
```
{
    "key1": 123,
    "key2": "Hello from API Docs"
}
```
The general form of the response body is:
```
{
    error: string?,
    data: object?
}
```
The full specification of `data` varies between requests.
`data` is not `null` if and only if a success status code other than `204 No Content` is returned.
`error` is not `null` if and only if a `4xx` or `5xx` status code is returned.

The request body follows more complex rules:

- data can be sent as `application/x-www-form-urlencoded`, `application/json` or `multipart/form-data`. For endpoints that accept files, only `multipart/form-data` is accepted;
- the request body specification never contains nested objects;
- fields not in the specification are ignored.

If, for example, the specification for a request body is:
```
{
    key1: int,
    key2: string,
    key3: int?
}
```
then the request body is expected to have `key1`, `key2`, and optionally `key3` fields. Not passing an optional field is interpreted the same as passing the field with value `null`.
Of course, the types must match.

## Success responses
The following success status codes are typically returned by endpoints with the given methods:

- `200 OK` **GET**;
- `201 Created` **POST, PUT** - the response typically contains the ID of the created resource;
- `204 No Content` **DELETE**
Exceptions from this rule are specified per endpoint.

## Error responses
The following error status codes are common for all (or most) endpoints with given request methods:

- `400 Bad Request` **POST, PUT, DELETE** - Request is malformed. Typically caused by type mismatch in URL parameters, request body, or missing required fields;
- `401 Unauthorized` - User is not logged in;
- `403 Forbidden` **POST, PUT, DELETE** - User is logged in, but does not have sufficient permissions to perform the operation. Required permissions are specified on each endpoint;
- `404 Not Found` - URL is unrecognized;
- `404 Not Found` **GET, PUT, DELETE** - For endpoints with URL parameters, requested resource does not exist;
- `409 Conflict` **POST, PUT** - Adding or updating a resource would cause an invalid state of that resource. Typically caused by a UNIQUE or FOREIGN_KEY constraint violation;
- `500 Internal Server Error` - Unexpected error during request processing. *Let's hope there won't be many of those.*

Exceptions from this rule are specified per endpoint.

## List of endpoints

### POST `/api/auth/signin`
Logs the user in. No effect if the user is already logged in.

**Request body**
```
username_or_email: string,
password: string
```
**Response**

`204 No Content` - Success.
`401 Unauthorized` - Failed login (invalid username, email or password).
`???` - User was already logged in.

### DELETE `/api/auth/signout`
Logs the user out.

**Response**
`204 No Content` - Success.
`401 Unauthorized` - User was already logged out.

### GET `/api/items`
Gets all item batches in the inventory.

**Response Data**
```
{
    items: [{
        item_index: int,
        item_type: {
            item_id: int,
            name: string,
            description: string,
            price: decimal(2),
            restricted_level: int
        },
        location: {
            location_id: int,
            name: string,
            description: string,
            restricted_level: int
        },
        details: string,
        quantity: decimal(4),
        restricted_level: int
    }]
}
```

### POST `/api/items`
Adds an item batch to the inventory.

**Required Permissions**

Create Items permission.

Cannot set a `restricted_level` for higher access than the user's own `permission_level`.

**Request Body**
```
item_id: int,
location_id: int,
details: string?,
quantity: decimal(4),
restricted_level: int
```
An item type and location with a matching `item_id` and `location_id` respectively must exist in the database.

**Response Data**

See GET `/api/items/:item_index`, where  `:item_index` is the ID of the newly defined item batch.

### GET `/api/items/:item_index`
Gets a specific item batch and all its property values.

**Response Data**
```
{
    item_index: int,
    item_type: {
        item_id: int,
        name: string,
        description: string,
        price: decimal(2),
        restricted_level: int
    },
    location: {
        location_id: int,
        name: string,
        description: string,
        restricted_level: int
    },
    details: string?,
    quantity: decimal(4),
    properties: [{
        property_id: int,
        name: string,
        type: string,
        value: string?
    }]
    restricted_level: int
}
```
The possible property `value`s depend on the property's `type`:
- `"boolean"` - `"true"` or `"false"`
- `"int"` or `"decimal"` - string representation of number
- `"string"` - any string
- `"datetime"` - string representation of number of seconds since Unix epoch (January 1st, 1970, 00:00 UTC)

### PUT `/api/items/:item_index`
Edits a specific item batch. Cannot change the batch's item type.

**Required Permissions**

Edit Items permission.

Cannot edit an item batch with a `restricted_level` for higher access than the user's own `permission_level`.

Cannot set a `restricted_level` for higher access than the user's own `permission_level`.

**Request Body**
```
location_id: int,
details: string?,
quantity: decimal(4),
restricted_level: int
```
A location with a matching `location_id` must exist in the database.

**Response Data**

See GET `/api/items/:item_index`, where  `:item_index` is the ID of the edited item batch.

### DELETE `/api/items/:item_index`
Delete a specific item batch. Cannot change the batch's item type.

**Required Permissions**

Delete Items permission.

Cannot delete an item batch with a `restricted_level` for higher access than the user's own `permission_level`.
### PUT `/api/items/:item_index/props/:property_id`
Creates/updates a property value on an item batch. The property must be assigned to the same item type as the item batch, otherwise `404 Not Found` will be returned.

**Required Permissions**

Edit Items permission.

Cannot create/update on an item batch with a `restricted_level` for higher access than the user's own `permission_level`.

**Request Body**
```
value: string
```
`value` must match the constraints of the property's `type`:

- `"boolean"` - `true`, `false`, `"true"` or `"false"`
- `"int"` - integer or its string representation
- `"decimal"` - real number or its string representation
- `"string"` - any string
- `"datetime"` - one of:
  - integer representing seconds since Unix epoch (`1970-01-01T00:00:00Z`)
  - string representation of said integer
  - string of `YYYY-MM-DDThh:mm:ssZ` format, 24-hour system, time in UTC, must not be before Unix epoch, for example: `2025-02-06T15:13:23Z`

**Response**
```
{
    value: string
}
```
### DELETE `/api/items/:item_index/props/:property_id`
Deletes a property value from an item batch. The property must be assigned to the same item type as the item batch, otherwise `404 Not Found` will be returned.

**Required Permissions**

Edit Items permission.

Cannot delete from an item batch with a `restricted_level` for higher access than the user's own `permission_level`.
### GET `/api/itemtypes`
Gets all defined item types.

**Response Data**
```
{
    item_types: [{
        item_id: int,
        name: string,
        description: string,
        price: decimal(2),
        restricted_level: int
    }]
}
```

### POST `/api/itemtypes`
Defines an item type.

**Required Permissions**

Create Item Types permission.

Cannot set a `restricted_level` for higher access than the user's own `permission_level`.

**Request Body**
```
name: string,
description: string,
price: decimal(2),
restricted_level: int
```
**Response Data**

See GET `/api/itemtypes/:item_id`, where  `:item_id` is the ID of the newly defined item type.

### GET `/api/itemtypes/:item_id`
Gets a specific item type and all its properties.

**Response Data**
```
{
    item_id: int,
    name: string,
    description: string,
    price: decimal(2),
    properties: [{
        property_id: int,
        name: string,
        description: string,
        type: string
    }]
    restricted_level: int
}
```

### PUT `/api/itemtypes/:item_id`
Edits a specific item type.

**Required Permissions**

Edit Item Types permission.

Cannot edit an item type with a `restricted_level` for higher access than the user's own `permission_level`.

Cannot set a `restricted_level` for higher access than the user's own `permission_level`.

**Request Body**
```
name: string,
description: string,
price: decimal(2),
restricted_level: int
```
**Response Data**

See GET `/api/itemtypes/:item_id`, where  `:item_id` is the ID of the edited item type.

### DELETE `/api/itemtypes/:item_id`
Delete a specific item type. *What happens if there are still items of the type in the inventory?*

**Required Permissions**

Delete Item Types permission.

Cannot delete an item type with a `restricted_level` for higher access than the user's own `permission_level`.
### POST `/api/itemtypes/:item_id/props`
Add a property to a specific item type.

**Required Permissions**

Edit Item Types permission.

Cannot add a property to an item type with a `restricted_level` for higher access than the user's own `permission_level`.

**Request Body**
```
name: string,
description: string,
type: string
```
**Response Body**
```
{
    property_id: int,
    name: string,
    description: string,
    type: string
}
```
### PUT `/api/itemtypes/props/:property_id`
Edit an item type property. Cannot change the property's type.

**Required Permissions**

Edit Item Types permission.

Cannot edit a property on an item type with a `restricted_level` for higher access than the user's own `permission_level`.

**Request Body**
```
name: string,
description: string
```
**Response Body**
```
{
    property_id: int,
    name: string,
    description: string,
    type: string
}
```
### DELETE `/api/itemtypes/props/:property_id`
Delete an item type property.

**Required Permissions**

Edit Item Types permission.

Cannot delete a property from an item type with a `restricted_level` for higher access than the user's own `permission_level`.
### GET `/api/locations`
Gets all locations.

**Response Data**
```
{
    locations: [{
        location_id: int,
        name: string,
        description: string,
        restricted_level: int
    }]
}
```

### POST `/api/locations`
Creates a location.

**Required Permissions**

Create Locations permission.

Cannot set a `restricted_level` for higher access than the user's own `permission_level`.

**Request Body**
```
name: string,
description: string,
restricted_level: int
```
**Response Data**

See GET `/api/locations/:location_id`, where  `:location_id` is the ID of the newly defined location.

### GET `/api/locations/:location_id`
Gets a specific location.

**Response Data**
```
{
    location_id: int,
    name: string,
    description: string,
    restricted_level: int
}
```

### PUT `/api/locations/:location_id`
Edits a specific location.

**Required Permissions**

Edit Locations permission.

Cannot edit a location with a `restricted_level` for higher access than the user's own `permission_level`.

Cannot set a `restricted_level` for higher access than the user's own `permission_level`.

**Request Body**
```
name: string,
description: string,
restricted_level: int
```
**Response Data**

See GET `/api/locations/:location_id`, where  `:location_id` is the ID of the edited location.

### DELETE `/api/locations/:location_id`
Delete a specific location. *What happens if there are still items in that location?*

**Required Permissions**

Delete Locations permission.

Cannot delete an item type with a `restricted_level` for higher access than the user's own `permission_level`.
