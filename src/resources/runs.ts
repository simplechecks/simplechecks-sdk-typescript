// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, RunsCursor, type RunsCursorParams } from '../core/pagination';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { JSONLDecoder } from '../internal/decoders/jsonl';
import { path } from '../internal/utils/path';

/**
 * Read-only access to past check executions.
 */
export class Runs extends APIResource {
  /**
   * Returns the full record for the run matching `id` — the slim list fields plus
   * the run's `metadata` (a JSON object) and a list of downloadable `artifacts`
   * (each an opaque URL). Runs are retained for 30 days; an aged-out or unknown id
   * returns 404. Requires the `runs:read` scope.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<RunDetail> {
    return this._client.get(path`/v1/runs/${id}`, options);
  }

  /**
   * Returns runs ordered by start time descending. Filter with `check_id`, `status`,
   * `location`, and a `since`/`until` unix-millis window. `limit` defaults to 50
   * (max 200). Pages are cursor-based: when more rows remain, the response carries a
   * `next_cursor` — pass it back as `cursor` to fetch the next page. Requires the
   * `runs:read` scope.
   *
   * Run records are served from the central runs table; runs are retained for 30
   * days. Each record carries structured `provider`/`region`/`location` fields and a
   * short `error_summary` rather than infrastructure internals.
   */
  list(
    query: RunListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<RunListItemsRunsCursor, RunListItem> {
    return this._client.getAPIList('/v1/runs', RunsCursor<RunListItem>, { query, ...options });
  }

  /**
   * Returns per-(check, location, minute-bucket) aggregate rows for the calling
   * account, optionally filtered by check_id, location, and time range. Powers the
   * customer dashboard ("uptime %", "pass rate", "average latency over period") and
   * the public status page; you wouldn't typically render per-run rows from this
   * endpoint at typical zoom levels.
   *
   * **Resolution.** Buckets are minute-aligned to UTC; the only accepted `bucket`
   * value at MVP is `minute`. The param exists so future per-15s or per-hour rollups
   * can slot in additively.
   *
   * **Eventual-consistency contract.** A bucket may continue to receive
   * contributions after `now()` crosses its end boundary — late-arriving Garrison
   * batches (network blip, scaling) feed the bucket they truncate to, which can be
   * in the past. Treat any returned counts as a lower bound; dashboards refreshing
   * the same window may see counts increase. The push cadence (15s) bounds how stale
   * the aggregate is in steady state.
   *
   * **Latency stats.** `duration_avg_ms` is computed server-side from the underlying
   * sum/count. `duration_min_ms` and `duration_max_ms` reflect the extremes seen in
   * the bucket. Percentiles (p50/p95/p99) require online-mergeable sketches and are
   * deferred to a follow-up.
   *
   * Requires the `runs:read` scope.
   */
  aggregates(
    query: RunAggregatesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RunAggregatesResponse> {
    return this._client.get('/v1/runs/aggregates', { query, ...options });
  }

  /**
   * Returns the gzipped JSONL execution log for the run. Each line is a structured
   * event (timestamp, severity, source, message, optional kv map) tagged with the
   * run id; producers include the executor (`run_start`, `run_end`) and per-type
   * emitters (currently `http_request`, `http_response` for HTTP checks).
   *
   * The response always carries `Content-Encoding: gzip` and the bytes on the wire
   * are the gzipped form; standards-compliant HTTP clients (browsers, curl,
   * Go/Python/JS SDKs) decompress transparently. `sc logs <id>` (PR-Logs/2) consumes
   * this endpoint.
   *
   * Tenancy is enforced before any byte fetch — a run id that doesn't belong to the
   * calling account returns 404, not 403, so callers can't probe for the existence
   * of other tenants' runs. Requires the `runs:read` scope.
   */
  logs(id: string, options?: RequestOptions): APIPromise<JSONLDecoder<RunLogsResponse>> {
    return this._client
      .get(path`/v1/runs/${id}/logs`, {
        ...options,
        headers: buildHeaders([{ Accept: 'application/x-ndjson' }, options?.headers]),
        stream: true,
        __binaryResponse: true,
      })
      ._thenUnwrap((_, props) => JSONLDecoder.fromResponse(props.response, props.controller)) as APIPromise<
      JSONLDecoder<RunLogsResponse>
    >;
  }
}

export type RunListItemsRunsCursor = RunsCursor<RunListItem>;

export interface Aggregate {
  account_id: string;

  /**
   * Exclusive bucket end (= start + 60 000 ms today).
   */
  bucket_end_unix_ms: number;

  /**
   * Inclusive bucket start, unix-millis, minute-aligned to UTC.
   */
  bucket_start_unix_ms: number;

  check_id: string;

  /**
   * Server-computed average from sum/count. Zero when the bucket has no runs.
   */
  duration_avg_ms: number;

  error_count: number;

  fail_count: number;

  /**
   * Garrison cloud / region label (e.g. `hetzner`, `ovh`, `aws`).
   */
  location: string;

  pass_count: number;

  timeout_count: number;

  /**
   * Sum of all four status counts. Convenience for clients that compute uptime as
   * `pass_count / total_count`.
   */
  total_count: number;

  duration_max_ms?: number | null;

  duration_min_ms?: number | null;
}

/**
 * The full record for one check execution: the list fields plus the run's
 * `metadata` (a JSON object) and the set of downloadable `artifacts`. Location is
 * structured; no infrastructure identifiers are exposed.
 */
export interface RunDetail {
  /**
   * Run typeid (`run_<26-char base32 UUIDv7>`).
   */
  id: string;

  /**
   * Downloadable artifacts for this run (empty when none).
   */
  artifacts: Array<RunDetail.Artifact>;

  /**
   * UUID of the parent check (matches `Check.id`).
   */
  check_id: string;

  check_name: string;

  duration_ms: number;

  has_errors: boolean;

  has_failures: boolean;

  /**
   * Execution start time in unix milliseconds (UTC).
   */
  started_at_unix_ms: number;

  status: 'PASS' | 'FAIL' | 'ERROR' | 'TIMEOUT';

  /**
   * Check type (`http`, `tcp`, `dns`, ...).
   */
  type: string;

  /**
   * Reserved; always null at this version.
   */
  degraded?: boolean | null;

  /**
   * Full failure message; null on a passing run.
   */
  error_message?: string | null;

  /**
   * Human-readable location label. Null when unresolved.
   */
  location?: string | null;

  /**
   * Per-check-type metadata as a JSON object; null when absent.
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * Cloud provider that ran the check. Null when unresolved.
   */
  provider?: string | null;

  /**
   * Provider-native region id. Null when unresolved.
   */
  region?: string | null;
}

export namespace RunDetail {
  /**
   * One downloadable artifact for a run.
   */
  export interface Artifact {
    /**
     * Artifact kind (closed set).
     */
    kind: 'screenshot' | 'trace' | 'har';

    /**
     * Opaque, webapp-relative download path (`/v1/runs/{id}/artifacts/{kind}`).
     */
    url: string;
  }
}

/**
 * One check execution in a list. Location is exposed as structured
 * `provider`/`region`/`location` fields rather than infrastructure internals; the
 * row carries cheap boolean flags and a short `error_summary` (null on a passing
 * run). For the full record (metadata + downloadable artifacts), fetch
 * `GET /v1/runs/{id}`.
 */
export interface RunListItem {
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

  has_errors: boolean;

  has_failures: boolean;

  /**
   * Execution start time in unix milliseconds (UTC).
   */
  started_at_unix_ms: number;

  status: 'PASS' | 'FAIL' | 'ERROR' | 'TIMEOUT';

  /**
   * Check type (`http`, `tcp`, `dns`, ...).
   */
  type: string;

  /**
   * Reserved; always null at this version.
   */
  degraded?: boolean | null;

  /**
   * Short failure summary; null on a passing run.
   */
  error_summary?: string | null;

  /**
   * Human-readable location label (e.g. `Falkenstein, DE`). Null when unresolved.
   */
  location?: string | null;

  /**
   * Cloud provider that ran the check (e.g. `hetzner`, `ovh`). Null when unresolved.
   */
  provider?: string | null;

  /**
   * Provider-native region id (e.g. `fsn1`, `gra7`). Null when unresolved.
   */
  region?: string | null;
}

export interface RunAggregatesResponse {
  aggregates: Array<Aggregate>;
}

export type RunLogsResponse = Uploadable;

export interface RunListParams extends RunsCursorParams {
  /**
   * Filter to a single check (UUID; matches `Check.id`).
   */
  check_id?: string;

  /**
   * Filter to a single provider-native region id (e.g. `fsn1`).
   */
  location?: string;

  /**
   * Lower bound on `started_at_unix_ms` (inclusive).
   */
  since?: number;

  /**
   * Filter to a single execution status.
   */
  status?: 'PASS' | 'FAIL' | 'ERROR' | 'TIMEOUT';

  /**
   * Upper bound on `started_at_unix_ms` (inclusive).
   */
  until?: number;
}

export interface RunAggregatesParams {
  /**
   * Bucket size. Only `minute` accepted today.
   */
  bucket?: 'minute';

  /**
   * Filter to one check.
   */
  check_id?: string;

  /**
   * Inclusive lower bound, unix-millis. Defaults to `now() - 1h`.
   */
  from?: number;

  /**
   * Maximum number of rows. Default 1000; hard cap 5000.
   */
  limit?: number;

  /**
   * Filter to one location (e.g. `hetzner`, `ovh`).
   */
  location?: string;

  /**
   * Exclusive upper bound, unix-millis. Defaults to `now() + 1m`.
   */
  to?: number;
}

export declare namespace Runs {
  export {
    type Aggregate as Aggregate,
    type RunDetail as RunDetail,
    type RunListItem as RunListItem,
    type RunAggregatesResponse as RunAggregatesResponse,
    type RunLogsResponse as RunLogsResponse,
    type RunListItemsRunsCursor as RunListItemsRunsCursor,
    type RunListParams as RunListParams,
    type RunAggregatesParams as RunAggregatesParams,
  };
}
