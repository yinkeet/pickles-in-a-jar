CREATE TYPE delivery_status AS ENUM ('pending', 'sending', 'sent');

CREATE TABLE "mails" (
    "id" SERIAL PRIMARY KEY,
    "from" VARCHAR(320) NOT NULL,
    "to" VARCHAR[] NOT NULL,
    "subject" VARCHAR(988) NOT NULL,
    "text" TEXT NOT NULL,
    "status" delivery_status NOT NULL,
    "retries" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);