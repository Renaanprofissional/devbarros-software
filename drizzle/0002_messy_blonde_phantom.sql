ALTER TABLE "cnpj" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "cnpj" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "cnpj" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "cnpj" ADD CONSTRAINT "cnpj_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "cnpj_idx" ON "cnpj" USING btree ("cnpj");--> statement-breakpoint
CREATE INDEX "cnpj_user_idx" ON "cnpj" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_user_idx" ON "session" USING btree ("user_id");