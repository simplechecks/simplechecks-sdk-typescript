// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { SimpleChecksError } from './error';
import { FinalRequestOptions } from '../internal/request-options';
import { defaultParseResponse } from '../internal/parse';
import { type SimpleChecks } from '../client';
import { APIPromise } from './api-promise';
import { type APIResponseProps } from '../internal/parse';
import { maybeObj } from '../internal/utils/values';

export type PageRequestOptions = Pick<FinalRequestOptions, 'query' | 'headers' | 'body' | 'path' | 'method'>;

export abstract class AbstractPage<Item> implements AsyncIterable<Item> {
  #client: SimpleChecks;
  protected options: FinalRequestOptions;

  protected response: Response;
  protected body: unknown;

  constructor(client: SimpleChecks, response: Response, body: unknown, options: FinalRequestOptions) {
    this.#client = client;
    this.options = options;
    this.response = response;
    this.body = body;
  }

  abstract nextPageRequestOptions(): PageRequestOptions | null;

  abstract getPaginatedItems(): Item[];

  hasNextPage(): boolean {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageRequestOptions() != null;
  }

  async getNextPage(): Promise<this> {
    const nextOptions = this.nextPageRequestOptions();
    if (!nextOptions) {
      throw new SimpleChecksError(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    }

    return await this.#client.requestAPIList(this.constructor as any, nextOptions);
  }

  async *iterPages(): AsyncGenerator<this> {
    let page: this = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
}

/**
 * This subclass of Promise will resolve to an instantiated Page once the request completes.
 *
 * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
 *
 *    for await (const item of client.items.list()) {
 *      console.log(item)
 *    }
 */
export class PagePromise<
    PageClass extends AbstractPage<Item>,
    Item = ReturnType<PageClass['getPaginatedItems']>[number],
  >
  extends APIPromise<PageClass>
  implements AsyncIterable<Item>
{
  constructor(
    client: SimpleChecks,
    request: Promise<APIResponseProps>,
    Page: new (...args: ConstructorParameters<typeof AbstractPage>) => PageClass,
  ) {
    super(
      client,
      request,
      async (client, props) =>
        new Page(client, props.response, await defaultParseResponse(client, props), props.options),
    );
  }

  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
}

export interface OffsetResponse<Item> {
  checks: Array<Item>;

  next_offset: number | null;
}

export interface OffsetParams {
  offset?: number;

  limit?: number;
}

export class Offset<Item> extends AbstractPage<Item> implements OffsetResponse<Item> {
  checks: Array<Item>;

  next_offset: number | null;

  constructor(
    client: SimpleChecks,
    response: Response,
    body: OffsetResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.checks = body.checks || [];
    this.next_offset = body.next_offset || null;
  }

  getPaginatedItems(): Item[] {
    return this.checks ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const offset = (this.options.query as OffsetParams).offset ?? 0;
    const length = this.getPaginatedItems().length;
    const currentCount = offset + length;

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        offset: currentCount,
      },
    };
  }
}

export interface IncidentsOffsetResponse<Item> {
  incidents: Array<Item>;

  next_offset: number | null;
}

export interface IncidentsOffsetParams {
  offset?: number;

  limit?: number;
}

export class IncidentsOffset<Item> extends AbstractPage<Item> implements IncidentsOffsetResponse<Item> {
  incidents: Array<Item>;

  next_offset: number | null;

  constructor(
    client: SimpleChecks,
    response: Response,
    body: IncidentsOffsetResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.incidents = body.incidents || [];
    this.next_offset = body.next_offset || null;
  }

  getPaginatedItems(): Item[] {
    return this.incidents ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const offset = (this.options.query as IncidentsOffsetParams).offset ?? 0;
    const length = this.getPaginatedItems().length;
    const currentCount = offset + length;

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        offset: currentCount,
      },
    };
  }
}

export interface RunsCursorResponse<Item> {
  runs: Array<Item>;

  next_cursor: string | null;
}

export interface RunsCursorParams {
  cursor?: string;

  limit?: number;
}

export class RunsCursor<Item> extends AbstractPage<Item> implements RunsCursorResponse<Item> {
  runs: Array<Item>;

  next_cursor: string | null;

  constructor(
    client: SimpleChecks,
    response: Response,
    body: RunsCursorResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.runs = body.runs || [];
    this.next_cursor = body.next_cursor || null;
  }

  getPaginatedItems(): Item[] {
    return this.runs ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface AlertChannelsCursorResponse<Item> {
  alert_channels: Array<Item>;

  next_cursor: string | null;
}

export interface AlertChannelsCursorParams {
  cursor?: string;

  limit?: number;
}

export class AlertChannelsCursor<Item>
  extends AbstractPage<Item>
  implements AlertChannelsCursorResponse<Item>
{
  alert_channels: Array<Item>;

  next_cursor: string | null;

  constructor(
    client: SimpleChecks,
    response: Response,
    body: AlertChannelsCursorResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.alert_channels = body.alert_channels || [];
    this.next_cursor = body.next_cursor || null;
  }

  getPaginatedItems(): Item[] {
    return this.alert_channels ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface AlertSubscriptionsCursorResponse<Item> {
  alert_subscriptions: Array<Item>;

  next_cursor: string | null;
}

export interface AlertSubscriptionsCursorParams {
  cursor?: string;

  limit?: number;
}

export class AlertSubscriptionsCursor<Item>
  extends AbstractPage<Item>
  implements AlertSubscriptionsCursorResponse<Item>
{
  alert_subscriptions: Array<Item>;

  next_cursor: string | null;

  constructor(
    client: SimpleChecks,
    response: Response,
    body: AlertSubscriptionsCursorResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.alert_subscriptions = body.alert_subscriptions || [];
    this.next_cursor = body.next_cursor || null;
  }

  getPaginatedItems(): Item[] {
    return this.alert_subscriptions ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface MaintenanceWindowsCursorResponse<Item> {
  maintenance_windows: Array<Item>;

  next_cursor: string | null;
}

export interface MaintenanceWindowsCursorParams {
  cursor?: string;

  limit?: number;
}

export class MaintenanceWindowsCursor<Item>
  extends AbstractPage<Item>
  implements MaintenanceWindowsCursorResponse<Item>
{
  maintenance_windows: Array<Item>;

  next_cursor: string | null;

  constructor(
    client: SimpleChecks,
    response: Response,
    body: MaintenanceWindowsCursorResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.maintenance_windows = body.maintenance_windows || [];
    this.next_cursor = body.next_cursor || null;
  }

  getPaginatedItems(): Item[] {
    return this.maintenance_windows ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}
