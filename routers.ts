import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { addMedicalRecord, getUserMedicalRecords, addVitalSignsMeasurement, getUserVitalSignsMeasurements, addConsultation, getUserConsultations } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Medical Records Router
  medicalRecords: router({
    list: protectedProcedure.query(({ ctx }) => getUserMedicalRecords(ctx.user.id)),
    add: protectedProcedure
      .input(z.object({
        recordType: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        aiAnalysis: z.string().optional(),
      }))
      .mutation(({ ctx, input }) => addMedicalRecord({
        userId: ctx.user.id,
        ...input,
      })),
  }),

  // Vital Signs Router
  vitalSigns: router({
    list: protectedProcedure.query(({ ctx }) => getUserVitalSignsMeasurements(ctx.user.id)),
    add: protectedProcedure
      .input(z.object({
        heartRate: z.number().optional(),
        oxygenLevel: z.number().optional(),
        temperature: z.string().optional(),
        bloodPressureSystolic: z.number().optional(),
        bloodPressureDiastolic: z.number().optional(),
        bloodSugar: z.number().optional(),
        hemoglobin: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(({ ctx, input }) => addVitalSignsMeasurement({
        userId: ctx.user.id,
        ...input,
      })),
  }),

  // Consultations Router
  consultations: router({
    list: protectedProcedure.query(({ ctx }) => getUserConsultations(ctx.user.id)),
    add: protectedProcedure
      .input(z.object({
        userMessage: z.string(),
        aiResponse: z.string().optional(),
        imageUrl: z.string().optional(),
      }))
      .mutation(({ ctx, input }) => addConsultation({
        userId: ctx.user.id,
        ...input,
      })),
  }),
});

export type AppRouter = typeof appRouter;
