# Event Buddy - Database Schema Architecture

## Collections / Tables

### 1. Users
* `id` (UUID, Primary Key)
* `name` (String)
* `age` (Integer)
* `email` (String, Unique)
* `avatar_url` (String)
* `bio` (Text)
* `vibe_tag` (String - e.g., "Introvert friendly")
* `rating` (Decimal)
* `is_verified` (Boolean)

### 2. Events
* `id` (UUID, Primary Key)
* `title` (String)
* `description` (Text)
* `category` (String - e.g., "Music", "Party")
* `location` (String)
* `date_time` (Timestamp)
* `image_url` (String)
* `host_id` (UUID, Foreign Key referencing Users)
* `max_attendees` (Integer)

### 3. Bookmarks / Saved Events
* `user_id` (UUID, Foreign Key)
* `event_id` (UUID, Foreign Key)

### Relationships
* One User can **host** Many Events.
* One User can **bookmark** Many Events (Many-to-Many).