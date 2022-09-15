import {
  Body, Controller, Delete, Get, Param, Post, Put, Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { PropertyPresenter } from './property.presenter';
import ListUseCase from '../../../app/usecases/property/list.usecase';
import ReadUseCase from '../../../app/usecases/property/read.usecase';
import CreateUseCase from '../../../app/usecases/property/create.usecase';
import UpdateUseCase from '../../../app/usecases/property/update.usecase';
import { CreatePropertyDto, UpdatePropertyDto } from './property.dto';
import DeleteUseCase from '../../../app/usecases/property/delete.usecase';
import { PropertyModel } from '../../../domain/model/property.model';

@Controller('properties')
@ApiTags('Properties')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(PropertyPresenter)
export class PropertyController {
  constructor(
    private readonly listUseCase: ListUseCase,
    private readonly readUseCase: ReadUseCase,
    private readonly createUseCase: CreateUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase,
  ) {}

  @Get()
  @ApiResponseType(PropertyPresenter, true)
  async list(): Promise<PropertyPresenter[]> {
    const properties = await this.listUseCase.execute();

    return properties.map((property: PropertyModel) => new PropertyPresenter(property));
  }

  @Get(':uuid')
  @ApiResponseType(PropertyPresenter, false)
  async read(@Param('uuid') uuid: string): Promise<PropertyPresenter> {
    const resource = await this.readUseCase.execute(uuid);

    return new PropertyPresenter(resource);
  }

  @Post()
  @ApiResponseType(PropertyPresenter, true)
  async create(@Body() addPropertyDto: CreatePropertyDto): Promise<PropertyPresenter> {
    const uuid = uuidv4();
    const { title, price } = addPropertyDto;
    await this.createUseCase.execute(uuid, title, price);

    const resource = await this.readUseCase.execute(uuid);

    return new PropertyPresenter(resource);
  }

  @Put(':uuid')
  @ApiResponseType(PropertyPresenter, true)
  async update(@Param('uuid') uuid: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    const { title, price } = updatePropertyDto;
    await this.updateUseCase.execute(uuid, title, price);

    return 'success';
  }

  @Delete(':uuid')
  @ApiResponseType(PropertyPresenter, true)
  async delete(@Param('uuid') uuid: string): Promise<void> {
    await this.deleteUseCase.execute(uuid);
  }
}
