# Account

Types:

- <code><a href="./src/resources/account.ts">Account</a></code>

Methods:

- <code title="get /v1/account">client.account.<a href="./src/resources/account.ts">retrieve</a>() -> Account</code>

# Checks

Types:

- <code><a href="./src/resources/checks/checks.ts">AlertChannel</a></code>
- <code><a href="./src/resources/checks/checks.ts">AlertConfig</a></code>
- <code><a href="./src/resources/checks/checks.ts">Check</a></code>
- <code><a href="./src/resources/checks/checks.ts">MaintenanceWindow</a></code>

Methods:

- <code title="post /v1/checks">client.checks.<a href="./src/resources/checks/checks.ts">create</a>({ ...params }) -> Check</code>
- <code title="get /v1/checks/{id}">client.checks.<a href="./src/resources/checks/checks.ts">retrieve</a>(id) -> Check</code>
- <code title="patch /v1/checks/{id}">client.checks.<a href="./src/resources/checks/checks.ts">update</a>(id, { ...params }) -> Check</code>
- <code title="get /v1/checks">client.checks.<a href="./src/resources/checks/checks.ts">list</a>({ ...params }) -> ChecksOffset</code>
- <code title="delete /v1/checks/{id}">client.checks.<a href="./src/resources/checks/checks.ts">delete</a>(id) -> void</code>

## Alerts

Types:

- <code><a href="./src/resources/checks/alerts.ts">AlertTestFireResponse</a></code>

Methods:

- <code title="get /v1/checks/{id}/alerts">client.checks.alerts.<a href="./src/resources/checks/alerts.ts">retrieve</a>(id) -> AlertConfig</code>
- <code title="delete /v1/checks/{id}/alerts">client.checks.alerts.<a href="./src/resources/checks/alerts.ts">delete</a>(id) -> void</code>
- <code title="put /v1/checks/{id}/alerts">client.checks.alerts.<a href="./src/resources/checks/alerts.ts">replace</a>(id, { ...params }) -> AlertConfig</code>
- <code title="post /v1/checks/{id}/alerts:test">client.checks.alerts.<a href="./src/resources/checks/alerts.ts">testFire</a>(id) -> AlertTestFireResponse</code>

# Runs

Types:

- <code><a href="./src/resources/runs.ts">Aggregate</a></code>
- <code><a href="./src/resources/runs.ts">Run</a></code>
- <code><a href="./src/resources/runs.ts">RunListResponse</a></code>
- <code><a href="./src/resources/runs.ts">RunAggregatesResponse</a></code>
- <code><a href="./src/resources/runs.ts">RunLogsResponse</a></code>

Methods:

- <code title="get /v1/runs/{id}">client.runs.<a href="./src/resources/runs.ts">retrieve</a>(id) -> Run</code>
- <code title="get /v1/runs">client.runs.<a href="./src/resources/runs.ts">list</a>({ ...params }) -> RunListResponse</code>
- <code title="get /v1/runs/aggregates">client.runs.<a href="./src/resources/runs.ts">aggregates</a>({ ...params }) -> RunAggregatesResponse</code>
- <code title="get /v1/runs/{id}/logs">client.runs.<a href="./src/resources/runs.ts">logs</a>(id) -> string</code>

# Keys

Types:

- <code><a href="./src/resources/keys.ts">APIKey</a></code>
- <code><a href="./src/resources/keys.ts">KeyCreateResponse</a></code>
- <code><a href="./src/resources/keys.ts">KeyListResponse</a></code>

Methods:

- <code title="post /v1/keys">client.keys.<a href="./src/resources/keys.ts">create</a>({ ...params }) -> KeyCreateResponse</code>
- <code title="get /v1/keys">client.keys.<a href="./src/resources/keys.ts">list</a>() -> KeyListResponse</code>
- <code title="delete /v1/keys/{id}">client.keys.<a href="./src/resources/keys.ts">revoke</a>(id) -> void</code>

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
