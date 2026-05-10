// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AlertsAPI from './alerts';
import { AlertReplaceParams, AlertTestFireResponse, Alerts } from './alerts';
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
   *   location: 'location',
   *   name: 'name',
   *   provider: 'provider',
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
   * account. Requires the `checks:read` scope.
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
   * for await (const checkListResponse of client.checks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CheckListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CheckListResponsesOffset, CheckListResponse> {
    return this._client.getAPIList('/v1/checks', Offset<CheckListResponse>, { query, ...options });
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

export type CheckListResponsesOffset = Offset<CheckListResponse>;

export interface AlertChannel {
  /**
   * Channel-specific destination. URL for the webhook flavors
   * (slack/discord/teams/webhook), email address for `email`, integration key for
   * `pagerduty`, API key for `opsgenie`.
   */
  target: string;

  type: 'email' | 'slack' | 'discord' | 'teams' | 'webhook' | 'pagerduty' | 'opsgenie';

  /**
   * Type-specific options. Optional.
   */
  config?: { [key: string]: unknown };
}

export interface AlertConfig {
  channels: Array<AlertChannel>;

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

  /**
   * Absolute-time windows during which the evaluator suppresses dispatch but still
   * updates state. Cron-style recurring windows are a future enhancement.
   */
  maintenance_windows?: Array<MaintenanceWindow>;

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
   * Region/location on read responses is empty; populated on create requests only.
   */
  location?: string;

  /**
   * Cloud provider on read responses is empty; populated on create requests only.
   */
  provider?: string;
}

export interface MaintenanceWindow {
  end_unix_ms: number;

  start_unix_ms: number;
}

export interface CheckListResponse {
  checks: Array<Check>;

  /**
   * Offset to pass on the next request to continue pagination. Zero (or absent) when
   * there's no more data.
   */
  next_offset?: number;
}

export interface CheckCreateParams {
  enabled: boolean;

  /**
   * Provider-specific region/location.
   */
  location: string;

  name: string;

  /**
   * Cloud provider (`mock`, `ec2`, `ovh`, `azure`, `gcp`, `hetzner`).
   */
  provider: string;

  schedule: string;

  target_url: string;

  type: string;

  artifact_url?: string;

  config?: { [key: string]: unknown };

  timeout_ms?: number;
}

export interface CheckUpdateParams {
  artifact_url?: string;

  config?: { [key: string]: unknown };

  enabled?: boolean;

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
    type AlertChannel as AlertChannel,
    type AlertConfig as AlertConfig,
    type Check as Check,
    type MaintenanceWindow as MaintenanceWindow,
    type CheckListResponse as CheckListResponse,
    type CheckListResponsesOffset as CheckListResponsesOffset,
    type CheckCreateParams as CheckCreateParams,
    type CheckUpdateParams as CheckUpdateParams,
    type CheckListParams as CheckListParams,
  };

  export {
    Alerts as Alerts,
    type AlertTestFireResponse as AlertTestFireResponse,
    type AlertReplaceParams as AlertReplaceParams,
  };
}
