import Link from "next/link";
import { Play } from "lucide-react";
import { Header } from "@/components/layout/header";
import { RunStateBadge } from "@/components/runs/run-state-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { RunState } from "@/types";
import type { RunSummary } from "@/types";

/** Mock data — replace with: runsApi.list() */
const MOCK_RUNS: RunSummary[] = [
  { id: "run-1", runId: "d46e465b-d358-4d32-83d4-df660ff614dd", jobId: "job-1", jobName: "etl.orders.daily", jobNamespace: "airflow", state: RunState.COMPLETE, nominalStartTime: "2024-01-15T08:00:00Z", startedAt: "2024-01-15T08:01:12Z", endedAt: "2024-01-15T08:45:30Z", durationMs: 2658000 },
  { id: "run-2", runId: "b3c72f1a-9e44-4b11-a2f0-cc720f51ab9e", jobId: "job-2", jobName: "sync.inventory.hourly", jobNamespace: "airflow", state: RunState.RUNNING, nominalStartTime: "2024-01-15T09:00:00Z", startedAt: "2024-01-15T09:00:05Z", durationMs: undefined },
  { id: "run-3", runId: "f918cc2d-1234-4abc-8def-fedcba987654", jobId: "job-3", jobName: "report.revenue.weekly", jobNamespace: "spark", state: RunState.FAILED, nominalStartTime: "2024-01-15T06:00:00Z", startedAt: "2024-01-15T06:02:00Z", endedAt: "2024-01-15T06:08:45Z", durationMs: 405000 },
];

function formatDuration(ms?: number): string {
  if (ms === undefined) return "—";
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60_000)}m ${Math.floor((ms % 60_000) / 1000)}s`;
}

export default function RunsPage() {
  const runs = MOCK_RUNS;

  return (
    <>
      <Header
        title="Runs"
        description="Job execution history and lifecycle states"
      />

      <div className="flex-1 p-6">
        {runs.length === 0 ? (
          <EmptyState
            icon={Play}
            title="No runs recorded"
            description="Runs are created when a START event is ingested via POST /lineage/events."
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Job</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">State</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nominal Start</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Started At</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Duration</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((run) => (
                  <tr key={run.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <Link href={`/runs/${run.id}`} className="font-medium hover:underline">
                        {run.jobNamespace}/{run.jobName}
                      </Link>
                      <p className="font-mono text-xs text-muted-foreground">{run.runId.slice(0, 8)}…</p>
                    </td>
                    <td className="px-4 py-3">
                      <RunStateBadge state={run.state} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(run.nominalStartTime).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(run.startedAt).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDuration(run.durationMs)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
