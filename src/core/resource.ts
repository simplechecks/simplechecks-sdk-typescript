// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Simplechecks } from '../client';

export abstract class APIResource {
  protected _client: Simplechecks;

  constructor(client: Simplechecks) {
    this._client = client;
  }
}
