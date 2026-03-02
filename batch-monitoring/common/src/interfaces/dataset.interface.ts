import { DatasetType } from "../enums/dataset-type.enum";
import { IFacetsMap } from "./facet.interface";

/**
 * A Dataset represents an abstraction of data — a table, file, stream, etc.
 * Uniquely identified by (namespace, name).
 * @see https://openlineage.io/spec/1-0-5/OpenLineage.json#/$defs/Dataset
 */
export interface IDataset {
  /** Logical grouping (e.g. database host, S3 bucket name) */
  namespace: string;
  /** Unique dataset identifier within the namespace (e.g. table name, path) */
  name: string;
  /** Extensible metadata facets (e.g. SchemaFacet, DataQualityFacet) */
  facets?: IFacetsMap;
}

/**
 * Dataset with its role in a specific run (input or output).
 */
export interface IRunDataset extends IDataset {
  type: DatasetType;
  /** Input-specific facets (e.g. DataQualityMetrics) */
  inputFacets?: IFacetsMap;
  /** Output-specific facets (e.g. OutputStatistics) */
  outputFacets?: IFacetsMap;
}

/**
 * Persisted dataset record.
 */
export interface IDatasetRecord extends IDataset {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
