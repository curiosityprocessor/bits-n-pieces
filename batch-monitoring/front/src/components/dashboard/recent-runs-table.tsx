import Link from "next/link";
import { RunStateBadge } from "@/components/runs/run-state-badge";
import type { RunSummary } from "@/types";

interface RecentRunsTableProps {
  runs: RunSummary[];
}

function formatDuration(ms?: number): string {
  if (ms === undefined) return "—";
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60_000)}m ${Math.floor((ms % 60_000) / 1000)}s`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function RecentRunsTable({ runs }: RecentRunsTableProps) {
  if (runs.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No runs recorded yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="pb-3 pr-4 font-medium">Job</th>
            <th className="pb-3 pr-4 font-medium">State</th>
            <th className="pb-3 pr-4 font-medium">Started</th>
            <th className="pb-3 font-medium">Duration</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id} className="border-b last:border-0">
              <td className="py-3 pr-4">
                <Link
                  href={`/runs/${run.id}`}
                  className="font-medium hover:underline"
                >
                  {run.jobNamespace}/{run.jobName}
                </Link>
              </td>
              <td className="py-3 pr-4">
                <RunStateBadge state={run.state} />
              </td>
              <td className="py-3 pr-4 text-muted-foreground">
                {formatTime(run.startedAt)}
              </td>
              <td className="py-3 text-muted-foreground">
                {formatDuration(run.durationMs)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
