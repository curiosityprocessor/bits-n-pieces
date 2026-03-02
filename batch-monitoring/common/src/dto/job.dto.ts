import { IFacetsMap } from "../interfaces/facet.interface";

/**
 * Data transfer object for a Job resource.
 */
export interface JobDto {
  id: string;
  namespace: string;
  name: string;
  description?: string;
  facets?: IFacetsMap;
  createdAt: string;
  updatedAt: string;
}

/**
 * Lightweight job summary used in list views.
 */
export interface JobSummaryDto {
  id: string;
  namespace: string;
  name: string;
  description?: string;
  /** Most recent run state for this job */
  latestRunState?: string;
  /** Timestamp of the most recent run */
  lastRunAt?: string;
  createdAt: string;
}

/**
 * Request body for creating a new job.
 */
export interface CreateJobDto {
  namespace: string;
  name: string;
  description?: string;
  facets?: IFacetsMap;
}

/**
 * Request body for updating a job (all fields optional).
 */
export interface UpdateJobDto {
  description?: string;
  facets?: IFacetsMap;
}
