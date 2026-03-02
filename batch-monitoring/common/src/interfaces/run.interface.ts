import { RunState } from "../enums/run-state.enum";
import { IFacetsMap } from "./facet.interface";

/**
 * A Run represents a single execution instance of a Job.
 * Identified by a UUID (runId).
 * @see https://openlineage.io/spec/1-0-5/OpenLineage.json#/$defs/Run
 */
export interface IRun {
  /** UUID identifying this specific execution */
  runId: string;
  /** Extensible metadata facets (e.g. NominalTimeFacet, ErrorMessageFacet) */
  facets?: IFacetsMap;
}

/**
 * Persisted run with state tracking and timing information.
 */
export interface IRunRecord extends IRun {
  id: string;
  jobId: string;
  state: RunState;
  nominalStartTime: Date;
  nominalEndTime?: Date;
  startedAt: Date;
  endedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
