import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyRepository } from '../../domain/repositories/propertyRepository.interface';
import { Property } from '../entities/property.entity';
import { PropertyModel } from '../../domain/model/property.model';

@Injectable()
export class DatabasePropertyRepository implements PropertyRepository {
  constructor(
    @InjectRepository(Property)
    private readonly propertyEntityRepository: Repository<Property>,
  ) {}

  async update(uuid: string, title: string, price: number): Promise<void> {
    await this.propertyEntityRepository.update(
      {
        uuid,
      },
      {
        title,
        price,
      },
    );
  }

  async create(property: PropertyModel): Promise<PropertyModel> {
    const propertyEntity = this.toEntity(property);
    const result = await this.propertyEntityRepository.insert(propertyEntity);

    return this.toDomainModel(result.generatedMaps[0] as Property);
  }

  async findAll(): Promise<PropertyModel[]> {
    const propertiesEntity = await this.propertyEntityRepository.find();
    return propertiesEntity.map((propertyEntity) => this.toDomainModel(propertyEntity));
  }

  async findById(uuid: string): Promise<PropertyModel> {
    const propertyEntity = await this.propertyEntityRepository.findOneOrFail({ uuid });
    return this.toDomainModel(propertyEntity);
  }

  async deleteById(uuid: string): Promise<void> {
    await this.propertyEntityRepository.delete({ uuid });
  }

  private toDomainModel(propertyEntity: Property): PropertyModel {
    const property: PropertyModel = new PropertyModel();

    property.id = propertyEntity.id;
    property.uuid = propertyEntity.uuid;
    property.title = propertyEntity.title;
    property.price = propertyEntity.price;
    property.createdAt = propertyEntity.createdAt;

    return property;
  }

  private toEntity(property: PropertyModel): Property {
    const propertyEntity: Property = new Property();

    propertyEntity.id = property.id;
    propertyEntity.uuid = property.uuid;
    propertyEntity.title = property.title;
    propertyEntity.price = property.price;
    propertyEntity.createdAt = property.createdAt;

    return propertyEntity;
  }
}
