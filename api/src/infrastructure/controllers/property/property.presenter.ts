import { ApiProperty } from '@nestjs/swagger';
import { PropertyModel } from '../../../domain/model/property.model';

export class PropertyPresenter {
  @ApiProperty()
    uuid: string;

  @ApiProperty()
    title: string;

  @ApiProperty()
    price: number;

  @ApiProperty()
    createdAt: Date;

  constructor(property: PropertyModel) {
    this.uuid = property.uuid;
    this.title = property.title;
    this.price = property.price;
    this.createdAt = property.createdAt;
  }
}
