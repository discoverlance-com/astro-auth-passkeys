import { column, defineDb, defineTable } from "astro:db";

const users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text({ unique: true }),
  },
});

const sessions = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    user_id: column.number({
      references: () => users.columns.id,
    }),
    expires_at: column.date(),
  },
  indexes: [{ on: ["user_id"] }],
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    users,
    sessions,
  },
});
