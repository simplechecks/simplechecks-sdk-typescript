// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Run-credit balance, Stripe Checkout top-ups, and purchase history.
 */
export class Purchases extends APIResource {
  /**
   * Returns every Stripe Checkout bundle purchase for the caller's account, newest
   * first. Powers the "Invoices" section of Settings → Billing in the webapp. The
   * `receipt_url`, when present, links to the Stripe-hosted receipt PDF. Reading
   * purchase history requires only the default-scope `account:read` — spending money
   * on a new purchase requires the opt-in `billing:write` scope (POST
   * /v1/checkout-session).
   */
  list(
    query: PurchaseListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PurchaseListResponse> {
    return this._client.get('/v1/purchases', { query, ...options });
  }
}

/**
 * One row of the customer's Stripe Checkout bundle purchase history. Tokens are
 * credited at fulfillment time; pending and failed rows reflect Checkout sessions
 * that did not complete.
 */
export interface Purchase {
  /**
   * Server-side purchase id.
   */
  id: string;

  /**
   * Customer-paid amount in the smallest currency unit (e.g., USD cents).
   */
  amount_cents: number;

  /**
   * Bundle identifier (e.g., `starter`, `growth`, `scale`, `team`).
   */
  bundle_sku: string;

  /**
   * When the Checkout session was minted.
   */
  created_at: string;

  /**
   * ISO 4217 currency code (e.g., `usd`).
   */
  currency: string;

  status: 'pending' | 'fulfilled' | 'failed';

  /**
   * Stripe Checkout session that originated this purchase.
   */
  stripe_session_id: string;

  /**
   * Total tokens credited on fulfillment (includes any bonus).
   */
  tokens: number;

  /**
   * When the payment landed and tokens were credited; absent for non-fulfilled rows.
   */
  fulfilled_at?: string;

  /**
   * Stripe-hosted receipt PDF URL. Absent for in-flight purchases and for fulfilled
   * purchases whose payment event did not surface a receipt (e.g., asynchronous
   * payment methods).
   */
  receipt_url?: string;
}

export interface PurchaseListResponse {
  purchases: Array<Purchase>;
}

export interface PurchaseListParams {
  /**
   * Page size. Server applies a default of 100 when omitted or when set to 0; values
   * above the server cap are clamped.
   */
  limit?: number;

  /**
   * Pagination offset within the newest-first list.
   */
  offset?: number;
}

export declare namespace Purchases {
  export {
    type Purchase as Purchase,
    type PurchaseListResponse as PurchaseListResponse,
    type PurchaseListParams as PurchaseListParams,
  };
}
