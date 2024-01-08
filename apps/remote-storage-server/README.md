<H3 align="center"><strong>remoteStorage server</strong></H3>

## Self-hosting quick start

The only prerequisite for self-hosting the server is a system that runs Docker and Docker Compose.

The server can be spun up using Docker with `docker-compose` in a few minutes. The image comes with a Redis server running on port 6379 as well as the application server running on port 4000.

To get started, simply run the following commands:

```bash
git clone git@github.com:FrigadeHQ/remote-storage.git
cd remote-storage/apps/remote-storage-server
cp .env.example .env
docker-compose build
docker-compose up
```

The server should now be running on port 4000. You can test it by getting and setting a value:

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
