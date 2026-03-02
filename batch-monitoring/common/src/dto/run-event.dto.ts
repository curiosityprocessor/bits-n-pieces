import { EventType } from "../enums/event-type.enum";
import { IFacetsMap } from "../interfaces/facet.interface";
import { IJob } from "../interfaces/job.interface";
import { IRun } from "../interfaces/run.interface";
import { IRunDataset } from "../interfaces/dataset.interface";

/**
 * Request body for ingesting an OpenLineage RunEvent.
 * Follows the OpenLineage 1.0 event spec.
 */
export interface CreateRunEventDto {
  schemaURL: string;
  eventTime: string;
  eventType: EventType;
  run: IRun;
  job: IJob;
  inputs: IRunDataset[];
  outputs: IRunDataset[];
  facets?: IFacetsMap;
}

/**
 * Full run event response including database ID and storage timestamp.
 */
export interface RunEventResponseDto {
  id: string;
  schemaURL: string;
  eventTime: string;
  eventType: EventType;
  run: IRun;
  job: IJob;
  inputs: IRunDataset[];
  outputs: IRunDataset[];
  facets?: IFacetsMap;
  createdAt: string;
}

/**
 * Lineage graph query parameters.
 */
export interface LineageQueryDto {
  /** Dataset namespace to resolve lineage from */
  namespace?: string;
  /** Dataset name to resolve lineage from */
  datasetName?: string;
  /** Job namespace to resolve lineage from */
  jobNamespace?: string;
  /** Job name to resolve lineage from */
  jobName?: string;
  /** How many upstream/downstream hops to traverse */
  depth?: number;
}

/**
 * A single node in the lineage graph (job or dataset).
 */
export interface LineageNodeDto {
  id: string;
  type: "JOB" | "DATASET";
  namespace: string;
  name: string;
}

/**
 * A directed edge in the lineage graph.
 */
export interface LineageEdgeDto {
  sourceId: string;
  targetId: string;
  runId?: string;
}

/**
 * Lineage graph response.
 */
export interface LineageGraphDto {
  nodes: LineageNodeDto[];
  edges: LineageEdgeDto[];
}
