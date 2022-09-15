import { PropertyModel } from '../../../domain/model/property.model';
import { PropertyRepository } from '../../../domain/repositories/propertyRepository.interface';

export default class ReadUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(uuid: string): Promise<PropertyModel> {
    return await this.propertyRepository.findById(uuid);
  }
}
