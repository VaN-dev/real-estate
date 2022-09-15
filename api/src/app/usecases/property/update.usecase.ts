import { ILogger } from '../../../domain/logger/logger.interface';
import { PropertyRepository } from '../../../domain/repositories/propertyRepository.interface';

export default class UpdateUseCase {
  constructor(private readonly logger: ILogger, private readonly propertyRepository: PropertyRepository) {}

  async execute(
    uuid: string,
    title: string,
    price: number,
  ): Promise<void> {
    await this.propertyRepository.update(uuid, title, price);
    this.logger.log('updatePropertyUseCases execute', `Property ${uuid} have been updated`);
  }
}
