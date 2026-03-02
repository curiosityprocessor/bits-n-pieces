import { Briefcase, Play, AlertCircle, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentRunsTable } from "@/components/dashboard/recent-runs-table";
import { JobHealthOverview } from "@/components/dashboard/job-health-overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RunState } from "@/types";
import type { RunSummary, JobSummary } from "@/types";

/** Mock data shapes — replace with API calls once backend is wired up */
const MOCK_RECENT_RUNS: RunSummary[] = [
  {
    id: "run-1",
    runId: "d46e465b-d358-4d32-83d4-df660ff614dd",
    jobId: "job-1",
    jobName: "etl.orders.daily",
    jobNamespace: "airflow",
    state: RunState.COMPLETE,
    nominalStartTime: "2024-01-15T08:00:00Z",
    startedAt: "2024-01-15T08:01:12Z",
    endedAt: "2024-01-15T08:45:30Z",
    durationMs: 2658000,
  },
  {
    id: "run-2",
    runId: "b3c72f1a-9e44-4b11-a2f0-cc720f51ab9e",
    jobId: "job-2",
    jobName: "sync.inventory.hourly",
    jobNamespace: "airflow",
    state: RunState.RUNNING,
    nominalStartTime: "2024-01-15T09:00:00Z",
    startedAt: "2024-01-15T09:00:05Z",
    durationMs: undefined,
  },
  {
    id: "run-3",
    runId: "f918cc2d-1234-4abc-8def-fedcba987654",
    jobId: "job-3",
    jobName: "report.revenue.weekly",
    jobNamespace: "spark",
    state: RunState.FAILED,
    nominalStartTime: "2024-01-15T06:00:00Z",
    startedAt: "2024-01-15T06:02:00Z",
    endedAt: "2024-01-15T06:08:45Z",
    durationMs: 405000,
  },
];

const MOCK_JOBS: JobSummary[] = [
  { id: "job-1", namespace: "airflow", name: "etl.orders.daily", latestRunState: RunState.COMPLETE, lastRunAt: "2024-01-15T08:45:30Z", createdAt: "2024-01-01T00:00:00Z" },
  { id: "job-2", namespace: "airflow", name: "sync.inventory.hourly", latestRunState: RunState.RUNNING, lastRunAt: "2024-01-15T09:00:05Z", createdAt: "2024-01-01T00:00:00Z" },
  { id: "job-3", namespace: "spark", name: "report.revenue.weekly", latestRunState: RunState.FAILED, lastRunAt: "2024-01-15T06:08:45Z", createdAt: "2024-01-01T00:00:00Z" },
  { id: "job-4", namespace: "spark", name: "ml.churn.prediction", latestRunState: undefined, lastRunAt: undefined, createdAt: "2024-01-10T00:00:00Z" },
];

export default function DashboardPage() {
  return (
    <>
      <Header
        title="Dashboard"
        description="Batch job health and run activity overview"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* KPI stats row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Jobs"
            value={4}
            description="Registered batch jobs"
            icon={Briefcase}
          />
          <StatsCard
            title="Active Runs"
            value={1}
            description="Currently executing"
            icon={Play}
          />
          <StatsCard
            title="Failures (24h)"
            value={1}
            description="Runs that ended in FAILED state"
            icon={AlertCircle}
          />
          <StatsCard
            title="Successes (24h)"
            value={1}
            description="Runs that ended in COMPLETE state"
            icon={CheckCircle}
          />
        </div>

        {/* Detail panels */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Runs</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentRunsTable runs={MOCK_RECENT_RUNS} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Job Health</CardTitle>
            </CardHeader>
            <CardContent>
              <JobHealthOverview jobs={MOCK_JOBS} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
