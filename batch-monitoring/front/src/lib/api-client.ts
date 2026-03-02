/**
 * Typed API client stubs for the batch-monitoring backend.
 * Replace stub implementations with real fetch calls as the backend matures.
 *
 * Types are sourced from @/types (which mirrors @batch-monitoring/common).
 * Once a yarn workspace is configured, switch imports to the common package.
 */

import type {
  JobDetail,
  JobSummary,
  RunDetail,
  RunSummary,
  DatasetSummary,
  LineageGraph,
  PaginatedResponse,
} from "@/types";

// ─── Request shapes (inlined until common package is linked) ──────────────────

export interface CreateJobRequest {
  namespace: string;
  name: string;
  description?: string;
  facets?: Record<string, Record<string, unknown>>;
}

export interface CreateRunRequest {
  jobId: string;
  runId: string;
  nominalStartTime: string;
  nominalEndTime?: string;
  facets?: Record<string, Record<string, unknown>>;
}

export interface UpdateRunStateRequest {
  state: string;
  endedAt?: string;
  facets?: Record<string, Record<string, unknown>>;
}

export interface CreateDatasetRequest {
  namespace: string;
  name: string;
  facets?: Record<string, Record<string, unknown>>;
}

export interface RunEventRequest {
  schemaURL: string;
  eventTime: string;
  eventType: string;
  run: { runId: string; facets?: Record<string, unknown> };
  job: { namespace: string; name: string; facets?: Record<string, unknown> };
  inputs: Array<{ namespace: string; name: string; facets?: Record<string, unknown> }>;
  outputs: Array<{ namespace: string; name: string; facets?: Record<string, unknown> }>;
  facets?: Record<string, unknown>;
}

export interface LineageQueryRequest {
  namespace?: string;
  datasetName?: string;
  jobNamespace?: string;
  jobName?: string;
  depth?: number;
}

const API_BASE = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}/${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ─── Jobs API ─────────────────────────────────────────────────────────────────

export const jobsApi = {
  list(): Promise<PaginatedResponse<JobSummary>> {
    return apiFetch("jobs");
  },

  get(id: string): Promise<JobDetail> {
    return apiFetch(`jobs/${id}`);
  },

  create(dto: CreateJobRequest): Promise<JobDetail> {
    return apiFetch("jobs", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },
};

// ─── Runs API ─────────────────────────────────────────────────────────────────

export const runsApi = {
  list(jobId?: string): Promise<PaginatedResponse<RunSummary>> {
    const qs = jobId ? `?jobId=${jobId}` : "";
    return apiFetch(`runs${qs}`);
  },

  get(id: string): Promise<RunDetail> {
    return apiFetch(`runs/${id}`);
  },

  create(dto: CreateRunRequest): Promise<RunDetail> {
    return apiFetch("runs", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },

  updateState(id: string, dto: UpdateRunStateRequest): Promise<RunDetail> {
    return apiFetch(`runs/${id}/state`, {
      method: "PATCH",
      body: JSON.stringify(dto),
    });
  },
};

// ─── Datasets API ─────────────────────────────────────────────────────────────

export const datasetsApi = {
  list(): Promise<PaginatedResponse<DatasetSummary>> {
    return apiFetch("datasets");
  },

  upsert(dto: CreateDatasetRequest): Promise<DatasetSummary> {
    return apiFetch("datasets", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },
};

// ─── Lineage API ──────────────────────────────────────────────────────────────

export const lineageApi = {
  ingestEvent(dto: RunEventRequest): Promise<void> {
    return apiFetch("lineage/events", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },

  getGraph(query: LineageQueryRequest): Promise<LineageGraph> {
    const params = new URLSearchParams(
      Object.entries(query)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    );
    return apiFetch(`lineage/graph?${params.toString()}`);
  },
};
