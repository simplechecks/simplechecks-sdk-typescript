// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { IncidentsOffset, type IncidentsOffsetParams, PagePromise } from '../core/pagination';
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
  ): PagePromise<IncidentsIncidentsOffset, Incident> {
    return this._client.getAPIList('/v1/incidents', IncidentsOffset<Incident>, { query, ...options });
  }
}

export type IncidentsIncidentsOffset = IncidentsOffset<Incident>;

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

export interface IncidentListParams extends IncidentsOffsetParams {}

export declare namespace Incidents {
  export {
    type Incident as Incident,
    type IncidentsIncidentsOffset as IncidentsIncidentsOffset,
    type IncidentListParams as IncidentListParams,
  };
}
