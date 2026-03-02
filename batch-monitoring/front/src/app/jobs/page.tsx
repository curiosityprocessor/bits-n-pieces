import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Header } from "@/components/layout/header";
import { RunStateBadge } from "@/components/runs/run-state-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { RunState } from "@/types";
import type { JobSummary } from "@/types";

/** Mock data — replace with API call: jobsApi.list() */
const MOCK_JOBS: JobSummary[] = [
  { id: "job-1", namespace: "airflow", name: "etl.orders.daily", description: "Daily ETL for order data", latestRunState: RunState.COMPLETE, lastRunAt: "2024-01-15T08:45:30Z", createdAt: "2024-01-01T00:00:00Z" },
  { id: "job-2", namespace: "airflow", name: "sync.inventory.hourly", description: "Hourly inventory sync", latestRunState: RunState.RUNNING, lastRunAt: "2024-01-15T09:00:05Z", createdAt: "2024-01-01T00:00:00Z" },
  { id: "job-3", namespace: "spark", name: "report.revenue.weekly", description: "Weekly revenue reporting", latestRunState: RunState.FAILED, lastRunAt: "2024-01-15T06:08:45Z", createdAt: "2024-01-01T00:00:00Z" },
  { id: "job-4", namespace: "spark", name: "ml.churn.prediction", description: "Churn prediction model training", latestRunState: undefined, lastRunAt: undefined, createdAt: "2024-01-10T00:00:00Z" },
];

export default function JobsPage() {
  const jobs = MOCK_JOBS;

  return (
    <>
      <Header
        title="Jobs"
        description="Registered batch jobs and their latest run status"
      />

      <div className="flex-1 p-6">
        {jobs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No jobs registered"
            description="Jobs are auto-registered when the first RunEvent is ingested via POST /lineage/events."
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Job</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Namespace</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Latest Run</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Last Run At</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <Link href={`/jobs/${job.id}`} className="font-medium hover:underline">
                        {job.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{job.namespace}</td>
                    <td className="px-4 py-3 text-muted-foreground">{job.description ?? "—"}</td>
                    <td className="px-4 py-3">
                      {job.latestRunState ? (
                        <RunStateBadge state={job.latestRunState as RunState} />
                      ) : (
                        <span className="text-muted-foreground">No runs</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {job.lastRunAt
                        ? new Date(job.lastRunAt).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })
                        : "—"}
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
