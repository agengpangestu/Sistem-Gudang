import { Column, Entity } from "typeorm";

@Entity()
export class Name {
    @Column({type: "varchar", length: 200})
    name: string
}