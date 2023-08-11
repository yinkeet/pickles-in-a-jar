# Logout

Logs the user out of the current session

# Request

## Method

POST

## Path

/api/v1/logout

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
| Key     | Type   | Present always | Supported values | Notes |
| ------- | ------ | -------------- | ---------------- | ----- |
| message | string | Yes            | -                | -     |

### Success
200 OK
```json
{
    "message": "Logged out!"
}
```