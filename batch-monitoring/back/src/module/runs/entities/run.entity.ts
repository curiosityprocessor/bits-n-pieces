import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { JobEntity } from "../../jobs/entities/job.entity";

export enum RunState {
  RUNNING = "RUNNING",
  COMPLETE = "COMPLETE",
  FAILED = "FAILED",
  ABORTED = "ABORTED",
  UNKNOWN = "UNKNOWN",
}

@Entity("run")
export class RunEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /** OpenLineage runId — the UUID from the originating system */
  @Column({ type: "uuid", unique: true })
  runId!: string;

  @Column({ type: "uuid" })
  jobId!: string;

  @ManyToOne(() => JobEntity, (job) => job.runs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "jobId" })
  job?: JobEntity;

  @Column({ type: "enum", enum: RunState, default: RunState.UNKNOWN })
  state!: RunState;

  @Column({ type: "timestamptz" })
  nominalStartTime!: Date;

  @Column({ type: "timestamptz", nullable: true })
  nominalEndTime?: Date;

  @Column({ type: "timestamptz", nullable: true })
  startedAt?: Date;

  @Column({ type: "timestamptz", nullable: true })
  endedAt?: Date;

  /** OpenLineage run facets stored as JSONB */
  @Column({ type: "jsonb", nullable: true })
  facets?: Record<string, unknown>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
