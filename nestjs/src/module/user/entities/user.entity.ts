import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "../user.constants";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column()
  pw: string;

  @Column({ type: "enum", enum: UserStatus })
  status: UserStatus;
}
