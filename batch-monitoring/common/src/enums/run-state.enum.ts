/**
 * Represents the lifecycle state of a batch job run.
 * Aligned with OpenLineage RunState spec.
 */
export enum RunState {
  RUNNING = "RUNNING",
  COMPLETE = "COMPLETE",
  FAILED = "FAILED",
  ABORTED = "ABORTED",
  UNKNOWN = "UNKNOWN",
}
