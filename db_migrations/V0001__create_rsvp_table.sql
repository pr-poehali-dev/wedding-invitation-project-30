CREATE TABLE rsvp (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  attending TEXT NOT NULL,
  guests INTEGER DEFAULT 1,
  dietary TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);