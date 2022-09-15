import { ILogger } from '../../../domain/logger/logger.interface';
import { PropertyRepository } from '../../../domain/repositories/propertyRepository.interface';
import { PropertyModel } from '../../../domain/model/property.model';

export default class CreateUseCase {
  constructor(private readonly logger: ILogger, private readonly propertyRepository: PropertyRepository) {}

  async execute(
    uuid: string,
    title: string,
    price: number,
  ): Promise<PropertyModel> {
    const model = new PropertyModel();
    model.uuid = uuid;
    model.title = title;
    model.price = price;
    const result = await this.propertyRepository.create(model);
    this.logger.log('CreatePropertyUsecases execute', 'New Property have been inserted');

    return result;
  }
}
