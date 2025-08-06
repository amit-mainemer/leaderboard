import api from '../api';
import { generateUsername, generateScore } from '../setup';

const avatars = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

const getRandomAvatar = () => {
  return avatars[Math.floor(Math.random() * avatars.length)];
};

async function measureTime<T>(fn: () => Promise<T>): Promise<{ result: T; time: number }> {
  const start = Date.now();
  const result = await fn();
  const time = Date.now() - start;
  return { result, time };
}

async function benchmarkUsers() {
  console.log('🚀 Starting Simple Users Benchmark');

  const createdUserIds: string[] = [];
  const userCreateTimes: number[] = [];

  console.log('\n📝 Creating 10000 users...');
  for (let i = 0; i < 10000; i++) {
    try {
      const userData = {
        name: generateUsername(`${i}`),
        score: generateScore(0, 20000),
        image: getRandomAvatar()
      };

      const { result, time } = await measureTime(() => 
        api.post('/api/users', userData)
      );

      userCreateTimes.push(time);
      if (result.data?.newUserId) {
        createdUserIds.push(result.data.newUserId);
      }

      if ((i + 1) % 1000 === 0) {
        console.log(`Created ${i + 1}/1000 users`);
      }
    } catch (error) {
      console.error(`Failed to create user ${i}`);
    }
  }

  const avgUserCreateTime = userCreateTimes.reduce((sum, time) => sum + time, 0) / userCreateTimes.length;
  console.log(`✅ Average user creation time: ${avgUserCreateTime.toFixed(2)}ms`);

  console.log('\n📊 Making 1000 leaderboard requests...');
  const leaderboardTimes: number[] = [];

  for (let i = 0; i < 1000; i++) {
    try {
      const { time } = await measureTime(() => 
        api.get('/api/leaderboard?limit=20&page=0')
      );

      leaderboardTimes.push(time);

      if ((i + 1) % 1000 === 0) {
        console.log(`  Completed ${i + 1}/1000 leaderboard requests`);
      }
    } catch (error) {
      console.error(`Failed leaderboard request ${i}`);
    }
  }

  const avgLeaderboardTime = leaderboardTimes.reduce((sum, time) => sum + time, 0) / leaderboardTimes.length;
  console.log(`✅ Average leaderboard request time: ${avgLeaderboardTime.toFixed(2)}ms`);

  // Cleanup
  console.log('\n🧹 Cleaning up users...');
  for (const userId of createdUserIds) {
    try {
      await api.delete(`/api/users/${userId}`);
    } catch (error) {
      // Ignore cleanup errors
    }
  }

  // Results
  console.log('\n📈 BENCHMARK RESULTS:');
  console.log('='.repeat(50));
  console.log(`User Creation (10,000 requests):`);
  console.log(`  Average time: ${avgUserCreateTime.toFixed(2)}ms`);
  console.log(`  Total successful: ${userCreateTimes.length}`);
  console.log();
  console.log(`Leaderboard Requests (10,000 requests):`);
  console.log(`  Average time: ${avgLeaderboardTime.toFixed(2)}ms`);
  console.log(`  Total successful: ${leaderboardTimes.length}`);
  console.log('='.repeat(50));
}

// Run if called directly
if (require.main === module) {
  benchmarkUsers().catch(error => {
    console.error('❌ Benchmark failed:', error);
    process.exit(1);
  });
}

export { benchmarkUsers }; 