import { PropertyModel } from '../../../domain/model/property.model';
import { PropertyRepository } from '../../../domain/repositories/propertyRepository.interface';
export default class ReadUseCase {
    private readonly propertyRepository;
    constructor(propertyRepository: PropertyRepository);
    execute(uuid: string): Promise<PropertyModel>;
}
