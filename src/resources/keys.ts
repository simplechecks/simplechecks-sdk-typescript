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
   * Mints a fresh PAT for the caller's account. The plaintext token is returned
   * **once**; clients must persist it before discarding the response. Empty `scopes`
   * means the server applies its default scope set. Requires the `keys:write` scope.
   */
  create(body: KeyCreateParams, options?: RequestOptions): APIPromise<KeyCreateResponse> {
    return this._client.post('/v1/keys', { body, ...options });
  }

  /**
   * Returns every API key for the caller's account, including revoked ones. The
   * plaintext token is never returned by this endpoint — only by POST /v1/keys at
   * mint time. Requires the `keys:read` scope.
   */
  list(options?: RequestOptions): APIPromise<KeyListResponse> {
    return this._client.get('/v1/keys', options);
  }

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

export interface KeyCreateResponse {
  key_id: string;

  /**
   * Full `sc_live_…` token. Returned once; not retrievable later. Clients MUST
   * persist this before discarding the response.
   */
  plaintext_token: string;

  prefix: string;
}

export interface KeyListResponse {
  keys: Array<APIKey>;
}

export interface KeyCreateParams {
  /**
   * Operator/customer-facing label.
   */
  name: string;

  /**
   * Scope strings (e.g. `checks:read`). Empty = server applies its default set.
   * Unknown scopes return InvalidArgument.
   */
  scopes?: Array<string>;
}

export declare namespace Keys {
  export {
    type APIKey as APIKey,
    type KeyCreateResponse as KeyCreateResponse,
    type KeyListResponse as KeyListResponse,
    type KeyCreateParams as KeyCreateParams,
  };
}
