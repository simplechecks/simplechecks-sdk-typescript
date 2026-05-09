# Account

Types:

- <code><a href="./src/resources/account.ts">Account</a></code>

Methods:

- <code title="get /v1/account">client.account.<a href="./src/resources/account.ts">retrieve</a>() -> Account</code>

# Checks

Types:

- <code><a href="./src/resources/checks.ts">Check</a></code>

Methods:

- <code title="delete /v1/checks/{id}">client.checks.<a href="./src/resources/checks.ts">delete</a>(id) -> void</code>

# Runs

Types:

- <code><a href="./src/resources/runs.ts">Run</a></code>
- <code><a href="./src/resources/runs.ts">RunListResponse</a></code>

Methods:

- <code title="get /v1/runs/{id}">client.runs.<a href="./src/resources/runs.ts">retrieve</a>(id) -> Run</code>
- <code title="get /v1/runs">client.runs.<a href="./src/resources/runs.ts">list</a>({ ...params }) -> RunListResponse</code>

# Keys

Types:

- <code><a href="./src/resources/keys.ts">APIKey</a></code>

Methods:

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
