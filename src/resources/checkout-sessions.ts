// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Run-credit balance, Stripe Checkout top-ups, and purchase history.
 */
export class CheckoutSessions extends APIResource {
  /**
   * Returns a Stripe-hosted checkout URL the customer pays on. The webhook fulfils
   * the purchase asynchronously after the customer completes payment. Requires the
   * `billing:write` scope (opt-in; not in the default scope set, since spending
   * money should be a deliberate choice).
   */
  create(body: CheckoutSessionCreateParams, options?: RequestOptions): APIPromise<CheckoutSession> {
    return this._client.post('/v1/checkout-session', { body, ...options });
  }
}

export interface CheckoutSession {
  /**
   * Stripe-hosted page the customer pays on.
   */
  checkout_url: string;

  stripe_session_id: string;

  expires_at?: string;
}

export interface CheckoutSessionCreateParams {
  bundle_sku: 'starter' | 'growth' | 'scale' | 'team';
}

export declare namespace CheckoutSessions {
  export {
    type CheckoutSession as CheckoutSession,
    type CheckoutSessionCreateParams as CheckoutSessionCreateParams,
  };
}
