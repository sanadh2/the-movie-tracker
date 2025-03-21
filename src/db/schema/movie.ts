import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

export const movieTable = pgTable("movies", {
  id: uuid("id").defaultRandom().primaryKey(),
  tmdbID: integer("tmdb_id").notNull().unique(),
  title: text("title").notNull(),
  posterPath: text("poster_path"),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .default(sql`now()`)
    .notNull()
    .$onUpdate(() => sql`now()`),
});

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
    uniqueReview: uniqueIndex("uniqueReview").on(table.tmdbID, table.userID),
  })
);

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
    ),
  })
);

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
    ),
  })
);

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

export type InsertReview = InferInsertModel<typeof reviewTable>;
export type Review = InferSelectModel<typeof reviewTable>;

export type InsertFavoriteMovie = InferInsertModel<typeof favoriteMoviesTable>;
export type FavoriteMovie = InferSelectModel<typeof favoriteMoviesTable>;

export type InsertMovie = InferInsertModel<typeof movieTable>;
export type Movie = InferSelectModel<typeof movieTable>;

export type InsertWatchedMovie = InferInsertModel<typeof watchedMoviesTable>;
export type WatchedMovie = InferSelectModel<typeof watchedMoviesTable>;
