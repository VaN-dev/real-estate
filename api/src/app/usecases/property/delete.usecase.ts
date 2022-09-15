import { ILogger } from '../../../domain/logger/logger.interface';
import { PropertyRepository } from '../../../domain/repositories/propertyRepository.interface';

export default class DeleteUseCase {
  constructor(private readonly logger: ILogger, private readonly propertyRepository: PropertyRepository) {}

  async execute(uuid: string): Promise<void> {
    await this.propertyRepository.deleteById(uuid);
    this.logger.log('deletePropertyUseCases execute', `Todo ${uuid} have been deleted`);
  }
}
