// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * CRUD for synthetic-monitoring checks.
 */
export class Checks extends APIResource {
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
   * const checks = await client.checks.list();
   * ```
   */
  list(
    query: CheckListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CheckListResponse> {
    return this._client.get('/v1/checks', { query, ...options });
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

export interface CheckListParams {
  /**
   * Max number of checks to return. Defaults to 100; the server caps further.
   */
  limit?: number;

  /**
   * Number of checks to skip. Pass the `next_offset` from the previous page.
   */
  offset?: number;
}

export declare namespace Checks {
  export {
    type Check as Check,
    type CheckListResponse as CheckListResponse,
    type CheckCreateParams as CheckCreateParams,
    type CheckUpdateParams as CheckUpdateParams,
    type CheckListParams as CheckListParams,
  };
}
