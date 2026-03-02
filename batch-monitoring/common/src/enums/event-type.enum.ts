/**
 * OpenLineage event types emitted during a run's lifecycle.
 * START — emitted when a run begins.
 * COMPLETE — emitted when a run finishes successfully.
 * FAIL — emitted when a run terminates with an error.
 * ABORT — emitted when a run is explicitly cancelled.
 * OTHER — catch-all for custom event types.
 */
export enum EventType {
  START = "START",
  COMPLETE = "COMPLETE",
  FAIL = "FAIL",
  ABORT = "ABORT",
  OTHER = "OTHER",
}
