import { db } from "@/db";
import { users, type User } from "@/db/schema/user";
import { eq, ilike } from "drizzle-orm";
import { redis } from "@/db/redis";
import { cache } from "react";

export const getUserById = cache(async (id: string): Promise<User> => {
  const cacheKey = `user-data-${id}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) return JSON.parse(cachedData) as User;
  return await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((data) => data[0]);
});

export const getUserByEmail = cache(async (email: string): Promise<User> => {
  const cacheKey = `user-data-${email}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) return JSON.parse(cachedData) as User;
  return await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((data) => data[0]);
});
export const getUsersbyName = cache(async (name: string): Promise<User[]> => {
  const cacheKey = `user-data-${name}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) return JSON.parse(cachedData) as User[];
  return await db
    .select()
    .from(users)
    .where(ilike(users.name, "%" + name + "%"))
    .then((data) => data);
});
