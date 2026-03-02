import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { RunEntity } from "../../runs/entities/run.entity";

@Entity("job")
@Unique(["namespace", "name"])
export class JobEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  namespace!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  /** OpenLineage facets stored as JSONB for schema flexibility */
  @Column({ type: "jsonb", nullable: true })
  facets?: Record<string, unknown>;

  @OneToMany(() => RunEntity, (run) => run.job)
  runs?: RunEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
