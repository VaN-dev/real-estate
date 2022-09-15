import { ILogger } from '../../../domain/logger/logger.interface';
import { PropertyRepository } from '../../../domain/repositories/propertyRepository.interface';
export default class UpdateUseCase {
    private readonly logger;
    private readonly propertyRepository;
    constructor(logger: ILogger, propertyRepository: PropertyRepository);
    execute(uuid: string, title: string, price: number): Promise<void>;
}
