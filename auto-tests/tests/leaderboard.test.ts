import api from '../api';
import { generateUsername, generateScore, delay } from '../setup';

describe('Leaderboard API Tests', () => {
  describe('Leaderboard Order', () => {
    it('should return users sorted by score in descending order', async () => {
      const response = await api.get('/api/leaderboard?limit=1000&page=0');

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('users');
      expect(response.data).toHaveProperty('total_users');
      expect(response.data).toHaveProperty('page');

      
      const users = response.data.users.toSorted((a: any, b: any) => a.rank - b.rank);

      for (let i = 0; i < users.length - 1; i++) {
        expect(users[i].score).toBeGreaterThanOrEqual(users[i + 1].score);
      }

      users.forEach((user: any, index: number) => {
        expect(user.rank).toBe(index + 1);
      });
    });

    // it('should handle empty leaderboard gracefully', async () => {
    //   const response = await api.get('/api/leaderboard?limit=10&page=999999');

    //   expect(response.status).toBe(200);
    //   expect(response.data.data).toEqual([]);
    //   expect(response.data.total).toBeGreaterThanOrEqual(0);
    // });

    // it('should return correct user properties in leaderboard', async () => {
    //   const response = await api.get('/api/leaderboard?limit=5&page=0');

    //   expect(response.status).toBe(200);
    //   const users = response.data.data;

    //   users.forEach((user: any) => {
    //     expect(user).toHaveProperty('id');
    //     expect(user).toHaveProperty('username');
    //     expect(user).toHaveProperty('score');
    //     expect(user).toHaveProperty('rank');
    //     expect(user).toHaveProperty('createdAt');
    //     expect(user).toHaveProperty('updatedAt');
    //     expect(typeof user.score).toBe('number');
    //     expect(typeof user.rank).toBe('number');
    //     expect(user.score).toBeGreaterThanOrEqual(0);
    //     expect(user.rank).toBeGreaterThan(0);
    //   });
    // });
  });

  describe('Leaderboard Pagination', () => {
    it('should handle pagination correctly with default parameters', async () => {
      const response = await api.get('/api/leaderboard?limit=100&page=0');
      expect(response.status).toBe(200);
      expect(response.data.page).toBe(0);
      expect(response.data.total_users).toBeGreaterThanOrEqual(500);
    });

    it('should return correct page and limit in response', async () => {
      const limit = 10;
      const page = 2;

      const response = await api.get(`/api/leaderboard?limit=${limit}&page=${page}`);

      expect(response.status).toBe(200);
      expect(response.data.page).toBe(page);
      expect(response.data.users.length).toBeLessThanOrEqual(limit);
    });


    it('should maintain correct ranking across pages', async () => {
      const limit = 10;

      const page1Response = await api.get(`/api/leaderboard?limit=${limit}&page=0`);
      const page1Users = page1Response.data.users;

      const page2Response = await api.get(`/api/leaderboard?limit=${limit}&page=1`);
      const page2Users = page2Response.data.users;

      expect(page1Response.status).toBe(200);
      expect(page2Response.status).toBe(200);

      const allUsers = [...page1Users, ...page2Users];

      for (let i = 0; i < allUsers.length - 1; i++) {
        expect(allUsers[i].score).toBeGreaterThanOrEqual(allUsers[i + 1].score);
      }

    });

  });

  // describe('Update User Score to 1,000,000', () => {
  //   it('should successfully update user score to 1,000,000', async () => {
  //     const newScore = 1000000;

  //     const response = await api.patch(`/api/users/${testLeaderUserId}/score`, {
  //       score: newScore
  //     });

  //     expect(response.status).toBe(200);
  //     expect(response.data.score).toBe(newScore);
  //     expect(response.data.id).toBe(testLeaderUserId);
  //     expect(response.data.username).toBe(testLeaderUsername);

  //     // Wait for cache to update
  //     await delay(1000);
  //   });

  //   it('should verify the updated score is reflected in user data', async () => {
  //     const userResponse = await api.get(`/api/users/${testLeaderUserId}`);

  //     expect(userResponse.status).toBe(200);
  //     expect(userResponse.data.score).toBe(1000000);
  //     expect(userResponse.data.username).toBe(testLeaderUsername);
  //   });
  // });

  // describe('Check User is Leader of Leaderboard', () => {
  //   it('should confirm the updated user is now the leader', async () => {
  //     // Wait a bit more for any caching to update
  //     await delay(2000);

  //     const leaderboardResponse = await api.get('/api/leaderboard?limit=10&page=0');

  //     expect(leaderboardResponse.status).toBe(200);
  //     expect(leaderboardResponse.data.data.length).toBeGreaterThan(0);

  //     const leader = leaderboardResponse.data.data[0];
  //     expect(leader.id).toBe(testLeaderUserId);
  //     expect(leader.username).toBe(testLeaderUsername);
  //     expect(leader.score).toBe(1000000);
  //     expect(leader.rank).toBe(1);
  //   });

  //   it('should verify leader has the highest score', async () => {
  //     const leaderboardResponse = await api.get('/api/leaderboard?limit=20&page=0');

  //     expect(leaderboardResponse.status).toBe(200);
  //     const users = leaderboardResponse.data.data;
  //     expect(users.length).toBeGreaterThan(0);

  //     const leader = users[0];
  //     expect(leader.score).toBe(1000000);

  //     // All other users should have lower scores
  //     for (let i = 1; i < users.length; i++) {
  //       expect(users[i].score).toBeLessThan(leader.score);
  //     }
  //   });

  //   it('should maintain leaderboard consistency after score update', async () => {
  //     const leaderboardResponse = await api.get('/api/leaderboard?limit=50&page=0');

  //     expect(leaderboardResponse.status).toBe(200);
  //     const users = leaderboardResponse.data.data;

  //     // Verify all scores are still in descending order
  //     for (let i = 0; i < users.length - 1; i++) {
  //       expect(users[i].score).toBeGreaterThanOrEqual(users[i + 1].score);
  //     }

  //     // Verify all ranks are sequential
  //     users.forEach((user: any, index: number) => {
  //       expect(user.rank).toBe(index + 1);
  //     });

  //     // Verify our test user is at the top
  //     expect(users[0].id).toBe(testLeaderUserId);
  //     expect(users[0].rank).toBe(1);
  //   });

  //   it('should verify total count includes all users', async () => {
  //     const leaderboardResponse = await api.get('/api/leaderboard?limit=1&page=0');

  //     expect(leaderboardResponse.status).toBe(200);
  //     expect(leaderboardResponse.data.total).toBeGreaterThanOrEqual(501); // 500 + 1 leader
  //   });
  // });
});



