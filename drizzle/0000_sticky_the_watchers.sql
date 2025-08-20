-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "user" (
	"email" text PRIMARY KEY NOT NULL,
	"role" varchar(20) NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "soal" (
	"soal_id" varchar(20) PRIMARY KEY NOT NULL,
	"pertanyaan" text,
	"pilihan" text,
	"jawaban_benar" varchar
);

*/