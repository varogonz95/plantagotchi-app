import { Injectable } from '@angular/core';
import { PlantRepository } from './plant-repository';
import { Plant } from '../../models/plant';

@Injectable()
export class PlantRepositoryService extends PlantRepository {

    constructor() {
        super();
    }

    findBy(criteria: Partial<Plant>): Promise<Plant> {
        throw new Error('Method not implemented.');
    }

    save(plant: Plant): Promise<void> {
        throw new Error('Method not implemented.');
    }

    saveMany(...plants: Plant[]) {
        throw new Error('Method not implemented.');
    }
}
