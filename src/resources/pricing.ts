// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class PricingResource extends APIResource {
  /**
   * Returns the active token-pricing table so a client can show the per-provider
   * cost of a check at configuration time. The cost of one run is
   * `floor(weight × multiplier_milli / 1000)`, where `weight` is the check type's
   * compute weight plus its artifact-egress component, and the multiplier resolves
   * `(provider, location)` → `(provider, "")` → `1.0` (returned as `1000` milli).
   * The result equals what metering debits, so a UI preview is exact.
   *
   * The provider multiplier is the customer-facing cost lever: cheaper providers
   * (e.g. OVH, Hetzner) carry a multiplier below 1.0. Reads of this table are free.
   *
   * Requires the `account:read` scope — pricing is incidental to account/check
   * configuration, not a per-check write.
   */
  retrieve(options?: RequestOptions): APIPromise<Pricing> {
    return this._client.get('/v1/pricing', options);
  }
}

/**
 * The active token-pricing table. cost(run) =
 * `floor(weight × multiplier_milli / 1000)`, multiplier resolving
 * `(provider, location)` → `(provider, "")` → `1.0` (1000 milli).
 */
export interface Pricing {
  check_types: Array<Pricing.CheckType>;

  multipliers: Array<Pricing.Multiplier>;
}

export namespace Pricing {
  /**
   * One check type's per-run weight (compute + artifact egress), pre-multiplier.
   */
  export interface CheckType {
    /**
     * Check type identifier.
     */
    check_type: string;

    /**
     * The artifact-egress portion of `weight` (0 for non-artifact types). Surfaced so
     * a UI can label the artifact-retrieval cost of a browser/playwright run.
     */
    egress_weight: number;

    /**
     * Per-run weight, compute plus artifact egress (pre-multiplier).
     */
    weight: number;
  }

  /**
   * One (provider, location) cost multiplier.
   */
  export interface Multiplier {
    /**
     * Provider-native location id; empty for a provider-wide default.
     */
    location: string;

    /**
     * Multiplier × 1000 (e.g. 500 = 0.5×, the cheap-provider wedge).
     */
    multiplier_milli: number;

    provider: string;
  }
}

export declare namespace PricingResource {
  export { type Pricing as Pricing };
}
