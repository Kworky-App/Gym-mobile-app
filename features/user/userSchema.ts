import { z } from 'zod';

export const currentUserResponseSchema = z.object({
  id: z.string(),
  email: z.email(),
});

export type CurrentUserResponse = z.infer<typeof currentUserResponseSchema>;
