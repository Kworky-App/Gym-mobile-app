import { z } from 'zod';
import { isValidDateString, parseLocalDateString } from '@/lib/date';

export const genderLabels = ['Male', 'Female'] as const;

export const genderByValue = {
  0: 'Male',
  1: 'Female',
} as const;

export const genderByLabel = {
  Male: 0,
  Female: 1,
} as const;

export const genderRequestSchema = z.union([z.literal(0), z.literal(1)]);
export const genderResponseSchema = z.enum(genderLabels);

export type GenderValue = keyof typeof genderByValue;
export type GenderLabel = (typeof genderLabels)[number];

export const registerUserRequestSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.date(),
  gender: genderRequestSchema,
  email: z.email(),
  password: z.string().min(8),
});

export const registerUserFormSchema = z.object({
  name: z.string().trim().min(1, 'Nom requis'),
  dateOfBirth: z
    .string()
    .min(1, 'Date de naissance requise')
    .refine(isValidDateString, 'Date non valide'),
  gender: genderRequestSchema,
  email: z.email('Email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export function toRegisterUserRequest(
  values: RegisterUserFormValues,
): RegisterUserRequest {
  const dateOfBirth = parseLocalDateString(values.dateOfBirth);
  if (!dateOfBirth) {
    throw new Error('Date non valide');
  }

  return registerUserRequestSchema.parse({
    ...values,
    dateOfBirth,
  });
}

export const registerUserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.date(),
  gender: genderResponseSchema,
  email: z.email(),
  createdAt: z.date(),
});

export const loginUserRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const loginUserFormSchema = z.object({
  email: z.email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

export const loginUserResponseSchema = z.object({
  id: z.string(),
  email: z.email(),
  token: z.string(),
});

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;
export type RegisterUserFormValues = z.infer<typeof registerUserFormSchema>;
export type RegisterUserResponse = z.infer<typeof registerUserResponseSchema>;
export type LoginUserRequest = z.infer<typeof loginUserRequestSchema>;
export type LoginUserFormValues = z.infer<typeof loginUserFormSchema>;
export type LoginUserResponse = z.infer<typeof loginUserResponseSchema>;
