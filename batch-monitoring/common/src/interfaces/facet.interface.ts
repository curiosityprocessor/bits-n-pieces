/**
 * Base facet interface. All OpenLineage facets carry a producer URI
 * and a schema URL identifying their spec version.
 */
export interface IBaseFacet {
  _producer: string;
  _schemaURL: string;
}

/**
 * A column definition within a schema facet.
 */
export interface ISchemaField {
  name: string;
  type: string;
  description?: string;
  fields?: ISchemaField[];
}

/**
 * Schema facet — describes the structure of a dataset.
 * @see https://openlineage.io/spec/facets/1-0-0/SchemaDatasetFacet.json
 */
export interface ISchemaFacet extends IBaseFacet {
  fields: ISchemaField[];
}

/**
 * SQL job facet — carries the SQL query string of a job.
 * @see https://openlineage.io/spec/facets/1-0-0/SQLJobFacet.json
 */
export interface ISqlFacet extends IBaseFacet {
  query: string;
}

/**
 * Data quality metric for a single column.
 */
export interface IColumnQualityMetric {
  columnName: string;
  nullCount?: number;
  distinctCount?: number;
  min?: number | string;
  max?: number | string;
  quantiles?: Record<string, number>;
}

/**
 * Data quality metrics facet — attached to dataset runs.
 * @see https://openlineage.io/spec/facets/1-0-0/DataQualityMetricsInputDatasetFacet.json
 */
export interface IDataQualityFacet extends IBaseFacet {
  rowCount?: number;
  bytes?: number;
  fileCount?: number;
  columnMetrics?: Record<string, IColumnQualityMetric>;
}

/**
 * Error message facet — attached to failed runs.
 * @see https://openlineage.io/spec/facets/1-0-0/ErrorMessageRunFacet.json
 */
export interface IErrorMessageFacet extends IBaseFacet {
  message: string;
  programmingLanguage: string;
  stackTrace?: string;
}

/**
 * Nominal run time facet — carries logical/scheduled run times.
 * @see https://openlineage.io/spec/facets/1-0-0/NominalTimeRunFacet.json
 */
export interface INominalTimeFacet extends IBaseFacet {
  nominalStartTime: string;
  nominalEndTime?: string;
}

/**
 * Union of all known facet types.
 * Additional custom facets extend IBaseFacet with arbitrary keys.
 */
export type IFacet =
  | ISchemaFacet
  | ISqlFacet
  | IDataQualityFacet
  | IErrorMessageFacet
  | INominalTimeFacet;

/**
 * Generic facets map — keys are facet names, values conform to IBaseFacet.
 * Typed as Record to allow extensibility per the OpenLineage spec.
 */
export type IFacetsMap = Record<string, IBaseFacet & Record<string, unknown>>;
