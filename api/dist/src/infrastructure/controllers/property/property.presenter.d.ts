import { PropertyModel } from '../../../domain/model/property.model';
export declare class PropertyPresenter {
    uuid: string;
    title: string;
    price: number;
    createdAt: Date;
    constructor(property: PropertyModel);
}
