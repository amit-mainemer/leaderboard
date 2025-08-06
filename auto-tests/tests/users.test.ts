import { generateUsername, generateScore } from '../setup';
import api from '../api';

const avatars = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

const getRandomAvatar = () => {
  return avatars[Math.floor(Math.random() * avatars.length)];
};

describe('Users API Tests', () => {
  let createdUserId: string;
  let testUsername: string;

  beforeEach(() => {
    testUsername = generateUsername('user_test');
  });

  afterEach(async () => {
    if (createdUserId) {
      try {
        await api.delete(`/api/users/${createdUserId}`);
      } catch (ex) {
        console.error(ex);
      }
      createdUserId = '';
    }
  });

  describe('Create User', () => {
    it('should successfully create a new user', async () => {
      const userData = {
        name: testUsername,
        score: generateScore(0, 1000),
        image: getRandomAvatar()
      };

      const response = await api.post('/api/users', userData);

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('newUserId');
      expect(response.data).toHaveProperty('id');

      createdUserId = response.data.id;
    });

  });
});