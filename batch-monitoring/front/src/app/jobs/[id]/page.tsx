import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { RunStateBadge } from "@/components/runs/run-state-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RunState } from "@/types";
import type { JobDetail, RunSummary } from "@/types";

interface JobDetailPageProps {
  params: { id: string };
}

/** Mock data — replace with: jobsApi.get(params.id) + runsApi.list(params.id) */
function getMockJob(id: string): JobDetail | null {
  const jobs: Record<string, JobDetail> = {
    "job-1": {
      id: "job-1",
      namespace: "airflow",
      name: "etl.orders.daily",
      description: "Daily ETL pipeline that reads from source.orders and writes to warehouse.orders_daily.",
      latestRunState: RunState.COMPLETE,
      lastRunAt: "2024-01-15T08:45:30Z",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T08:45:30Z",
      facets: {
        sql: { _producer: "airflow", _schemaURL: "https://openlineage.io/spec/facets/1-0-0/SQLJobFacet.json", query: "INSERT INTO warehouse.orders_daily SELECT * FROM source.orders WHERE date = :run_date" },
      },
    },
  };
  return jobs[id] ?? null;
}

const MOCK_RUNS: RunSummary[] = [
  { id: "run-1", runId: "d46e465b-d358-4d32-83d4-df660ff614dd", jobId: "job-1", jobName: "etl.orders.daily", jobNamespace: "airflow", state: RunState.COMPLETE, nominalStartTime: "2024-01-15T08:00:00Z", startedAt: "2024-01-15T08:01:12Z", endedAt: "2024-01-15T08:45:30Z", durationMs: 2658000 },
  { id: "run-4", runId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", jobId: "job-1", jobName: "etl.orders.daily", jobNamespace: "airflow", state: RunState.FAILED, nominalStartTime: "2024-01-14T08:00:00Z", startedAt: "2024-01-14T08:01:05Z", endedAt: "2024-01-14T08:05:12Z", durationMs: 247000 },
];

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = getMockJob(params.id);
  if (!job) notFound();

  return (
    <>
      <Header
        title={job.name}
        description={`Namespace: ${job.namespace}`}
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Job metadata */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Namespace</span>
                <span className="font-medium">{job.namespace}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{job.name}</span>
              </div>
              {job.description && (
                <div>
                  <span className="text-muted-foreground">Description</span>
                  <p className="mt-1">{job.description}</p>
                </div>
              )}
              {job.latestRunState && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Latest State</span>
                  <RunStateBadge state={job.latestRunState as RunState} />
                </div>
              )}
            </CardContent>
          </Card>

          {job.facets && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Facets</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded bg-muted p-3 text-xs">
                  {JSON.stringify(job.facets, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Run history */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Run History</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Run ID</th>
                  <th className="pb-3 pr-4 font-medium">State</th>
                  <th className="pb-3 pr-4 font-medium">Nominal Start</th>
                  <th className="pb-3 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_RUNS.filter((r) => r.jobId === params.id).map((run) => (
                  <tr key={run.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-mono text-xs">{run.runId.slice(0, 8)}…</td>
                    <td className="py-3 pr-4"><RunStateBadge state={run.state} /></td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {new Date(run.nominalStartTime).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {run.durationMs ? `${Math.floor(run.durationMs / 60000)}m ${Math.floor((run.durationMs % 60000) / 1000)}s` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
