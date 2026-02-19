export type User = {
  id: number;
  name: string;
  email: string;
};

/**
 * Generates an array of users.
 * @param count Number of users to generate (default 50)
 */
export function generateUsers(count = 50): User[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@test.com`,
  }));
}

// Default 50 users
export const users: User[] = generateUsers();
