import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Medical Records Table
export const medicalRecords = mysqlTable("medical_records", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  recordType: varchar("recordType", { length: 50 }).notNull(),
  title: text("title"),
  description: text("description"),
  imageUrl: text("imageUrl"),
  aiAnalysis: text("aiAnalysis"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MedicalRecord = typeof medicalRecords.$inferSelect;
export type InsertMedicalRecord = typeof medicalRecords.$inferInsert;

// Vital Signs Measurements Table
export const vitalSignsMeasurements = mysqlTable("vital_signs_measurements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  heartRate: int("heartRate"),
  oxygenLevel: int("oxygenLevel"),
  temperature: varchar("temperature", { length: 10 }),
  bloodPressureSystolic: int("bloodPressureSystolic"),
  bloodPressureDiastolic: int("bloodPressureDiastolic"),
  bloodSugar: int("bloodSugar"),
  hemoglobin: varchar("hemoglobin", { length: 10 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VitalSignsMeasurement = typeof vitalSignsMeasurements.$inferSelect;
export type InsertVitalSignsMeasurement = typeof vitalSignsMeasurements.$inferInsert;

// Consultations Table
export const consultations = mysqlTable("consultations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  userMessage: text("userMessage").notNull(),
  aiResponse: text("aiResponse"),
  imageUrl: text("imageUrl"),
  status: varchar("status", { length: 20 }).default("completed"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Consultation = typeof consultations.$inferSelect;
export type InsertConsultation = typeof consultations.$inferInsert;