const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    Username: z
      .string({
        required_error: "Username Is required",
      })
      .min(3, { message: "Username must be at least 3 characters long" }),

    Email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email adress" }),

    Password: z
      .string({
        required_error: "password is required",
      })
      .min(6, { message: "password must be at least 6 charcaters long" }),
  }),
});

const loginSchema = z.object({
  body: z.object({
    Email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),

    Password: z
      .string({
        required_error: "Password is required",
      })
      .nonempty("Password cannot be empty"),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
