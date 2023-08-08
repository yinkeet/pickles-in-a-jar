CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE delivery_status AS ENUM ('pending', 'sending', 'sent');

CREATE TABLE "mails" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "from" VARCHAR(320) NOT NULL,
    "to" VARCHAR[] NOT NULL,
    "subject" VARCHAR(988) NOT NULL,
    "text" TEXT NOT NULL,
    "status" delivery_status NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);