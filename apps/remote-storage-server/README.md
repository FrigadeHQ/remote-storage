<H3 align="center"><strong>remoteStorage server</strong></H3>

The server currently supports two different modes and corresponding data stores:
- sqlite (default)
- Redis

You should pick the server that makes most sense for your use case. 


## Self-hosting quick start (sqlite)

To get started, simply run the following commands:

```bash
git clone git@github.com:FrigadeHQ/remote-storage.git
cd remote-storage/apps/remote-storage-server
cp .env.example .env
pnpm install
pnpm start
```
You can run the server in daemon mode by running `pnpm run start:daemon`.

## Self-hosting quick start (Redis)

The only prerequisite for self-hosting the server with Redis is a system that runs Docker and Docker Compose.

The server can be spun up using Docker with `docker-compose` in a few minutes. The image comes with a Redis server running on port 6379 as well as the application server running on port 4000.

To get started, simply run the following commands:

```bash
git clone git@github.com:FrigadeHQ/remote-storage.git
cd remote-storage/apps/remote-storage-server
cp .env.example .env
docker-compose build
docker-compose up
```

## Testing the server
The server defaults runs on port 4000. You can test it by getting and setting a value:

```bash
curl -i -X PUT \
   -H "x-remote-storage-instance-id:my-instance-id" \
   -H "x-remote-storage-user-id:user-123" \
   -d \
'{ "foo": "bar" }' \
 'http://localhost:4000/entities/some-key'
```

Then get the value back:

```bash
curl -i -X GET \
   -H "x-remote-storage-instance-id:my-instance-id" \
   -H "x-remote-storage-user-id:user-123" \
 'http://localhost:4000/entities/some-key'
 
HTTP/1.1 200 OK
{"foo":"bar"}
```

## Enabling authentication with JSON Web Tokens
We highly recommend using JSON Web Tokens (JWT) to authenticate requests to the server. This can be done by setting the `JWT_SECRET` environment variable in `.env` to your JWT secret.

To learn more about JWTs and you can generate them in your application, see [this guide](https://jwt.io/introduction/).

After setting up JWT authentication make sure to pass your JWTs to the remoteStorage client:

```js
const remoteStorage = new RemoteStorage({
  serverAddress: 'http://localhost:4000',
  userId: '123e4567-e89b-12d3-a456-426614174000'
})

remoteStorage.getItem('my-item', {
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
})
```

## Developing the server

The server is built using [NestJS](https://nestjs.com/). You can find the documentation for NestJS [here](https://docs.nestjs.com/).

### Running the server in development mode

To run the server in development mode, simply run `pnpm run start:dev`.

## Supporting other data stores

If you wish to use a different data store, you can implement the `DataService` interface in `src/services/data/data-service-interface.ts`.
You can see an example of this in `src/services/data/sqlite/sqlite.service.ts`.
