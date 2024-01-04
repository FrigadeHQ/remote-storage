import {BadRequestException, Controller, Get, Param, Request,} from '@nestjs/common'
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger'
import {EntitiesService} from './entities.service'

import {Actor, Entity} from './entities.interface'
import {HEADER_GLOBAL_STORAGE_INSTANCE_ID, HEADER_GLOBAL_STORAGE_USER_ID} from 'central-storage'

const publicApiPrefix = '/entities/'

@ApiBearerAuth()
@ApiTags('entities')
@Controller()
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  // API:
  //   GET
  // /api/entity/<key>
  //
  //
  //   PUT (upsert)
  // /api/entity/<key>
  //
  //   DELETE
  // /api/entity/<key>

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

  private validateRequest(request: Request): Actor | null {
    const headers = request.headers

    if (!headers) {
      throw new BadRequestException('No headers provided')
    }

    const instanceId = headers[HEADER_GLOBAL_STORAGE_INSTANCE_ID]
    if (!instanceId) {
      throw new BadRequestException('No instanceId provided')
    }
    const userId = headers[HEADER_GLOBAL_STORAGE_USER_ID]
    if (!userId) {
      throw new BadRequestException('No userId provided')
    }

    return {
      instanceId,
      userId,
    }
  }
}
