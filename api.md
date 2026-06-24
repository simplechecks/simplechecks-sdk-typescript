# Account

Types:

- <code><a href="./src/resources/account.ts">Account</a></code>

Methods:

- <code title="get /v1/account">client.account.<a href="./src/resources/account.ts">retrieve</a>() -> Account</code>

# Checks

Types:

- <code><a href="./src/resources/checks/checks.ts">AlertConfig</a></code>
- <code><a href="./src/resources/checks/checks.ts">Check</a></code>

Methods:

- <code title="post /v1/checks">client.checks.<a href="./src/resources/checks/checks.ts">create</a>({ ...params }) -> Check</code>
- <code title="get /v1/checks/{id}">client.checks.<a href="./src/resources/checks/checks.ts">retrieve</a>(id) -> Check</code>
- <code title="patch /v1/checks/{id}">client.checks.<a href="./src/resources/checks/checks.ts">update</a>(id, { ...params }) -> Check</code>
- <code title="get /v1/checks">client.checks.<a href="./src/resources/checks/checks.ts">list</a>({ ...params }) -> ChecksOffset</code>
- <code title="delete /v1/checks/{id}">client.checks.<a href="./src/resources/checks/checks.ts">delete</a>(id) -> void</code>

## Alerts

Methods:

- <code title="get /v1/checks/{id}/alerts">client.checks.alerts.<a href="./src/resources/checks/alerts.ts">retrieve</a>(id) -> AlertConfig</code>
- <code title="delete /v1/checks/{id}/alerts">client.checks.alerts.<a href="./src/resources/checks/alerts.ts">delete</a>(id) -> void</code>
- <code title="put /v1/checks/{id}/alerts">client.checks.alerts.<a href="./src/resources/checks/alerts.ts">replace</a>(id, { ...params }) -> AlertConfig</code>

# Runs

Types:

- <code><a href="./src/resources/runs.ts">Aggregate</a></code>
- <code><a href="./src/resources/runs.ts">RunDetail</a></code>
- <code><a href="./src/resources/runs.ts">RunListItem</a></code>
- <code><a href="./src/resources/runs.ts">RunAggregatesResponse</a></code>
- <code><a href="./src/resources/runs.ts">RunLogsResponse</a></code>

Methods:

- <code title="get /v1/runs/{id}">client.runs.<a href="./src/resources/runs.ts">retrieve</a>(id) -> RunDetail</code>
- <code title="get /v1/runs">client.runs.<a href="./src/resources/runs.ts">list</a>({ ...params }) -> RunListItemsRunsCursor</code>
- <code title="get /v1/runs/aggregates">client.runs.<a href="./src/resources/runs.ts">aggregates</a>({ ...params }) -> RunAggregatesResponse</code>
- <code title="get /v1/runs/{id}/logs">client.runs.<a href="./src/resources/runs.ts">logs</a>(id) -> string</code>

# Incidents

Types:

- <code><a href="./src/resources/incidents.ts">Incident</a></code>
- <code><a href="./src/resources/incidents.ts">IncidentListResponse</a></code>

Methods:

- <code title="get /v1/incidents">client.incidents.<a href="./src/resources/incidents.ts">list</a>({ ...params }) -> IncidentListResponse</code>

# Keys

Types:

- <code><a href="./src/resources/keys.ts">APIKey</a></code>
- <code><a href="./src/resources/keys.ts">KeyCreateResponse</a></code>
- <code><a href="./src/resources/keys.ts">KeyListResponse</a></code>

Methods:

- <code title="post /v1/keys">client.keys.<a href="./src/resources/keys.ts">create</a>({ ...params }) -> KeyCreateResponse</code>
- <code title="get /v1/keys">client.keys.<a href="./src/resources/keys.ts">list</a>() -> KeyListResponse</code>
- <code title="delete /v1/keys/{id}">client.keys.<a href="./src/resources/keys.ts">revoke</a>(id) -> void</code>

# AlertChannels

Types:

- <code><a href="./src/resources/alert-channels.ts">AlertChannel</a></code>
- <code><a href="./src/resources/alert-channels.ts">AlertChannelTestFireResponse</a></code>

Methods:

- <code title="post /v1/alert-channels">client.alertChannels.<a href="./src/resources/alert-channels.ts">create</a>({ ...params }) -> AlertChannel</code>
- <code title="get /v1/alert-channels/{id}">client.alertChannels.<a href="./src/resources/alert-channels.ts">retrieve</a>(id) -> AlertChannel</code>
- <code title="patch /v1/alert-channels/{id}">client.alertChannels.<a href="./src/resources/alert-channels.ts">update</a>(id, { ...params }) -> AlertChannel</code>
- <code title="get /v1/alert-channels">client.alertChannels.<a href="./src/resources/alert-channels.ts">list</a>({ ...params }) -> AlertChannelsAlertChannelsCursor</code>
- <code title="delete /v1/alert-channels/{id}">client.alertChannels.<a href="./src/resources/alert-channels.ts">delete</a>(id) -> void</code>
- <code title="post /v1/alert-channels/{id}:test">client.alertChannels.<a href="./src/resources/alert-channels.ts">testFire</a>(id) -> AlertChannelTestFireResponse</code>

# AlertSubscriptions

Types:

- <code><a href="./src/resources/alert-subscriptions.ts">AlertSubscription</a></code>

Methods:

- <code title="post /v1/alert-subscriptions">client.alertSubscriptions.<a href="./src/resources/alert-subscriptions.ts">create</a>({ ...params }) -> AlertSubscription</code>
- <code title="get /v1/alert-subscriptions/{id}">client.alertSubscriptions.<a href="./src/resources/alert-subscriptions.ts">retrieve</a>(id) -> AlertSubscription</code>
- <code title="patch /v1/alert-subscriptions/{id}">client.alertSubscriptions.<a href="./src/resources/alert-subscriptions.ts">update</a>(id, { ...params }) -> AlertSubscription</code>
- <code title="get /v1/alert-subscriptions">client.alertSubscriptions.<a href="./src/resources/alert-subscriptions.ts">list</a>({ ...params }) -> AlertSubscriptionsAlertSubscriptionsCursor</code>
- <code title="delete /v1/alert-subscriptions/{id}">client.alertSubscriptions.<a href="./src/resources/alert-subscriptions.ts">delete</a>(id) -> void</code>

# MaintenanceWindows

Types:

- <code><a href="./src/resources/maintenance-windows.ts">MaintenanceWindow</a></code>

Methods:

- <code title="post /v1/maintenance-windows">client.maintenanceWindows.<a href="./src/resources/maintenance-windows.ts">create</a>({ ...params }) -> MaintenanceWindow</code>
- <code title="get /v1/maintenance-windows/{id}">client.maintenanceWindows.<a href="./src/resources/maintenance-windows.ts">retrieve</a>(id) -> MaintenanceWindow</code>
- <code title="patch /v1/maintenance-windows/{id}">client.maintenanceWindows.<a href="./src/resources/maintenance-windows.ts">update</a>(id, { ...params }) -> MaintenanceWindow</code>
- <code title="get /v1/maintenance-windows">client.maintenanceWindows.<a href="./src/resources/maintenance-windows.ts">list</a>({ ...params }) -> MaintenanceWindowsMaintenanceWindowsCursor</code>
- <code title="delete /v1/maintenance-windows/{id}">client.maintenanceWindows.<a href="./src/resources/maintenance-windows.ts">delete</a>(id) -> void</code>

# Balance

Types:

- <code><a href="./src/resources/balance.ts">Balance</a></code>

Methods:

- <code title="get /v1/balance">client.balance.<a href="./src/resources/balance.ts">retrieve</a>() -> Balance</code>

# CheckoutSessions

Types:

- <code><a href="./src/resources/checkout-sessions.ts">CheckoutSession</a></code>

Methods:

- <code title="post /v1/checkout-session">client.checkoutSessions.<a href="./src/resources/checkout-sessions.ts">create</a>({ ...params }) -> CheckoutSession</code>

# Purchases

Types:

- <code><a href="./src/resources/purchases.ts">Purchase</a></code>
- <code><a href="./src/resources/purchases.ts">PurchaseListResponse</a></code>

Methods:

- <code title="get /v1/purchases">client.purchases.<a href="./src/resources/purchases.ts">list</a>({ ...params }) -> PurchaseListResponse</code>

# Members

Types:

- <code><a href="./src/resources/members/members.ts">Invitation</a></code>
- <code><a href="./src/resources/members/members.ts">Member</a></code>
- <code><a href="./src/resources/members/members.ts">MemberListResponse</a></code>

Methods:

- <code title="patch /v1/members/{user_id}">client.members.<a href="./src/resources/members/members.ts">update</a>(userID, { ...params }) -> Member</code>
- <code title="get /v1/members">client.members.<a href="./src/resources/members/members.ts">list</a>() -> MemberListResponse</code>
- <code title="delete /v1/members/{user_id}">client.members.<a href="./src/resources/members/members.ts">remove</a>(userID) -> void</code>

## Invitations

Types:

- <code><a href="./src/resources/members/invitations.ts">InvitationListResponse</a></code>

Methods:

- <code title="post /v1/invitations">client.members.invitations.<a href="./src/resources/members/invitations.ts">create</a>({ ...params }) -> Invitation</code>
- <code title="get /v1/invitations">client.members.invitations.<a href="./src/resources/members/invitations.ts">list</a>() -> InvitationListResponse</code>
- <code title="delete /v1/invitations/{id}">client.members.invitations.<a href="./src/resources/members/invitations.ts">revoke</a>(id) -> void</code>

# Locations

Types:

- <code><a href="./src/resources/locations.ts">Location</a></code>
- <code><a href="./src/resources/locations.ts">LocationListResponse</a></code>

Methods:

- <code title="get /v1/locations">client.locations.<a href="./src/resources/locations.ts">list</a>() -> LocationListResponse</code>

# Pricing

Types:

- <code><a href="./src/resources/pricing.ts">Pricing</a></code>

Methods:

- <code title="get /v1/pricing">client.pricing.<a href="./src/resources/pricing.ts">retrieve</a>() -> Pricing</code>
