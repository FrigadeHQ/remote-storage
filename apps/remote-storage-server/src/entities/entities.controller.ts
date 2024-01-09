import { BadRequestException, Controller, Delete, Get, Param, Put, Request } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { EntitiesService } from './entities.service'

import { Actor, Entity } from './entities.interface'
import {
  HEADER_REMOTE_STORAGE_INSTANCE_ID,
  HEADER_REMOTE_STORAGE_USER_ID,
} from '../common/constants'

const publicApiPrefix = '/entities/'

const MAX_KEY_LENGTH = 255

@ApiBearerAuth()
@ApiTags('entities')
@Controller()
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @ApiOperation({ summary: 'Get a entity by key' })
  @ApiResponse({
    status: 200,
    description: 'The entity has been successfully returned.',
  })
  @ApiResponse({ status: 404, description: 'The entity was not found.' })
  @Get(publicApiPrefix + ':key')
  async get(@Request() request: Request, @Param() params): Promise<Entity> {
    const actor = this.validateRequest(request)
    const entity = await this.entitiesService.get(actor, params.key)

    return entity
  }

  @ApiOperation({ summary: 'Set a entity by key' })
  @ApiResponse({
    status: 201,
    description: 'The entity has been successfully created or updated.',
  })
  @Put(publicApiPrefix + ':key')
  async set(@Request() request: Request, @Param() params): Promise<void> {
    const actor = this.validateRequest(request)
    await this.entitiesService.set(actor, params.key, request.body)
  }

  @ApiOperation({ summary: 'Delete a entity by key' })
  @ApiResponse({
    status: 200,
    description: 'The entity has been successfully deleted.',
  })
  @Delete(publicApiPrefix + ':key')
  async delete(@Request() request: Request, @Param() params): Promise<void> {
    const actor = this.validateRequest(request)
    await this.entitiesService.delete(actor, params.key)
  }

  private validateRequest(request: Request): Actor | null {
    const headers = request.headers

    if (!headers) {
      throw new BadRequestException('No headers provided')
    }

    const instanceId = headers[HEADER_REMOTE_STORAGE_INSTANCE_ID]
    if (!instanceId) {
      throw new BadRequestException('No instanceId provided')
    }
    const userId = headers[HEADER_REMOTE_STORAGE_USER_ID]
    if (!userId) {
      throw new BadRequestException('No userId provided')
    }

    if (instanceId.length > MAX_KEY_LENGTH) {
      throw new BadRequestException(`instanceId cannot be longer than ${MAX_KEY_LENGTH} characters`)
    }

    if (userId.length > MAX_KEY_LENGTH) {
      throw new BadRequestException(`userId cannot be longer than ${MAX_KEY_LENGTH} characters`)
    }

    return {
      instanceId,
      userId,
    }
  }
}
