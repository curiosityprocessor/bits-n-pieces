import { IFacetsMap } from "../interfaces/facet.interface";
import { ISchemaField } from "../interfaces/facet.interface";

/**
 * Full dataset data transfer object.
 */
export interface DatasetDto {
  id: string;
  namespace: string;
  name: string;
  /** Schema fields extracted from the schema facet for convenience */
  schema?: ISchemaField[];
  facets?: IFacetsMap;
  createdAt: string;
  updatedAt: string;
}

/**
 * Lightweight dataset summary for list and lineage graph views.
 */
export interface DatasetSummaryDto {
  id: string;
  namespace: string;
  name: string;
  /** Number of jobs that read from this dataset */
  inputJobCount?: number;
  /** Number of jobs that write to this dataset */
  outputJobCount?: number;
  createdAt: string;
}

/**
 * Request body for registering a new dataset.
 */
export interface CreateDatasetDto {
  namespace: string;
  name: string;
  facets?: IFacetsMap;
}
