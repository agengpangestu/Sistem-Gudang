import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  REGULAR = "regular"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 200 })
  name: string

  @Column({ type: "varchar", unique: true })
  @isEma
  email: string

  @Column({ type: "varchar", length: 200 })
  password: string

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.REGULAR
  })
  role: UserRole

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn()
  deletedDate: Date
}
