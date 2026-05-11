// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Catalog of (provider, location) deployments Simple Checks runs
 * checks from, with geographic metadata + live status. Used to
 * drive the region picker and the dashboard's locations map.
 */
export class Locations extends APIResource {
  /**
   * Returns every (provider, location) Simple Checks deploys garrisons at, enriched
   * with geographic metadata (city, country, continent, IATA-style metro code,
   * lat/lon) and live garrison status. The catalog of locations is code-defined and
   * identical across customers; only `status` is dynamic.
   *
   * Locations whose backing garrison hasn't been provisioned yet are returned with
   * `status: "unprovisioned"` so the dashboard can grey them out while keeping the
   * catalog visible.
   *
   * Requires the `account:read` scope — listing locations is incidental to account
   * configuration, not a per-check write.
   */
  list(options?: RequestOptions): APIPromise<LocationListResponse> {
    return this._client.get('/v1/locations', options);
  }
}

/**
 * One deployed (provider, data-center) tuple where Simple Checks runs garrisons,
 * with geographic metadata + live status.
 */
export interface Location {
  /**
   * Composite identifier; `<provider>:<location>` (e.g. `aws:us-east-1`).
   */
  id: string;

  city: string;

  continent: 'NA' | 'SA' | 'EU' | 'AS' | 'AF' | 'OC' | 'AN';

  /**
   * ISO 3166-1 alpha-2 country code.
   */
  country: string;

  /**
   * Provider-native data-center id (varies in format per provider).
   */
  location: string;

  /**
   * Cloud provider.
   */
  provider: string;

  /**
   * Live garrison status. `unprovisioned` means the location is code-defined but no
   * garrison row exists yet (deploy pending); dashboard typically greys these out.
   */
  status: 'ready' | 'draining' | 'maintenance' | 'unprovisioned';

  /**
   * Metro-center latitude (degrees, WGS84).
   */
  lat?: number;

  /**
   * Metro-center longitude (degrees, WGS84).
   */
  lon?: number;

  /**
   * IATA-style 3-letter code for the nearest major metro. Empty for the mock
   * provider; "loose anchor" (not a precise claim) for non-airport-adjacent sites
   * like Hetzner Falkenstein.
   */
  metro?: string;
}

export interface LocationListResponse {
  locations: Array<Location>;
}

export declare namespace Locations {
  export { type Location as Location, type LocationListResponse as LocationListResponse };
}
