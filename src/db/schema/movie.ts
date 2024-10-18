import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  uniqueIndex,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

// Movie table definition
export const movieTable = pgTable("movies", {
  id: uuid("id").defaultRandom().primaryKey(),
  tmdbID: integer("tmdb_id").notNull().unique(),
  title: text("title").notNull(),
  posterPath: text("poster_path").notNull(),
  voteAverage: numeric("vote_average", { precision: 3, scale: 1 }).notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .default(sql`now()`)
    .notNull()
    .$onUpdate(() => sql`now()`),
});

// Review table definition
export const reviewTable = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    tmdbID: integer("tmdb_id").notNull(),
    reviewer: text("name").notNull(),
    userID: uuid("user_id").notNull(),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .default(sql`now()`)
      .notNull()
      .$onUpdate(() => sql`now()`),
  },
  (table) => ({
    uniqueReview: uniqueIndex("uniqueReview").on(table.tmdbID, table.userID), // Defining unique constraint for (tmdbID, userID)
  })
);

// Favorite table definition
export const favoriteMoviesTable = pgTable(
  "favorites",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tmdbID: integer("tmdb_id").notNull(),
    userID: uuid("user_id").notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .default(sql`now()`)
      .notNull()
      .$onUpdate(() => sql`now()`),
  },
  (table) => ({
    uniqueFavorite: uniqueIndex("uniqueFavoriteInFavorites").on(
      table.tmdbID,
      table.userID
    ), // Defining unique constraint for (tmdbID, userID)
  })
);

// Watched table definition
export const watchedMoviesTable = pgTable(
  "watched",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tmdbID: integer("tmdb_id").notNull(),
    userID: uuid("user_id").notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .default(sql`now()`)
      .notNull()
      .$onUpdate(() => sql`now()`),
  },
  (table) => ({
    uniqueWatched: uniqueIndex("uniqueWatchedInWatched").on(
      table.tmdbID,
      table.userID
    ), // Defining unique constraint for (tmdbID, userID)
  })
);

// Relations between the tables

export const movieRelations = relations(movieTable, ({ many }) => ({
  reviews: many(reviewTable),
  favorites: many(favoriteMoviesTable),
  watched: many(watchedMoviesTable),
}));

export const reviewRelations = relations(reviewTable, ({ one }) => ({
  movie: one(movieTable, {
    fields: [reviewTable.tmdbID],
    references: [movieTable.tmdbID],
  }),
}));

export const favoriteRelations = relations(favoriteMoviesTable, ({ one }) => ({
  movie: one(movieTable, {
    fields: [favoriteMoviesTable.tmdbID],
    references: [movieTable.tmdbID],
  }),
}));

export const watchedRelations = relations(watchedMoviesTable, ({ one }) => ({
  movie: one(movieTable, {
    fields: [watchedMoviesTable.tmdbID],
    references: [movieTable.tmdbID],
  }),
}));
