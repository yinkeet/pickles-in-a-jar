# Login

Login the user with their username and password 

# Request

## Method

POST

## Path

/api/v1/login

## Headers

| Key          | Type   | Required | Allowed values   | Notes |
| ------------ | ------ | -------- | ---------------- | ----- |
| Content-Type | string | Yes      | application/json | -     |

### Example

```json
{
    "Content-Type": "application/json"
}
```

## Body - JSON

### Main

| Key      | Type   | Required | Allowed values | Notes |
| -------- | ------ | -------- | -------------- | ----- |
| username | string | Yes      | -              | -     |
| password | string | Yes      | -              | -     |

### Example

```json
{
    "username": "username",
    "password": "password"
}
```

# Response

## Headers
| Key          | Type   | Present always | Supported values | Notes |
| ------------ | ------ | -------------- | ---------------- | ----- |
| Content-Type | string | Yes            | application/json | -     |

### Example
```json
{
    "Content-Type": "application/json"
}
```

## Body
| Key      | Type   | Present always | Supported values | Notes |
| -------- | ------ | -------------- | ---------------- | ----- |
| id       | string | Yes            | -                | -     |
| username | string | Yes            | -                | -     |

### Success
200 OK
```json
{
    "id": "623a57df-2b8a-479f-b945-8cba03592033",
    "username": "username"
}
```

### Possible errors

* 400 Bad Request
* 401 Unauthorized