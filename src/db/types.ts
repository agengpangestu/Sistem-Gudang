import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const user_role = {
    super_admin: "super_admin",
    admin: "admin",
    regular: "regular"
} as const;
export type user_role = (typeof user_role)[keyof typeof user_role];
export type Product = {
    id: string;
    product_name: string;
    desc: string;
    location: string;
    price: Generated<number>;
    user_id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    /**
     * @kysely('super_admin', 'admin', 'regular')
     */
    role: Generated<string>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;  
};
export type DB = {
    Product: Product;
    User: User;
};
