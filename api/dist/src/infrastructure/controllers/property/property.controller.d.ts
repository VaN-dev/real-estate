import { PropertyPresenter } from './property.presenter';
import ListUseCase from '../../../app/usecases/property/list.usecase';
import ReadUseCase from '../../../app/usecases/property/read.usecase';
import CreateUseCase from '../../../app/usecases/property/create.usecase';
import UpdateUseCase from '../../../app/usecases/property/update.usecase';
import { CreatePropertyDto, UpdatePropertyDto } from './property.dto';
import DeleteUseCase from '../../../app/usecases/property/delete.usecase';
export declare class PropertyController {
    private readonly listUseCase;
    private readonly readUseCase;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor(listUseCase: ListUseCase, readUseCase: ReadUseCase, createUseCase: CreateUseCase, updateUseCase: UpdateUseCase, deleteUseCase: DeleteUseCase);
    list(): Promise<PropertyPresenter[]>;
    read(uuid: string): Promise<PropertyPresenter>;
    create(addPropertyDto: CreatePropertyDto): Promise<PropertyPresenter>;
    update(uuid: string, updatePropertyDto: UpdatePropertyDto): Promise<string>;
    delete(uuid: string): Promise<void>;
}
