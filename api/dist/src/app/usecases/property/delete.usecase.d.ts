import { ILogger } from '../../../domain/logger/logger.interface';
import { PropertyRepository } from '../../../domain/repositories/propertyRepository.interface';
export default class DeleteUseCase {
    private readonly logger;
    private readonly propertyRepository;
    constructor(logger: ILogger, propertyRepository: PropertyRepository);
    execute(uuid: string): Promise<void>;
}
