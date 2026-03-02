import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { RunStateBadge } from "@/components/runs/run-state-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RunState, DatasetType } from "@/types";
import type { RunDetail } from "@/types";

interface RunDetailPageProps {
  params: { id: string };
}

/** Mock data — replace with: runsApi.get(params.id) */
function getMockRun(id: string): RunDetail | null {
  const runs: Record<string, RunDetail> = {
    "run-1": {
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
      createdAt: "2024-01-15T08:01:12Z",
      updatedAt: "2024-01-15T08:45:30Z",
      inputs: [
        { namespace: "postgresql://prod-db", name: "public.orders", type: DatasetType.INPUT },
      ],
      outputs: [
        { namespace: "postgresql://warehouse-db", name: "warehouse.orders_daily", type: DatasetType.OUTPUT },
      ],
    },
  };
  return runs[id] ?? null;
}

export default function RunDetailPage({ params }: RunDetailPageProps) {
  const run = getMockRun(params.id);
  if (!run) notFound();

  return (
    <>
      <Header
        title={`Run: ${run.runId.slice(0, 8)}…`}
        description={`${run.jobNamespace}/${run.jobName}`}
      />

      <div className="flex-1 space-y-6 p-6">
        <Link
          href="/runs"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Runs
        </Link>

        {/* Run summary */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Run Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">State</span>
                <RunStateBadge state={run.state} />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Run ID</span>
                <span className="font-mono text-xs">{run.runId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Job</span>
                <Link href={`/jobs/${run.jobId}`} className="hover:underline">
                  {run.jobNamespace}/{run.jobName}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nominal Start</span>
                <span>{new Date(run.nominalStartTime).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Started At</span>
                <span>{new Date(run.startedAt).toLocaleString()}</span>
              </div>
              {run.endedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ended At</span>
                  <span>{new Date(run.endedAt).toLocaleString()}</span>
                </div>
              )}
              {run.durationMs !== undefined && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{Math.floor(run.durationMs / 60000)}m {Math.floor((run.durationMs % 60000) / 1000)}s</span>
                </div>
              )}
            </CardContent>
          </Card>

          {run.facets && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Run Facets</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded bg-muted p-3 text-xs">
                  {JSON.stringify(run.facets, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Lineage panel: inputs + outputs */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Inputs</CardTitle>
            </CardHeader>
            <CardContent>
              {run.inputs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No input datasets.</p>
              ) : (
                <ul className="space-y-2">
                  {run.inputs.map((ds, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="shrink-0">INPUT</Badge>
                      <span className="font-medium">{ds.name}</span>
                      <span className="text-muted-foreground text-xs">({ds.namespace})</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Outputs</CardTitle>
            </CardHeader>
            <CardContent>
              {run.outputs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No output datasets.</p>
              ) : (
                <ul className="space-y-2">
                  {run.outputs.map((ds, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="shrink-0">OUTPUT</Badge>
                      <span className="font-medium">{ds.name}</span>
                      <span className="text-muted-foreground text-xs">({ds.namespace})</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
