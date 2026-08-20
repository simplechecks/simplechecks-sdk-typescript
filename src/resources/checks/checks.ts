// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AlertsAPI from './alerts';
import { AlertReplaceParams, Alerts } from './alerts';
import { APIPromise } from '../../core/api-promise';
import { Offset, type OffsetParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * CRUD for synthetic-monitoring checks.
 */
export class Checks extends APIResource {
  alerts: AlertsAPI.Alerts = new AlertsAPI.Alerts(this._client);

  /**
   * Creates a check bound to the resolved garrison for the given `provider` +
   * `location`. Requires the `checks:write` scope.
   *
   * @example
   * ```ts
   * const check = await client.checks.create({
   *   enabled: true,
   *   name: 'name',
   *   schedule: '* /5 * * * *',
   *   target_url: 'https://example.com',
   *   type: 'http',
   * });
   * ```
   */
  create(body: CheckCreateParams, options?: RequestOptions): APIPromise<Check> {
    return this._client.post('/v1/checks', { body, ...options });
  }

  /**
   * Returns the check with the given id. 404 if no such check exists for the calling
   * account. Requires the `checks:read` scope. The response carries the check's full
   * saved configuration — schedule, target, timeout, and enabled state — plus its
   * created/updated timestamps.
   *
   * @example
   * ```ts
   * const check = await client.checks.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Check> {
    return this._client.get(path`/v1/checks/${id}`, options);
  }

  /**
   * All fields in the body are optional; omitted fields are left unchanged. Requires
   * the `checks:write` scope.
   *
   * @example
   * ```ts
   * const check = await client.checks.update('id');
   * ```
   */
  update(id: string, body: CheckUpdateParams, options?: RequestOptions): APIPromise<Check> {
    return this._client.patch(path`/v1/checks/${id}`, { body, ...options });
  }

  /**
   * Returns the caller's checks with simple offset pagination. `next_offset` is set
   * when a full page was returned and zero when there's no more data. Requires the
   * `checks:read` scope.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const check of client.checks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CheckListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ChecksOffset, Check> {
    return this._client.getAPIList('/v1/checks', Offset<Check>, { query, ...options });
  }

  /**
   * Disables the check. Requires the `checks:write` scope.
   *
   * @example
   * ```ts
   * await client.checks.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/checks/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type ChecksOffset = Offset<Check>;

/**
 * Per-check alert _settings_ (settings-only as of the alerting entity model).
 * Notification destinations live in first-class `/v1/alert-channels` bound to
 * checks via `/v1/alert-subscriptions`; pause-execution windows live in
 * `/v1/maintenance-windows`.
 */
export interface AlertConfig {
  /**
   * Number of consecutive globally-failing observations (after M-of-N consensus
   * collapses per-location status) required before an incident fires. Default = 1 =
   * "alert on first globally-failing observation."
   */
  consecutive_failures_threshold: number;

  /**
   * M-of-N consensus rule denominator (expected total location count). When fewer
   * than `consensus_m` locations have observations, the evaluator falls back to "any
   * failing = failing" so brand-new checks don't miss outages.
   */
  consensus_m: number;

  /**
   * M-of-N consensus rule numerator. The evaluator considers the check
   * globally-failing only when at least this many locations are reporting fail
   * concurrently.
   */
  consensus_n: number;

  /**
   * When false, the evaluator skips this check entirely.
   */
  enabled: boolean;

  /**
   * Server-set; ignored on write.
   */
  account_id?: string;

  /**
   * Server-set; ignored on write.
   */
  check_id?: string;

  created_at?: string;

  updated_at?: string;
}

export interface Check {
  id: string;

  /**
   * Owning account's `acct_<typeid>`. Read-only.
   */
  account_typeid: string;

  created_at: string;

  enabled: boolean;

  /**
   * Garrison the check is bound to. Server-assigned.
   */
  garrison_id: string;

  name: string;

  /**
   * Cron expression; minute granularity.
   */
  schedule: string;

  target_url: string;

  timeout_ms: number;

  /**
   * Check type. Currently only `http` is publicly documented.
   */
  type: string;

  updated_at: string;

  /**
   * Optional artifact reference (e.g. uploaded Playwright bundle).
   */
  artifact_url?: string;

  /**
   * Per-check-type configuration blob. Opaque on the wire.
   */
  config?: { [key: string]: unknown };

  /**
   * Legacy: the first location's provider-native id. Same back-compat caveats as
   * `provider`. Consult `locations`.
   */
  location?: string;

  /**
   * All locations the check runs from, in wire form (`provider:location`, e.g.
   * `aws:us-east-1`). Element 0 is the deterministic "primary" — order matches
   * creation.
   */
  locations?: Array<string>;

  /**
   * Legacy: the first location's provider, mirrors `locations[0]` split. Empty on
   * read for multi-location checks (consult `locations` instead). Kept for one
   * release cycle of SDK back-compat.
   */
  provider?: string;
}

export interface CheckCreateParams {
  enabled: boolean;

  name: string;

  schedule: string;

  target_url: string;

  type: string;

  artifact_url?: string;

  config?: { [key: string]: unknown };

  /**
   * Legacy; see `provider`.
   */
  location?: string;

  /**
   * Preferred: array of wire-form ids (`aws:us-east-1`). Element 0 is the
   * deterministic primary. Each entry must be in the deployment catalog returned by
   * `GET /v1/locations`.
   */
  locations?: Array<string>;

  /**
   * Legacy single-location shape. Translated server-side to
   * `locations=[<provider>:<location>]`. Kept for one release cycle.
   */
  provider?: string;

  timeout_ms?: number;
}

export interface CheckUpdateParams {
  artifact_url?: string;

  config?: { [key: string]: unknown };

  enabled?: boolean;

  /**
   * Replace the location set. nil-array = leave unchanged. Each entry must be in the
   * deployment catalog (`GET /v1/locations`).
   */
  locations?: Array<string>;

  name?: string;

  schedule?: string;

  target_url?: string;

  timeout_ms?: number;

  type?: string;
}

export interface CheckListParams extends OffsetParams {}

Checks.Alerts = Alerts;

export declare namespace Checks {
  export {
    type AlertConfig as AlertConfig,
    type Check as Check,
    type ChecksOffset as ChecksOffset,
    type CheckCreateParams as CheckCreateParams,
    type CheckUpdateParams as CheckUpdateParams,
    type CheckListParams as CheckListParams,
  };

  export { Alerts as Alerts, type AlertReplaceParams as AlertReplaceParams };
}
