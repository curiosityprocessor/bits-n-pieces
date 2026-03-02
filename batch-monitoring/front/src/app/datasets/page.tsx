import { Database } from "lucide-react";
import { Header } from "@/components/layout/header";
import { EmptyState } from "@/components/shared/empty-state";
import type { DatasetSummary } from "@/types";

/** Mock data — replace with: datasetsApi.list() */
const MOCK_DATASETS: DatasetSummary[] = [
  { id: "ds-1", namespace: "postgresql://prod-db", name: "public.orders", inputJobCount: 0, outputJobCount: 1, createdAt: "2024-01-01T00:00:00Z" },
  { id: "ds-2", namespace: "postgresql://warehouse-db", name: "warehouse.orders_daily", inputJobCount: 1, outputJobCount: 0, createdAt: "2024-01-01T00:00:00Z" },
  { id: "ds-3", namespace: "postgresql://prod-db", name: "public.inventory", inputJobCount: 0, outputJobCount: 1, createdAt: "2024-01-01T00:00:00Z" },
];

export default function DatasetsPage() {
  const datasets = MOCK_DATASETS;

  return (
    <>
      <Header
        title="Datasets"
        description="Registered datasets and their lineage relationships"
      />

      <div className="flex-1 p-6">
        {datasets.length === 0 ? (
          <EmptyState
            icon={Database}
            title="No datasets registered"
            description="Datasets are auto-registered when RunEvents containing inputs or outputs are ingested."
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Namespace</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Produced By</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Consumed By</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Registered At</th>
                </tr>
              </thead>
              <tbody>
                {datasets.map((ds) => (
                  <tr key={ds.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{ds.name}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs font-mono">{ds.namespace}</td>
                    <td className="px-4 py-3 text-muted-foreground">{ds.outputJobCount ?? 0} job(s)</td>
                    <td className="px-4 py-3 text-muted-foreground">{ds.inputJobCount ?? 0} job(s)</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(ds.createdAt).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
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
