// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChecksAPI from './checks';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Per-check alert configuration + test-fire endpoint (PR-Alerts/1).
 */
export class Alerts extends APIResource {
  /**
   * Returns the per-check alert configuration: enabled flag, thresholds, M-of-N
   * consensus, maintenance windows, channels. Requires the `checks:read` scope.
   *
   * @example
   * ```ts
   * const alertConfig = await client.checks.alerts.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ChecksAPI.AlertConfig> {
    return this._client.get(path`/v1/checks/${id}/alerts`, options);
  }

  /**
   * Subsequent runs will not be evaluated for alerts. State rows in `alert_state`
   * and `alert_location_state` cascade with the underlying check; deleting just the
   * config leaves them behind harmlessly. Requires the `checks:write` scope.
   *
   * @example
   * ```ts
   * await client.checks.alerts.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/checks/${id}/alerts`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Idempotent upsert. The same body shape is returned by GET. Channels supported:
   * email, slack, discord, teams, webhook, pagerduty, opsgenie. The PR-Alerts/1
   * evaluator runs M-of-N consensus before incident-firing; if fewer than
   * `consensus_m` locations have observations, the rule falls back to "any failing =
   * failing" so brand-new checks don't miss outages.
   *
   * Eventual-consistency contract: after a config write, the evaluator picks up the
   * new thresholds on the next ingest cycle (15s push cadence).
   *
   * Requires the `checks:write` scope.
   *
   * @example
   * ```ts
   * const alertConfig = await client.checks.alerts.replace(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     channels: [{ target: 'target', type: 'email' }],
   *     consecutive_failures_threshold: 1,
   *     consensus_m: 1,
   *     consensus_n: 1,
   *     enabled: true,
   *   },
   * );
   * ```
   */
  replace(id: string, body: AlertReplaceParams, options?: RequestOptions): APIPromise<ChecksAPI.AlertConfig> {
    return this._client.put(path`/v1/checks/${id}/alerts`, { body, ...options });
  }

  /**
   * Synthesizes a `test_fire` dispatch per channel and enqueues them for the async
   * dispatcher. Useful for verifying that a Slack webhook URL or PagerDuty
   * integration key actually works without waiting for a real failure. The test
   * dispatches do not affect alert state or incident lifecycle. Requires the
   * `checks:write` scope.
   *
   * @example
   * ```ts
   * const response = await client.checks.alerts.testFire(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  testFire(id: string, options?: RequestOptions): APIPromise<AlertTestFireResponse> {
    return this._client.post(path`/v1/checks/${id}/alerts:test`, options);
  }
}

export interface AlertTestFireResponse {
  /**
   * Total channels configured on the check.
   */
  channel_count: number;

  /**
   * Number of dispatches accepted (un-deduped).
   */
  enqueued: number;

  /**
   * Synthetic incident id used to dedupe the test dispatches against accidental
   * double-clicks.
   */
  incident_id: string;
}

export interface AlertReplaceParams {
  channels: Array<AlertReplaceParams.Channel>;

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

  /**
   * Absolute-time windows during which the evaluator suppresses dispatch but still
   * updates state. Cron-style recurring windows are a future enhancement.
   */
  maintenance_windows?: Array<AlertReplaceParams.MaintenanceWindow>;
}

export namespace AlertReplaceParams {
  export interface Channel {
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

  export interface MaintenanceWindow {
    end_unix_ms: number;

    start_unix_ms: number;
  }
}

export declare namespace Alerts {
  export {
    type AlertTestFireResponse as AlertTestFireResponse,
    type AlertReplaceParams as AlertReplaceParams,
  };
}
