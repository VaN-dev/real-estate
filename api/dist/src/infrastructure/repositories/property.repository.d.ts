import { Repository } from 'typeorm';
import { PropertyRepository } from '../../domain/repositories/propertyRepository.interface';
import { Property } from '../entities/property.entity';
import { PropertyModel } from '../../domain/model/property.model';
export declare class DatabasePropertyRepository implements PropertyRepository {
    private readonly propertyEntityRepository;
    constructor(propertyEntityRepository: Repository<Property>);
    update(uuid: string, title: string, price: number): Promise<void>;
    create(property: PropertyModel): Promise<PropertyModel>;
    findAll(): Promise<PropertyModel[]>;
    findById(uuid: string): Promise<PropertyModel>;
    deleteById(uuid: string): Promise<void>;
    private toDomainModel;
    private toEntity;
}
