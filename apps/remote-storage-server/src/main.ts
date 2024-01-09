import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import * as fs from 'fs'
import * as process from 'process'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppClusterService } from './appCluster.service'
import {
  HEADER_REMOTE_STORAGE_INSTANCE_ID,
  HEADER_REMOTE_STORAGE_USER_ID,
} from './common/constants'

const CORS_OPTIONS = {
  origin: '*',
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization',
    HEADER_REMOTE_STORAGE_USER_ID,
    HEADER_REMOTE_STORAGE_INSTANCE_ID,
  ],
  exposedHeaders: [
    'Authorization',
    HEADER_REMOTE_STORAGE_USER_ID,
    HEADER_REMOTE_STORAGE_INSTANCE_ID,
  ],
  credentials: true,
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
}

async function bootstrap() {
  let httpsOptions

  if (process.env.REMOTE_STORAGE_SERVER_USE_HTTPS === 'true') {
    console.log('Using https')
    try {
      httpsOptions = {
        key: fs.readFileSync('/app/certs/server.key'),
        cert: fs.readFileSync('/app/certs/server.crt'),
      }
    } catch (e) {
      console.log('Invalid https certificate. Running in http mode', e)
    }
  }

  const fastifyAdapter = new FastifyAdapter({ https: httpsOptions })
  fastifyAdapter.enableCors(CORS_OPTIONS)
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter)

  if (process.env.NODE_ENV === 'development') {
    const options = new DocumentBuilder().setTitle('remoteStorage API').setVersion('1.0').build()
    const document = SwaggerModule.createDocument(app, options)

    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document))
    SwaggerModule.setup('/api', app, document)
  }

  const port = process.env.REMOTE_STORAGE_SERVER_PORT ?? 4000

  console.log('Listening on port', port)
  await app.listen(port, '0.0.0.0')
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Running in single instance dev mode')
  bootstrap()
} else {
  console.log('Running in cluster mode')
  AppClusterService.clusterize(bootstrap)
}
