// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InvitationsAPI from './invitations';
import { InvitationCreateParams, InvitationListResponse, Invitations } from './invitations';
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
export class Members extends APIResource {
  invitations: InvitationsAPI.Invitations = new InvitationsAPI.Invitations(this._client);

  /**
   * Sets the member's role. Refuses to demote the last owner; the webapp surfaces
   * this as "promote another owner first." Cannot modify your own role — ask another
   * owner to do it. Requires the `members:write` scope.
   */
  update(userID: string, body: MemberUpdateParams, options?: RequestOptions): APIPromise<Member> {
    return this._client.patch(path`/v1/members/${userID}`, { body, ...options });
  }

  /**
   * Returns every (user, role, joined_at) tuple for the caller's account. Ordered
   * owner-first (oldest membership). Backs the Settings → Members tab in the webapp.
   * Requires the `members:read` scope.
   */
  list(options?: RequestOptions): APIPromise<MemberListResponse> {
    return this._client.get('/v1/members', options);
  }

  /**
   * Deletes the (account, user) membership. Refuses to remove the last owner. Cannot
   * remove yourself — use the "leave account" flow instead. Note that this does NOT
   * revoke the user's API keys; the webapp orchestrates a follow-up keys:write call
   * if the caller wants a hard cut-off. Requires the `members:write` scope.
   */
  remove(userID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/members/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * A pending invitation to join the account.
 */
export interface Invitation {
  id: string;

  created_at: string;

  email: string;

  expires_at: string;

  invited_by_user_id: string;

  role: 'owner' | 'admin' | 'member' | 'billing' | 'viewer';

  /**
   * Random URL-safe token. Only returned at creation time (POST /v1/invitations);
   * GET responses omit this field.
   */
  token?: string;

  /**
   * Convenience: the relative path the webapp routes to for redemption. Only present
   * on creation responses.
   */
  accept_url_path?: string;
}

/**
 * A user's membership in the caller's account.
 */
export interface Member {
  /**
   * When the member joined this account.
   */
  created_at: string;

  email: string;

  role: 'owner' | 'admin' | 'member' | 'billing' | 'viewer';

  /**
   * UUID of the member.
   */
  user_id: string;
}

export interface MemberListResponse {
  members: Array<Member>;
}

export interface MemberUpdateParams {
  role: 'owner' | 'admin' | 'member' | 'billing' | 'viewer';
}

Members.Invitations = Invitations;

export declare namespace Members {
  export {
    type Invitation as Invitation,
    type Member as Member,
    type MemberListResponse as MemberListResponse,
    type MemberUpdateParams as MemberUpdateParams,
  };

  export {
    Invitations as Invitations,
    type InvitationListResponse as InvitationListResponse,
    type InvitationCreateParams as InvitationCreateParams,
  };
}
