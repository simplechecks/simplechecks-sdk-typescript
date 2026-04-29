// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Liveness + readiness.
 */
export class Healthz extends APIResource {
  /**
   * Returns 200 when the process is up. webapp/api is stateless, so "the process is
   * up" is the entire health story; Kubernetes uses this for both liveness and
   * readiness probes. Public — no auth.
   */
  check(options?: RequestOptions): APIPromise<HealthzCheckResponse> {
    return this._client.get('/healthz', { ...options, __security: {} });
  }
}

export interface HealthzCheckResponse {
  status: string;
}

export declare namespace Healthz {
  export { type HealthzCheckResponse as HealthzCheckResponse };
}
