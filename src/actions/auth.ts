import { ActionError, defineAction } from "astro:actions";
import { db, eq, isDbError, users } from "astro:db";
import { z } from "astro:schema";

export const auth = {
  loginWithEmail: defineAction({
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
      // check if user exists
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email));

      if (user.length !== 1) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Invalid or wrong credentials.",
        });
      }

      const found = user[0];

      // Send user a magic link to login

      // success
      context.cookies.set(
        "flash",
        {
          message: "Welcome",
          type: "info",
        },
        { maxAge: 10 }
      );
      return { login: true, user: found };
    },
  }),
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

      context.cookies.set(
        "flash",
        {
          message: "Proceed to login.",
          type: "info",
        },
        { maxAge: 10 }
      );
      return { register: true };
    },
  }),
};
