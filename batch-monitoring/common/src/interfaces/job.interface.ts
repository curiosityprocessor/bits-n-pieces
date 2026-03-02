import { IFacetsMap } from "./facet.interface";

/**
 * A Job represents a recurring data processing task.
 * Uniquely identified by (namespace, name).
 * @see https://openlineage.io/spec/1-0-5/OpenLineage.json#/$defs/Job
 */
export interface IJob {
  /** Logical grouping / owning system (e.g. "my-spark-cluster", "airflow") */
  namespace: string;
  /** Unique job identifier within the namespace */
  name: string;
  /** Extensible metadata facets */
  facets?: IFacetsMap;
}

/**
 * Persisted job with database-level metadata.
 */
export interface IJobRecord extends IJob {
  id: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
