# Common Types Package

This package contains shared TypeScript types and interfaces used across both the client and server applications.

## Structure

```
common/
├── types/
│   └── index.ts          # Main types export
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Available Types

### Leaderboard Types
- `LeaderboardUser` - User data in leaderboard context
- `LeaderboardResponse` - API response for leaderboard data
- `UserPositionResponse` - API response for user position
- `LeaderboardRequest` - API request parameters for leaderboard

### User Types
- `User` - Basic user information
- `UserScore` - User score data

### API Types
- `ApiResponse<T>` - Generic API response wrapper
- `PaginatedResponse<T>` - Paginated data response

### Game Types
- `GameScore` - Game score data with timestamp

### Validation Types
- `ValidationError` - Validation error structure
- `ValidationResult` - Validation result wrapper

## Usage

### In Server
```typescript
import { LeaderboardUser, LeaderboardResponse } from "@common/types";
```

### In Client
```typescript
import type { LeaderboardUser, LeaderboardResponse } from "../../common/types";
```

## Development

To build the types:
```bash
cd common
npm run build
```

To watch for changes:
```bash
cd common
npm run dev
```

## Adding New Types

1. Add the new type to `types/index.ts`
2. Export it from the main index file
3. Update this README with documentation
4. Rebuild the package if needed 