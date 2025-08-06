# Leaderboard Application

A full-stack leaderboard application with React frontend and Node.js backend.

## Prerequisites

- **npm** installed on machine
- **docker** installed on machine

## Instructions

### 1. Start the Infrastructure
```bash
docker-compose up -d
```

This will start:
- **Client**: React application on http://localhost:3000
- **Server**: Node.js API on http://localhost:4000
- **Database**: PostgreSQL on localhost:5432
- **Redis**: Cache on localhost:6379

### 2. Generate 10,000 Users
```bash
npm run bench:users
```

### 3. Open the Application
Navigate to: **http://localhost:3000**

### 4. View the Leaderboard
- Click on the **"Leaderboard"** in the navbar
- View the leaderboard rankings

### 5. Create a user or update a user score in the users page

### 6. Search for Specific User
- Enter the **user ID** in the text field to find a specific user

---

## Architecture

### Requirements

#### Functional Requirements
- Add a new user with a score
- Update a user score
- Retrieve the top N users of the leaderboard
- Retrieve current user position on the leaderboard along with 5 users above and below
- Real time updates

#### Non-Functional Requirements
- **CAP Theorem**: Availability >> Consistency
- **Scale**: Support 10M users with 10M active users, 100K requests per second (200ms latency benchmark)
- **Read >> Write** workload optimization
- **Fault tolerance**
- **Efficient & pretty UI**
- **Testing & benchmarking**
- **Security**
- **Monitoring**

### Core Entities
- **User**
- **Score**

### Data Models

#### User Table
```sql
user {
  id: BIGINT PRIMARY KEY
  username: STRING
  imageUrl: STRING (VARCHAR(1024))
  updated_at: DATE
  created_at: DATE
}
```

#### User Score Table
```sql
user_score {
  id: BIGINT PRIMARY KEY
  user_id: BIGINT (FOREIGN KEY)
  score: BIGINT
  updated_at: DATE
}
```

### Data Flow

1. **Create User** → Create user in PostgreSQL → Create record in Redis
2. **Update User Score** → Update PostgreSQL → Update user score in Redis
3. **Boot** → Initiate leaderboard sync → Fetch from PostgreSQL → Update entire Redis
4. **Background Job (30min)** → Fetch from PostgreSQL leaderboard → Update entire Redis

### Key Design Notes

- **Redis Ordered Set**: To meet latency benchmarks, data is stored in Redis ordered sets for lightning-fast queries with built-in ranking
- **Dual Updates**: Every user score update affects both Redis and PostgreSQL for consistency
- **Pagination**: Implemented to reduce response size and improve performance
- **Client-side Virtualization**: UI optimization using react-window for efficient rendering

---

## API Documentation

### Base URL
```
http://localhost:4000/api
```

### Endpoints

#### Create User
```http
POST /users
Content-Type: application/json

{
  "name": "string (3-50 characters)",
  "score": "number (integer, min 0)",
  "image": "string (optional)"
}
```
**Response**: `201 Created`
```json
{
  "newUserId": "number"
}
```

**Notes:**
- `name`: Required field, must be 3-50 characters
- `score`: Required field, must be a non-negative integer
- `image`: Optional field for user avatar (defaults to "1.jpg")
- Supported image formats: "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"

#### Update User Score
```http
PUT /users/:id
Content-Type: application/json

{
  "amount": "number (integer, min 0)",
  "action": "add" | "remove"
}
```
**Response**: `200 OK`
```json
{
  "newScore": "number"
}
```

**Notes:**
- `amount`: Required field, must be a non-negative integer
- `action`: Required field, must be either "add" or "remove"
- The score will be updated by adding or removing the specified amount

#### Get Leaderboard
```http
GET /leaderboard?limit=100&page=0
```
**Response**: `200 OK`
```json
{
  "users": [
    {
      "id": "number",
      "username": "string",
      "score": "number",
      "rank": "number | null",
      "createdAt": "date (optional)",
      "imageUrl": "string (optional)"
    }
  ],
  "total_users": "number",
  "page": "number"
}
```

**Query Parameters:**
- `limit`: Number of users to return (1-1000, default: 100)
- `page`: Page number for pagination (0-based, default: 0)

#### Get User Position in Leaderboard
```http
GET /leaderboard/user/:userId
```
**Response**: `200 OK`
```json
{
  "user": {
    "id": "number",
    "username": "string", 
    "score": "number",
    "rank": "number | null",
    "createdAt": "date (optional)",
    "imageUrl": "string (optional)"
  },
  "leaderboard": [
    {
      "id": "number",
      "username": "string",
      "score": "number", 
      "rank": "number | null",
      "createdAt": "date (optional)",
      "imageUrl": "string (optional)"
    }
  ],
  "total_users": "number"
}
```

**Notes:**
- Returns the specified user along with surrounding users in the leaderboard
- The leaderboard array contains users around the specified user's position

---

## Additional Commands

### Run Tests
```bash
# Run all tests
npm run test
```

### Development
```bash
# Start development servers
npm run dev
```

### Docker Commands
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild specific service
docker-compose build client
docker-compose build server
```

Enjoy exploring the leaderboard! 🏆 