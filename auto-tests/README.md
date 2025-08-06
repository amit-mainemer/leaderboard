# Auto Tests for Sunflower Assignment

This directory contains automated API tests for the Sunflower Assignment leaderboard system.

## Prerequisites

- **Running Server**: Ensure the server is running on `http://localhost:4000` before running tests
- **Node.js**: Version 16 or higher
- **NPM**: Version 7 or higher

## Setup

1. **Install Dependencies**:
   ```bash
   cd auto-tests
   npm install
   ```

2. **Start the Server** (in another terminal):
   ```bash
   # From the project root
   npm run dev
   # Or just the server
   cd server && npm run dev
   ```

3. **Verify Server is Running**:
   - Open `http://localhost:4000` in your browser
   - The server should be accessible and responding

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
# Run only users tests
npm run test:users

# Run only leaderboard tests  
npm run test:leaderboard
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## Test Suites

### 1. Users API Tests (`users.test.ts`)

Tests the user management functionality:

#### Create User Tests:
- ✅ Successfully create a new user
- ✅ Create user with default score of 0
- ✅ Fail to create user with duplicate username
- ✅ Fail to create user without username
- ✅ Fail to create user with invalid score

#### Update Score Tests:
- ✅ Successfully update user score
- ✅ Update score to 0
- ✅ Update score to maximum value (1,000,000)
- ✅ Fail to update score with negative value
- ✅ Fail to update score for non-existent user
- ✅ Fail to update score without score value
- ✅ Verify score update reflects in user data

### 2. Leaderboard API Tests (`leaderboard.test.ts`)

Tests the leaderboard functionality with comprehensive scenarios:

#### Setup:
- 🚀 Creates 500 test users with random scores
- 👑 Creates a special test leader user

#### Leaderboard Order Tests:
- ✅ Return users sorted by score in descending order
- ✅ Handle empty leaderboard gracefully
- ✅ Return correct user properties in leaderboard

#### Leaderboard Pagination Tests:
- ✅ Handle pagination correctly with default parameters
- ✅ Return correct page and limit in response
- ✅ Handle different page sizes correctly
- ✅ Maintain correct ranking across pages
- ✅ Handle invalid pagination parameters gracefully

#### Score Update Tests:
- ✅ Successfully update user score to 1,000,000
- ✅ Verify the updated score is reflected in user data

#### Leader Verification Tests:
- ✅ Confirm the updated user is now the leader
- ✅ Verify leader has the highest score
- ✅ Maintain leaderboard consistency after score update
- ✅ Verify total count includes all users

## Test Features

### 🔧 **Automatic Setup & Cleanup**
- Creates test users with unique usernames
- Automatically cleans up all created test data
- Handles rate limiting to avoid overwhelming the server

### 🎯 **Comprehensive Coverage**
- Tests all API endpoints with various scenarios
- Validates success cases, error cases, and edge cases
- Verifies data consistency and proper ranking

### ⚡ **Performance Optimized**
- Batches user creation to avoid server overload
- Uses parallel requests where appropriate
- Includes delays for cache consistency

### 🛡️ **Robust Error Handling**
- Graceful handling of network errors
- Proper cleanup even if tests fail
- Clear error messages and logging

## Configuration

### Timeouts
- Default test timeout: 30 seconds
- Setup timeout (500 users): 2 minutes
- Cleanup timeout: 1 minute

### Server Configuration
- Base URL: `http://localhost:4000`
- Request timeout: 10 seconds

## Troubleshooting

### Common Issues

1. **Server not running**:
   ```
   ❌ Server is not accessible at http://localhost:4000
   ```
   **Solution**: Start the server with `npm run dev` from the project root

2. **Test timeouts**:
   - Ensure your server has sufficient resources
   - Check if database/Redis connections are working
   - Monitor server logs for errors

3. **Port conflicts**:
   - Ensure port 4000 is available
   - Check if another instance of the server is running

4. **Database issues**:
   - Verify database connection
   - Ensure sufficient storage space
   - Check database permissions

### Performance Tips

- Run tests when server has minimal load
- Ensure stable network connection
- Monitor system resources during test execution

## Test Output

The tests provide detailed console output:
- 🚀 Progress indicators during setup
- ✅ Success confirmations
- 🧹 Cleanup status
- ❌ Clear error messages with context

## Contributing

When adding new tests:
1. Follow the existing naming conventions
2. Add proper cleanup in `afterEach`/`afterAll`
3. Use the utility functions from `setup.ts`
4. Add appropriate timeouts for long-running tests
5. Update this README with new test descriptions 