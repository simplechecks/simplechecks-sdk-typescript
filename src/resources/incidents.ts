// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Read-only incident timeline derived from alert state.
 */
export class Incidents extends APIResource {
  /**
   * Returns incidents derived on read from `alert_state` (ongoing) and
   * `alert_dispatches` (resolved). Ordered ongoing-first, then most-recent-resolved
   * first. Pagination is offset-based; pass `next_offset` back to continue.
   *
   * Status semantics:
   *
   * - `ongoing` — `alert_state.current_incident_id` is set; `resolved_at_unix_ms` is
   *   omitted.
   * - `resolved` — a recovery dispatch has been enqueued; both timestamps are
   *   populated.
   *
   * Incidents that fired entirely inside a maintenance window won't appear here —
   * the dispatcher doesn't ledger suppressed dispatches. That matches the customer
   * expectation that maintenance windows mean "don't notify, don't surface as
   * urgent."
   *
   * Requires the `checks:read` scope (incidents are per-check; we reuse the existing
   * scope rather than minting a new one).
   */
  list(
    query: IncidentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IncidentListResponse> {
    return this._client.get('/v1/incidents', { query, ...options });
  }
}

/**
 * One alert-state lifecycle entry. Derived on read from `alert_state` +
 * `alert_dispatches` — there's no separate incidents table because the data is
 * fully reconstructable from the rows the evaluator already writes.
 */
export interface Incident {
  /**
   * Incident id (UUID; from `alert_state.current_incident_id`).
   */
  id: string;

  check_id: string;

  check_name: string;

  /**
   * When the evaluator fired the incident (unix-millis).
   */
  started_at_unix_ms: number;

  status: 'ongoing' | 'resolved';

  /**
   * Unix-millis of the recovery dispatch. Absent on ongoing incidents.
   */
  resolved_at_unix_ms?: number | null;
}

export interface IncidentListResponse {
  incidents: Array<Incident>;

  /**
   * Offset to pass on the next request. Zero (or absent) when there's no more data.
   */
  next_offset?: number;
}

export interface IncidentListParams {
  /**
   * Max number of incidents to return. Defaults to 50; server caps at 500.
   */
  limit?: number;

  /**
   * Number of incidents to skip. Pass the `next_offset` from the previous page.
   */
  offset?: number;
}

export declare namespace Incidents {
  export {
    type Incident as Incident,
    type IncidentListResponse as IncidentListResponse,
    type IncidentListParams as IncidentListParams,
  };
}
