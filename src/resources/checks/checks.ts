// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AlertsAPI from './alerts';
import { Alerts } from './alerts';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * CRUD for synthetic-monitoring checks.
 */
export class Checks extends APIResource {
  alerts: AlertsAPI.Alerts = new AlertsAPI.Alerts(this._client);

  /**
   * Disables the check. Requires the `checks:write` scope.
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/checks/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface AlertConfig {
  channels: Array<AlertConfig.Channel>;

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
  maintenance_windows?: Array<AlertConfig.MaintenanceWindow>;

  updated_at?: string;
}

export namespace AlertConfig {
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

Checks.Alerts = Alerts;

export declare namespace Checks {
  export { type AlertConfig as AlertConfig, type Check as Check };

  export { Alerts as Alerts };
}
