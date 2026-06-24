// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import {
  AlertSubscriptionsCursor,
  type AlertSubscriptionsCursorParams,
  PagePromise,
} from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Bindings of a check to an alert channel, each carrying its own
 * notify-on-failure / notify-on-recovery flags.
 */
export class AlertSubscriptions extends APIResource {
  /**
   * Binds a check to a channel and carries the per-binding notify flags
   * (`notify_on_failure`, `notify_on_recovery`, both default true). The binding is
   * account-scoped: a check or channel that isn't yours yields 404. A duplicate
   * `(check_id, channel_id)` binding yields 409. Requires the `alerts:write` scope
   * (owner/admin only).
   */
  create(body: AlertSubscriptionCreateParams, options?: RequestOptions): APIPromise<AlertSubscription> {
    return this._client.post('/v1/alert-subscriptions', { body, ...options });
  }

  /**
   * Returns the subscription. 404 if no such subscription exists for the calling
   * account. Requires the `alerts:read` scope.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<AlertSubscription> {
    return this._client.get(path`/v1/alert-subscriptions/${id}`, options);
  }

  /**
   * Updates only the notify flags (`notify_on_failure`, `notify_on_recovery`); the
   * check and channel bindings are immutable. Omitted flags are unchanged. Requires
   * the `alerts:write` scope (owner/admin only).
   */
  update(
    id: string,
    body: AlertSubscriptionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AlertSubscription> {
    return this._client.patch(path`/v1/alert-subscriptions/${id}`, { body, ...options });
  }

  /**
   * Returns the caller's check↔channel subscriptions with cursor pagination.
   * Optionally filter by `check_id` and/or `channel_id`. `next_cursor` is set when a
   * full page was returned and null on the final page. Requires the `alerts:read`
   * scope.
   */
  list(
    query: AlertSubscriptionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AlertSubscriptionsAlertSubscriptionsCursor, AlertSubscription> {
    return this._client.getAPIList('/v1/alert-subscriptions', AlertSubscriptionsCursor<AlertSubscription>, {
      query,
      ...options,
    });
  }

  /**
   * Removes the binding; the check stops notifying that channel. Requires the
   * `alerts:write` scope (owner/admin only).
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/alert-subscriptions/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AlertSubscriptionsAlertSubscriptionsCursor = AlertSubscriptionsCursor<AlertSubscription>;

/**
 * A binding between one check and one alert channel, carrying the per-binding
 * notify flags. The same channel can be subscribed by many checks, each with its
 * own flags.
 */
export interface AlertSubscription {
  /**
   * Subscription id in `asub_<typeid>` form.
   */
  id: string;

  /**
   * Owning account's `acct_<typeid>`. Read-only.
   */
  account_typeid: string;

  /**
   * The bound channel's id in `chan_<typeid>` form.
   */
  channel_id: string;

  /**
   * The subscribed check's id.
   */
  check_id: string;

  created_at: string;

  /**
   * When true, an incident-started event dispatches to this channel.
   */
  notify_on_failure: boolean;

  /**
   * When true, an incident-recovered event dispatches to this channel.
   */
  notify_on_recovery: boolean;

  updated_at: string;
}

export interface AlertSubscriptionCreateParams {
  /**
   * The channel to bind in `chan_<typeid>` form (must belong to your account).
   */
  channel_id: string;

  /**
   * The check to subscribe (must belong to your account).
   */
  check_id: string;

  /**
   * Defaults to true when omitted.
   */
  notify_on_failure?: boolean;

  /**
   * Defaults to true when omitted.
   */
  notify_on_recovery?: boolean;
}

export interface AlertSubscriptionUpdateParams {
  notify_on_failure?: boolean;

  notify_on_recovery?: boolean;
}

export interface AlertSubscriptionListParams extends AlertSubscriptionsCursorParams {
  /**
   * Filter to subscriptions for this channel (`chan_<typeid>`).
   */
  channel_id?: string;

  /**
   * Filter to subscriptions for this check (raw check UUID).
   */
  check_id?: string;
}

export declare namespace AlertSubscriptions {
  export {
    type AlertSubscription as AlertSubscription,
    type AlertSubscriptionsAlertSubscriptionsCursor as AlertSubscriptionsAlertSubscriptionsCursor,
    type AlertSubscriptionCreateParams as AlertSubscriptionCreateParams,
    type AlertSubscriptionUpdateParams as AlertSubscriptionUpdateParams,
    type AlertSubscriptionListParams as AlertSubscriptionListParams,
  };
}
