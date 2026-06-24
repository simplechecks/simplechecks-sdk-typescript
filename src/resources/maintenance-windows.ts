// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import {
  MaintenanceWindowsCursor,
  type MaintenanceWindowsCursorParams,
  PagePromise,
} from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Account-scoped windows that pause execution of their targeted
 * checks for the scheduled interval(s); paused runs are not recorded
 * and never count against uptime.
 */
export class MaintenanceWindows extends APIResource {
  /**
   * Creates a maintenance window that pauses execution of its targeted checks for
   * the scheduled interval(s). `schedule_kind` is `one_time` or `recurring`;
   * recurrence fields (`repeat_unit`, `repeat_interval`, `repeat_ends_unix_ms`) are
   * valid only for a recurring window. `timezone` is an IANA name. `check_ids` are
   * raw check UUIDs and must belong to your account; a check id that doesn't
   * returns 404. Requires the `alerts:write` scope (owner/admin only).
   */
  create(body: MaintenanceWindowCreateParams, options?: RequestOptions): APIPromise<MaintenanceWindow> {
    return this._client.post('/v1/maintenance-windows', { body, ...options });
  }

  /**
   * Returns the window with its targeting. 404 if no such window exists for the
   * calling account. Requires the `alerts:read` scope.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<MaintenanceWindow> {
    return this._client.get(path`/v1/maintenance-windows/${id}`, options);
  }

  /**
   * Updates the supplied fields. A non-null `check_ids` replaces the targeting set;
   * a check id that isn't your account's returns 404. The effective schedule is
   * re-validated. Omitted fields are unchanged. Requires the `alerts:write` scope
   * (owner/admin only).
   */
  update(
    id: string,
    body: MaintenanceWindowUpdateParams,
    options?: RequestOptions,
  ): APIPromise<MaintenanceWindow> {
    return this._client.patch(path`/v1/maintenance-windows/${id}`, { body, ...options });
  }

  /**
   * Returns the caller's maintenance windows with cursor pagination. Each window
   * carries its explicit check targeting (`check_ids`). `next_cursor` is set when a
   * full page was returned and null on the final page. Requires the `alerts:read`
   * scope.
   */
  list(
    query: MaintenanceWindowListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MaintenanceWindowsMaintenanceWindowsCursor, MaintenanceWindow> {
    return this._client.getAPIList('/v1/maintenance-windows', MaintenanceWindowsCursor<MaintenanceWindow>, {
      query,
      ...options,
    });
  }

  /**
   * Removes the window and its targeting; affected checks resume normal execution.
   * Requires the `alerts:write` scope (owner/admin only).
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/maintenance-windows/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type MaintenanceWindowsMaintenanceWindowsCursor = MaintenanceWindowsCursor<MaintenanceWindow>;

/**
 * A maintenance window that pauses execution of its targeted checks for the
 * scheduled interval(s). The DST-correct occurrence expansion is performed by the
 * control plane; this resource carries the stored schedule shape plus its explicit
 * targeting.
 */
export interface MaintenanceWindow {
  /**
   * Window id in `mwin_<typeid>` form.
   */
  id: string;

  /**
   * Owning account's `acct_<typeid>`. Read-only.
   */
  account_typeid: string;

  /**
   * Raw UUIDs of the targeted checks.
   */
  check_ids: Array<string>;

  /**
   * Reserved for tag-based targeting; accepted but not yet consumed.
   */
  check_tags: Array<string>;

  created_at: string;

  /**
   * Window duration in milliseconds (> 0).
   */
  duration_ms: number;

  name: string;

  schedule_kind: 'one_time' | 'recurring';

  /**
   * First occurrence start, Unix epoch milliseconds.
   */
  start_unix_ms: number;

  /**
   * IANA timezone name (e.g. "America/Chicago"). Defaults to UTC.
   */
  timezone: string;

  updated_at: string;

  /**
   * Recurrence end bound, Unix epoch ms; recurring only.
   */
  repeat_ends_unix_ms?: number;

  /**
   * Recurrence interval (e.g. every N units); recurring only.
   */
  repeat_interval?: number;

  /**
   * Recurrence unit; present only for a recurring window.
   */
  repeat_unit?: 'DAY' | 'WEEK' | 'MONTH';
}

export interface MaintenanceWindowCreateParams {
  /**
   * Window duration in milliseconds; must be positive.
   */
  duration_ms: number;

  name: string;

  schedule_kind: 'one_time' | 'recurring';

  start_unix_ms: number;

  /**
   * Raw check UUIDs to target (must belong to your account).
   */
  check_ids?: Array<string>;

  check_tags?: Array<string>;

  /**
   * Valid only for a recurring window.
   */
  repeat_ends_unix_ms?: number;

  /**
   * Valid only for a recurring window; must be positive.
   */
  repeat_interval?: number;

  /**
   * Valid only for a recurring window.
   */
  repeat_unit?: 'DAY' | 'WEEK' | 'MONTH';

  /**
   * IANA timezone name. Defaults to UTC when omitted.
   */
  timezone?: string;
}

export interface MaintenanceWindowUpdateParams {
  check_ids?: Array<string>;

  check_tags?: Array<string>;

  duration_ms?: number;

  name?: string;

  repeat_ends_unix_ms?: number;

  repeat_interval?: number;

  repeat_unit?: 'DAY' | 'WEEK' | 'MONTH';

  schedule_kind?: 'one_time' | 'recurring';

  start_unix_ms?: number;

  timezone?: string;
}

export interface MaintenanceWindowListParams extends MaintenanceWindowsCursorParams {}

export declare namespace MaintenanceWindows {
  export {
    type MaintenanceWindow as MaintenanceWindow,
    type MaintenanceWindowsMaintenanceWindowsCursor as MaintenanceWindowsMaintenanceWindowsCursor,
    type MaintenanceWindowCreateParams as MaintenanceWindowCreateParams,
    type MaintenanceWindowUpdateParams as MaintenanceWindowUpdateParams,
    type MaintenanceWindowListParams as MaintenanceWindowListParams,
  };
}
