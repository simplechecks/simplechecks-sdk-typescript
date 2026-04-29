// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Account profile and balance.
 */
export class Account extends APIResource {
  /**
   * Returns the account row stitched together with the cached billing balance and
   * the `paused` flag, so a single dashboard read fetches everything the customer's
   * home page needs. Requires the `account:read` scope.
   */
  retrieve(options?: RequestOptions): APIPromise<AccountRetrieveResponse> {
    return this._client.get('/v1/account', options);
  }
}

/**
 * Account profile + cached billing balance. Returned by GET /v1/account.
 */
export interface AccountRetrieveResponse {
  /**
   * Cached run-credit balance, in run-credit units.
   */
  balance: number;

  created_at: string;

  name: string;

  /**
   * True when execution is paused (e.g. balance exhausted).
   */
  paused: boolean;

  /**
   * Billing plan identifier.
   */
  plan: string;

  /**
   * Renameable URL-friendly handle. Display only — never use as a system identifier.
   */
  slug: string;

  /**
   * Stable account identifier (`acct_<typeid>`). Used in API responses and audit
   * logs.
   */
  typeid: string;
}

export declare namespace Account {
  export { type AccountRetrieveResponse as AccountRetrieveResponse };
}
