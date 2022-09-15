import { PropertyModel } from '../model/property.model';

export interface PropertyRepository {
  create(property: PropertyModel): Promise<PropertyModel>;
  findAll(): Promise<PropertyModel[]>;
  findById(uuid: string): Promise<PropertyModel>;
  update(uuid: string, title: string, price: number): Promise<void>;
  deleteById(uuid: string): Promise<void>;
}
