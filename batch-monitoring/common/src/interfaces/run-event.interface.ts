import { EventType } from "../enums/event-type.enum";
import { IFacetsMap } from "./facet.interface";
import { IJob } from "./job.interface";
import { IRun } from "./run.interface";
import { IRunDataset } from "./dataset.interface";

/**
 * A RunEvent is the central OpenLineage message.
 * Emitted at key points in a run's lifecycle (START, COMPLETE, FAIL, ABORT).
 * @see https://openlineage.io/spec/1-0-5/OpenLineage.json#/$defs/RunEvent
 */
export interface IRunEvent {
  /** OpenLineage spec version (e.g. "https://openlineage.io/spec/1-0-5/OpenLineage.json") */
  schemaURL: string;
  /** ISO-8601 timestamp when the event was emitted */
  eventTime: string;
  /** Type of lifecycle event */
  eventType: EventType;
  /** The run being described */
  run: IRun;
  /** The job that owns this run */
  job: IJob;
  /** Datasets read by this run */
  inputs: IRunDataset[];
  /** Datasets written by this run */
  outputs: IRunDataset[];
  /** Top-level event facets */
  facets?: IFacetsMap;
}

/**
 * Persisted run event record with database ID.
 */
export interface IRunEventRecord extends IRunEvent {
  id: string;
  createdAt: Date;
}
