// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Per-check alert configuration + test-fire endpoint (PR-Alerts/1).
 */
export class Alerts extends APIResource {
  /**
   * Subsequent runs will not be evaluated for alerts. State rows in `alert_state`
   * and `alert_location_state` cascade with the underlying check; deleting just the
   * config leaves them behind harmlessly. Requires the `checks:write` scope.
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/checks/${id}/alerts`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}
