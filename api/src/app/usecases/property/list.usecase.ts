import { PropertyRepository } from '../../../domain/repositories/propertyRepository.interface';
import { PropertyModel } from '../../../domain/model/property.model';

export default class ListUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(): Promise<PropertyModel[]> {
    return await this.propertyRepository.findAll();
  }
}
