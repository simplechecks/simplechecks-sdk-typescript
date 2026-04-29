# Healthz

Types:

- <code><a href="./src/resources/healthz.ts">HealthzCheckResponse</a></code>

Methods:

- <code title="get /healthz">client.healthz.<a href="./src/resources/healthz.ts">check</a>() -> HealthzCheckResponse</code>

# Account

Types:

- <code><a href="./src/resources/account.ts">AccountRetrieveResponse</a></code>

Methods:

- <code title="get /v1/account">client.account.<a href="./src/resources/account.ts">retrieve</a>() -> AccountRetrieveResponse</code>

# Checks

Types:

- <code><a href="./src/resources/checks.ts">Check</a></code>
- <code><a href="./src/resources/checks.ts">CheckListResponse</a></code>

Methods:

- <code title="post /v1/checks">client.checks.<a href="./src/resources/checks.ts">create</a>({ ...params }) -> Check</code>
- <code title="get /v1/checks/{id}">client.checks.<a href="./src/resources/checks.ts">retrieve</a>(id) -> Check</code>
- <code title="patch /v1/checks/{id}">client.checks.<a href="./src/resources/checks.ts">update</a>(id, { ...params }) -> Check</code>
- <code title="get /v1/checks">client.checks.<a href="./src/resources/checks.ts">list</a>({ ...params }) -> CheckListResponse</code>
- <code title="delete /v1/checks/{id}">client.checks.<a href="./src/resources/checks.ts">delete</a>(id) -> void</code>
