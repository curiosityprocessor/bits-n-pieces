import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity("dataset")
@Unique(["namespace", "name"])
export class DatasetEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** Logical namespace (e.g. database host, S3 bucket) */
  @Column({ type: "varchar", length: 255 })
  namespace!: string;

  /** Unique dataset name within the namespace (e.g. table name, file path) */
  @Column({ type: "varchar", length: 255 })
  name!: string;

  /** OpenLineage dataset facets (schema, data quality, etc.) stored as JSONB */
  @Column({ type: "jsonb", nullable: true })
  facets?: Record<string, unknown>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
