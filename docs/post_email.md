# Post Email

Post an email by accepting from, to, subject and text.

# Request

## Method

POST

## Path

/api/v1/email

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

| Key     | Type            | Required | Allowed values | Notes            |
| ------- | --------------- | -------- | -------------- | ---------------- |
| from    | string          | Yes      | -              | -                |
| to      | Array of string | Yes      | -              | -                |
| subject | string          | Yes      | -              | -                |
| text    | string          | No       | -              | Defaults to true |

### Example

```json
{
    "from": "abc123@gmail.com",
    "to": ["xyz123@gmail.com"],
    "subject": "subject",
    "text": "lorem"
}
```

# Response

### Success

204 No Content
