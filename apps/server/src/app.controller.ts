import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  root() {}

}
