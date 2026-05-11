// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MembersAPI from './members';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage who has access to an account and at what role
 * (PR-Members/2). Five roles: owner / admin / member / billing /
 * viewer. Owner is the strict superset of all other roles' scopes;
 * every account always has at least one owner.
 */
export class Invitations extends APIResource {
  /**
   * Stores a pending invitation and returns it (including the random token, surfaced
   * once for the inviter to copy). The webapp emails the accept link on a separate
   * step (PR-Members/3); for solo development the inviter can paste the
   * `accept_url_path` directly. Requires the `members:write` scope and a user-bound
   * key (account-wide keys can't attribute the invitation to a human).
   */
  create(body: InvitationCreateParams, options?: RequestOptions): APIPromise<MembersAPI.Invitation> {
    return this._client.post('/v1/invitations', { body, ...options });
  }

  /**
   * Returns pending (not-yet-accepted, not-yet-revoked) invitations. Newest first.
   * Tokens are deliberately omitted — they're only returned at creation time so the
   * inviter can copy/share the accept link. Requires the `members:read` scope.
   */
  list(options?: RequestOptions): APIPromise<InvitationListResponse> {
    return this._client.get('/v1/invitations', options);
  }

  /**
   * Marks the invitation revoked. The token becomes unusable. A fresh invite can be
   * issued for the same email afterwards. Requires the `members:write` scope.
   */
  revoke(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/invitations/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface InvitationListResponse {
  invitations: Array<MembersAPI.Invitation>;
}

export interface InvitationCreateParams {
  email: string;

  role: 'owner' | 'admin' | 'member' | 'billing' | 'viewer';
}

export declare namespace Invitations {
  export {
    type InvitationListResponse as InvitationListResponse,
    type InvitationCreateParams as InvitationCreateParams,
  };
}
