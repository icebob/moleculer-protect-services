[![Moleculer](https://img.shields.io/badge/Powered%20by-Moleculer-green.svg?colorB=0e83cd)](https://moleculer.services)

# moleculer-protect-services
This repo demonstrates how to use JWT token to protect service actions. It contains a `ServiceGuard` middleware and a `guard` service which implement this feature.

## Setup

1. Generate JWT token for every service. Use the `call guard.generate --service myService` command in REPL to generate a JWT for a service. The received token put into `authToken` property in service schema:

    ```js
    module.exports = {
        name: "users",

        authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlIjoidXNlcnMiLCJpYXQiOjE1NDE4NTU0ODl9.td1P27_xpFv1P5_j0HLtMwyz-aRF9xQqjLHYIIHcKPE",

        ...
    }
    ```
    > In production you had better place it into environment variables like `USERS_AUTH_TOKEN` and use `authToken: process.env.USERS_AUTH_TOKEN` in schema

2. Define restriction in action definition. If `restricted` property is `null` or not defined it means the action can be called from every service.

    ```js
    actions: {
        create: {
            // It can be called by "api" service
            restricted: [
                "api"
            ],
            handler(ctx) {}
        },

        list: {
            // It can be called by everyone.
            restricted: null,
            handler(ctx) {}
        },

        posts: {
            // It can be called by "api" & "posts" service.
            restricted: [
                "api",
                "posts"
            ],
            handler(ctx) {}
        }
    },
    ```

3. Add `ServiceGuard` middleware to `moleculer.config.js`

    ```js
    module.exports = {
        logger: true,
        logLevel: "info",

        middlewares: [
            ServiceGuard
        ]
    };
    ```

## Try

**Try the following command in REPL:**
- `call users.create` - throw error because it is called directly, not from the `api` service
- `call users.list` - returns "OK" because it is not restricted
- `call users.posts` - throw error because it is called directly, not from `api` or `posts` service

- `call posts.createUser` - throw error because it is called from `posts` service and not from `api` service
- `call posts.userPosts` - returns "OK" because it is called from `posts` service.

- open http://localhost:3000/api/users/create in the browser - returns "OK" because it is called from the `api` service.


## Start

``` bash
# Install dependencies
npm install

# Start with REPL
npm run dev

```

