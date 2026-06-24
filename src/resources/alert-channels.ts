// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { AlertChannelsCursor, type AlertChannelsCursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Reusable, account-scoped notification destinations (webhook,
 * Slack, Discord, Teams, PagerDuty, Opsgenie, email). One channel
 * can serve many checks. Includes a test-fire endpoint.
 */
export class AlertChannels extends APIResource {
  /**
   * Creates a reusable notification destination. URL-bearing types (`webhook`,
   * `slack`, `discord`, `teams`) are SSRF-filtered: targets resolving to private,
   * loopback, or link-local addresses are rejected. The `target` is write-only —
   * it's masked on every read. Requires the `alerts:write` scope (owner/admin only).
   */
  create(body: AlertChannelCreateParams, options?: RequestOptions): APIPromise<AlertChannel> {
    return this._client.post('/v1/alert-channels', { body, ...options });
  }

  /**
   * Returns the alert channel. The `target` secret is masked. 404 if no such channel
   * exists for the calling account. Requires the `alerts:read` scope.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<AlertChannel> {
    return this._client.get(path`/v1/alert-channels/${id}`, options);
  }

  /**
   * All fields are optional; omitted fields are unchanged. A `target` equal to the
   * masked value (`***<last4>`) is a no-op — only a fresh, non-masked secret updates
   * the stored target. Requires the `alerts:write` scope (owner/admin only).
   */
  update(id: string, body: AlertChannelUpdateParams, options?: RequestOptions): APIPromise<AlertChannel> {
    return this._client.patch(path`/v1/alert-channels/${id}`, { body, ...options });
  }

  /**
   * Returns the caller's reusable alert channels with cursor pagination.
   * `next_cursor` is set when a full page was returned and null on the final page.
   * The `target` secret is always masked (`***<last4>`); the raw value is never
   * returned. Requires the `alerts:read` scope.
   */
  list(
    query: AlertChannelListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AlertChannelsAlertChannelsCursor, AlertChannel> {
    return this._client.getAPIList('/v1/alert-channels', AlertChannelsCursor<AlertChannel>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes the channel and cascades its subscriptions (the bound checks simply stop
   * notifying it). Requires the `alerts:write` scope (owner/admin only).
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/alert-channels/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Enqueues a single `test_fire` dispatch through the channel so a customer can
   * verify the destination works. Idempotent on the channel id (repeated clicks
   * dedup). Requires the `alerts:write` scope (owner/admin only).
   */
  testFire(id: string, options?: RequestOptions): APIPromise<AlertChannelTestFireResponse> {
    return this._client.post(path`/v1/alert-channels/${id}:test`, options);
  }
}

export type AlertChannelsAlertChannelsCursor = AlertChannelsCursor<AlertChannel>;

/**
 * A first-class, reusable alert channel. Referenced by many checks through alert
 * subscriptions. The `target` secret is always returned masked (`***<last4>`).
 */
export interface AlertChannel {
  /**
   * Channel id in `chan_<typeid>` form.
   */
  id: string;

  /**
   * Owning account's `acct_<typeid>`. Read-only.
   */
  account_typeid: string;

  created_at: string;

  /**
   * Account-unique display name.
   */
  name: string;

  /**
   * Masked destination secret (`***<last4>`). The raw value is write-only and never
   * returned.
   */
  target: string;

  type: 'slack' | 'discord' | 'teams' | 'webhook' | 'pagerduty' | 'opsgenie' | 'email';

  updated_at: string;

  /**
   * Type-specific options. Optional.
   */
  config?: { [key: string]: unknown };
}

export interface AlertChannelTestFireResponse {
  /**
   * 1 if a new dispatch was enqueued, 0 if it deduped.
   */
  enqueued: number;

  /**
   * Synthetic incident id for the test dispatch.
   */
  incident_id: string;
}

export interface AlertChannelCreateParams {
  name: string;

  /**
   * Destination secret. URL for the webhook flavors (slack/discord/teams/webhook),
   * email address for `email`, integration key for `pagerduty`, API key for
   * `opsgenie`. URL-bearing types are SSRF-filtered.
   */
  target: string;

  type: 'slack' | 'discord' | 'teams' | 'webhook' | 'pagerduty' | 'opsgenie' | 'email';

  config?: { [key: string]: unknown };
}

export interface AlertChannelUpdateParams {
  config?: { [key: string]: unknown };

  name?: string;

  target?: string;

  type?: 'slack' | 'discord' | 'teams' | 'webhook' | 'pagerduty' | 'opsgenie' | 'email';
}

export interface AlertChannelListParams extends AlertChannelsCursorParams {}

export declare namespace AlertChannels {
  export {
    type AlertChannel as AlertChannel,
    type AlertChannelTestFireResponse as AlertChannelTestFireResponse,
    type AlertChannelsAlertChannelsCursor as AlertChannelsAlertChannelsCursor,
    type AlertChannelCreateParams as AlertChannelCreateParams,
    type AlertChannelUpdateParams as AlertChannelUpdateParams,
    type AlertChannelListParams as AlertChannelListParams,
  };
}
