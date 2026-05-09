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
   * Disables the check. Requires the `checks:write` scope.
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

export declare namespace Checks {
  export { type Check as Check };
}
