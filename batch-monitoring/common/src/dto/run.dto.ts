import { RunState } from "../enums/run-state.enum";
import { IFacetsMap } from "../interfaces/facet.interface";

/**
 * Full run data transfer object.
 */
export interface RunDto {
  id: string;
  runId: string;
  jobId: string;
  state: RunState;
  nominalStartTime: string;
  nominalEndTime?: string;
  startedAt: string;
  endedAt?: string;
  facets?: IFacetsMap;
  createdAt: string;
  updatedAt: string;
}

/**
 * Lightweight run summary for list and timeline views.
 */
export interface RunSummaryDto {
  id: string;
  runId: string;
  jobId: string;
  jobName: string;
  jobNamespace: string;
  state: RunState;
  nominalStartTime: string;
  nominalEndTime?: string;
  startedAt: string;
  endedAt?: string;
  durationMs?: number;
}

/**
 * Request body for creating a new run record.
 */
export interface CreateRunDto {
  jobId: string;
  nominalStartTime: string;
  nominalEndTime?: string;
  facets?: IFacetsMap;
}

/**
 * Request body for transitioning a run's state.
 */
export interface UpdateRunStateDto {
  state: RunState;
  endedAt?: string;
  facets?: IFacetsMap;
}
