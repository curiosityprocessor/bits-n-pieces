export const API_VERSION = "v1";
export const API_PREFIX = `api/${API_VERSION}`;

export const API_PATHS = {
  JOBS: "jobs",
  RUNS: "runs",
  DATASETS: "datasets",
  LINEAGE: {
    ROOT: "lineage",
    EVENTS: "lineage/events",
    GRAPH: "lineage/graph",
  },
} as const;

export const OPENLINEAGE_SCHEMA_URL =
  "https://openlineage.io/spec/1-0-5/OpenLineage.json";

export const OPENLINEAGE_PRODUCER = "https://github.com/curiosityprocessor/bits-n-pieces/batch-monitoring";
