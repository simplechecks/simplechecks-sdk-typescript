// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Run-credit balance, Stripe Checkout top-ups, and purchase history.
 */
export class BalanceResource extends APIResource {
  /**
   * Thin sibling of GET /v1/account that returns just the balance and paused flag.
   * The CLI's `sc balance` command pulls this so it doesn't have to fetch the full
   * account row each time. Requires the `account:read` scope.
   */
  retrieve(options?: RequestOptions): APIPromise<Balance> {
    return this._client.get('/v1/balance', options);
  }
}

export interface Balance {
  /**
   * Cached run-credit balance.
   */
  balance: number;

  /**
   * True when execution is paused (e.g. balance exhausted).
   */
  paused: boolean;
}

export declare namespace BalanceResource {
  export { type Balance as Balance };
}
