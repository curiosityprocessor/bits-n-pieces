import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  uid: string;

  @Column("float")
  amount: number;

  @Column("text")
  description: string;

  @Column()
  status: string;
}
