# Get Emails

Get all emails. Currently this has no pagination (Will need to be implemented)

# Request

## Method

GET

## Path

/api/v1/emails

# Response

A single element array is returned containing all the leads with deal id grouped by its own respective product.

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
| Key          | Type            | Present always | Supported values | Notes |
| ------------ | --------------- | -------------- | ---------------- | ----- |
| id           | string          | Yes            | -                | -     |
| from         | string          | Yes            | -                | -     |
| to           | Array of string | Yes            | -                | -     |
| subject      | string          | Yes            | -                | -     |
| text         | string          | Yes            | -                | -     |
| status       | string          | Yes            | -                | -     |
| response     | string          | Yes            | -                | -     |
| signed_up_at | int             | Yes            | Unix timestamp   | -     |
| signed_up_at | int             | Yes            | Unix timestamp   | -     |

### Success
200 OK
```json
{
    "results": [
        {
            "id": "623a57df-2b8a-479f-b945-8cba03592033",
            "from": "abc123@gmail.com",
            "to": [
                "xyz123@gmail.com"
            ],
            "subject": "subject",
            "text": "lorem",
            "status": "sent",
            "response": "{\"accepted\":[\"xyz123@gmail.com\"],\"rejected\":[],\"ehlo\":[\"PIPELINING\",\"8BITMIME\",\"SMTPUTF8\",\"AUTH LOGIN PLAIN\"],\"envelopeTime\":612,\"messageTime\":218,\"messageSize\":270,\"response\":\"250 Accepted [STATUS=new MSGID=ZNGgB-CzT1bzODhuZNUkbc.vdLF4FeYTAAAAGLkb5l3Swt4PDjDoqO5r1K4]\",\"envelope\":{\"from\":\"abc123@gmail.com\",\"to\":[\"xyz123@gmail.com\"]},\"messageId\":\"<662d8b8b-15a4-07b4-2b00-ab9837c871ae@gmail.com>\",\"preview_url\":\"https://ethereal.email/message/ZNGgB-CzT1bzODhuZNUkbc.vdLF4FeYTAAAAGLkb5l3Swt4PDjDoqO5r1K4\"}",
            "created_at": "2023-08-10T17:54:49.795Z",
            "updated_at": "2023-08-10T17:54:53.495Z"
        }
    ]
}
```

### Possible errors

* 500 Internal Server Error