import { RunStateBadge } from "@/components/runs/run-state-badge";
import { RunState } from "@/types";
import type { JobSummary } from "@/types";
import Link from "next/link";

interface JobHealthOverviewProps {
  jobs: JobSummary[];
}

export function JobHealthOverview({ jobs }: JobHealthOverviewProps) {
  if (jobs.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No jobs registered yet.
      </p>
    );
  }

  return (
    <ul className="divide-y">
      {jobs.map((job) => (
        <li key={job.id} className="flex items-center justify-between py-3">
          <div>
            <Link
              href={`/jobs/${job.id}`}
              className="text-sm font-medium hover:underline"
            >
              {job.name}
            </Link>
            <p className="text-xs text-muted-foreground">{job.namespace}</p>
          </div>
          {job.latestRunState ? (
            <RunStateBadge state={job.latestRunState as RunState} />
          ) : (
            <span className="text-xs text-muted-foreground">No runs</span>
          )}
        </li>
      ))}
    </ul>
  );
}
