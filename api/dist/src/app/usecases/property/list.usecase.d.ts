import { PropertyRepository } from '../../../domain/repositories/propertyRepository.interface';
import { PropertyModel } from '../../../domain/model/property.model';
export default class ListUseCase {
    private readonly propertyRepository;
    constructor(propertyRepository: PropertyRepository);
    execute(): Promise<PropertyModel[]>;
}
