import { ActionError, defineAction } from "astro:actions";
import { db, eq, isDbError, users } from "astro:db";
import { z } from "astro:schema";

export const auth = {
  register: defineAction({
    accept: "form",
    input: z.object({
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a text",
        })
        .email("Email must be a valid email address"),
    }),
    handler: async (input, context) => {
      // verify that user does not already exist
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email));

      if (user.length > 0) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "User already exists. Please proceed to login.",
        });
      }

      try {
        // create a new user
        await db.insert(users).values({
          email: input.email,
        });
      } catch (error) {
        if (isDbError(error)) {
          throw new ActionError({
            message: error.message,
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      }
      return { register: true };
    },
  }),
};
