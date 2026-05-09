// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Manage personal access tokens (PATs).
 */
export class Keys extends APIResource {
  /**
   * Marks the key revoked. Subsequent ext_authz checks reject requests authenticated
   * with this key. The row stays for audit. Requires the `keys:write` scope.
   */
  revoke(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/keys/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * An account-scoped personal access token (PAT). The plaintext token never appears
 * here; it's only returned by POST /v1/keys at mint time.
 */
export interface APIKey {
  /**
   * Server-side key id (used for revoke).
   */
  id: string;

  account_typeid: string;

  created_at: string;

  /**
   * Operator/customer-facing label.
   */
  name: string;

  /**
   * Logging-safe visible portion (e.g. `sc_live_xxx`).
   */
  prefix: string;

  scopes: Array<string>;

  last_used_at?: string;

  revoked_at?: string;
}

export declare namespace Keys {
  export { type APIKey as APIKey };
}
