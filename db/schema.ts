import {
  boolean,
  pgTable,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

// ==============================
// USER
// ==============================

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),
  email: text("email").notNull().unique(),

  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),

  image: text("image"),

  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),

  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// ==============================
// SESSION
// ==============================

export const sessionTable = pgTable(
  "session",
  {
    id: text("id").primaryKey(),

    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),

    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),

    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),

    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    userIdx: index("session_user_idx").on(table.userId),
  })
);

// ==============================
// ACCOUNT
// ==============================

export const accountTable = pgTable(
  "account",
  {
    id: text("id").primaryKey(),

    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),

    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),

    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),

    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),

    scope: text("scope"),
    password: text("password"),

    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => ({
    userIdx: index("account_user_idx").on(table.userId),
  })
);

// ==============================
// VERIFICATION
// ==============================

export const verificationTable = pgTable("verification", {
  id: text("id").primaryKey(),

  identifier: text("identifier").notNull(),
  value: text("value").notNull(),

  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date()),

  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date()),
});

// ==============================
// CNPJ (🔥 FEATURE PRINCIPAL)
// ==============================

export const cnpjTable = pgTable(
  "cnpj",
  {
    id: text("id").primaryKey(),

    // 🔥 dado principal
    cnpj: text("cnpj").notNull(),

    razaoSocial: text("razao_social"),
    nomeFantasia: text("nome_fantasia"),

    cep: text("cep"),
    uf: text("uf"),
    cidade: text("cidade"),
    bairro: text("bairro"),
    logradouro: text("logradouro"),
    dataInicioAtividade: text("data_inicio_atividade"),
    situacao: text("situacao"),
    cnae: text("cnae"),

    // 🔥 RELAÇÃO COM USUÁRIO (base SaaS)
    userId: text("user_id")
      .references(() => userTable.id, { onDelete: "cascade" }),

    // 🔥 timestamps (resolve seu erro)
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),

    updatedAt: timestamp("updated_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    cnpjIdx: index("cnpj_idx").on(table.cnpj),
    userIdx: index("cnpj_user_idx").on(table.userId),
  })
);
