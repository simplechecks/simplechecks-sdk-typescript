// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Read-only access to past check executions.
 */
export class Runs extends APIResource {
  /**
   * Returns the run matching `id`. The id's embedded UUIDv7 timestamp scopes the
   * server-side scan to one day. Requires the `runs:read` scope.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Run> {
    return this._client.get(path`/v1/runs/${id}`, options);
  }

  /**
   * Returns runs ordered by start time descending. Filter with `check_id`, `status`,
   * `since` (unix-millis lower bound). `limit` defaults to 50 (max 200); `offset`
   * paginates within the filtered set. Requires the `runs:read` scope.
   *
   * Run records come from the parquet result files garrisons write to S3; this
   * endpoint scans up to the last 7 days by default. Older runs are not retained.
   */
  list(query: RunListParams | null | undefined = {}, options?: RequestOptions): APIPromise<RunListResponse> {
    return this._client.get('/v1/runs', { query, ...options });
  }
}

/**
 * A single check execution. Runs are written by the garrison that executed the
 * check; CC reads them from S3-resident parquet files for read-only public
 * exposure here.
 */
export interface Run {
  /**
   * Run typeid (`run_<26-char base32 UUIDv7>`).
   */
  id: string;

  /**
   * UUID of the parent check (matches `Check.id`).
   */
  check_id: string;

  check_name: string;

  duration_ms: number;

  garrison_id: string;

  instance_id: string;

  node_name: string;

  /**
   * Execution start time in unix milliseconds (UTC).
   */
  started_at_unix_ms: number;

  status: 'PASS' | 'FAIL' | 'ERROR' | 'TIMEOUT';

  /**
   * Check type (`http`, `tcp`, `dns`, ...).
   */
  type: string;

  error_message?: string;

  /**
   * Per-check-type metadata blob, JSON-encoded as a string.
   */
  metadata?: string;
}

export interface RunListResponse {
  runs: Array<Run>;
}

export interface RunListParams {
  /**
   * Filter to a single check (UUID; matches `Check.id`).
   */
  check_id?: string;

  limit?: number;

  offset?: number;

  /**
   * Lower bound on `started_at_unix_ms`. Server clamps to a 7-day window.
   */
  since?: number;

  /**
   * Filter to a single execution status.
   */
  status?: 'PASS' | 'FAIL' | 'ERROR' | 'TIMEOUT';
}

export declare namespace Runs {
  export { type Run as Run, type RunListResponse as RunListResponse, type RunListParams as RunListParams };
}
