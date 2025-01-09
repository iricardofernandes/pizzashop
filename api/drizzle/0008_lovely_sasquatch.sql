ALTER TABLE "orders" RENAME COLUMN "costumer_id" TO "customer_id";--> statement-breakpoint
ALTER TABLE "order_items" RENAME COLUMN "costumer_id" TO "customer_id";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_costumer_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_costumer_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_customer_id_orders_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;