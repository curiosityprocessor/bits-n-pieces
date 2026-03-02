/**
 * Re-export all shared types from the common package.
 * Until the common package is built and linked, these types are
 * inlined here as the single source of truth for the frontend.
 */

// ─── Enums ────────────────────────────────────────────────────────────────────

export enum RunState {
  RUNNING = "RUNNING",
  COMPLETE = "COMPLETE",
  FAILED = "FAILED",
  ABORTED = "ABORTED",
  UNKNOWN = "UNKNOWN",
}

export enum EventType {
  START = "START",
  COMPLETE = "COMPLETE",
  FAIL = "FAIL",
  ABORT = "ABORT",
  OTHER = "OTHER",
}

export enum DatasetType {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

// ─── Core domain types ────────────────────────────────────────────────────────

export type FacetsMap = Record<string, Record<string, unknown>>;

export interface JobSummary {
  id: string;
  namespace: string;
  name: string;
  description?: string;
  latestRunState?: RunState;
  lastRunAt?: string;
  createdAt: string;
}

export interface JobDetail extends JobSummary {
  facets?: FacetsMap;
  updatedAt: string;
}

export interface RunSummary {
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

export interface RunDetail extends RunSummary {
  facets?: FacetsMap;
  inputs: DatasetRef[];
  outputs: DatasetRef[];
  createdAt: string;
  updatedAt: string;
}

export interface DatasetRef {
  namespace: string;
  name: string;
  type: DatasetType;
  facets?: FacetsMap;
}

export interface DatasetSummary {
  id: string;
  namespace: string;
  name: string;
  inputJobCount?: number;
  outputJobCount?: number;
  createdAt: string;
}

export interface LineageNode {
  id: string;
  type: "JOB" | "DATASET";
  namespace: string;
  name: string;
}

export interface LineageEdge {
  sourceId: string;
  targetId: string;
  runId?: string;
}

export interface LineageGraph {
  nodes: LineageNode[];
  edges: LineageEdge[];
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
