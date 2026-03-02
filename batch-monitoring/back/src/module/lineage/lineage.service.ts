import { Injectable, NotImplementedException } from "@nestjs/common";
import { CreateRunEventDto } from "./dto/run-event.dto";
import { LineageQueryDto } from "./dto/lineage-query.dto";

export interface LineageNode {
  id: string;
  type: "JOB" | "DATASET";
  namespace: string;
  name: string;
}

export interface LineageEdge {
  sourceId: string;
  targetId: string;
  runId?: string;
}

export interface LineageGraph {
  nodes: LineageNode[];
  edges: LineageEdge[];
}

@Injectable()
export class LineageService {
  /**
   * Ingest an OpenLineage RunEvent.
   * Side effects: upsert job, create/update run, upsert datasets,
   * record run<->dataset associations.
   */
  ingestEvent(dto: CreateRunEventDto): Promise<void> {
    throw new NotImplementedException();
  }

  /**
   * Resolve a lineage graph starting from a job or dataset.
   * Traverses upstream/downstream edges up to dto.depth hops.
   */
  getLineageGraph(dto: LineageQueryDto): Promise<LineageGraph> {
    throw new NotImplementedException();
  }
}
