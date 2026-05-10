// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { SimpleChecks } from '../client';

export abstract class APIResource {
  protected _client: SimpleChecks;

  constructor(client: SimpleChecks) {
    this._client = client;
  }
}
