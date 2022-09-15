import { ILogger } from '../../../domain/logger/logger.interface';
import { PropertyRepository } from '../../../domain/repositories/propertyRepository.interface';
import { PropertyModel } from '../../../domain/model/property.model';
export default class CreateUseCase {
    private readonly logger;
    private readonly propertyRepository;
    constructor(logger: ILogger, propertyRepository: PropertyRepository);
    execute(uuid: string, title: string, price: number): Promise<PropertyModel>;
}
