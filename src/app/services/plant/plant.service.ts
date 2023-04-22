import { Injectable } from '@angular/core';
import { Plant } from '../../models/plant';
import { CacheKey, CacheService } from '../cache/cache.service';
import { PlantRepository } from '../repositories';

export interface CacheOpts {
    fromCache: boolean
    cacheKey: CacheKey
}

export interface PlantWithCache extends Plant {
    cached: boolean
}

@Injectable()
export class PlantService {

    constructor(
        private readonly _cacheService: CacheService,
        private readonly _plantRepository: PlantRepository
    ) { }

    public async all(fromCache = false): Promise<Plant[]> {
        return this._cacheService.values()
    }

    public async find(criteria: Partial<Plant>, cacheOpts?: CacheOpts): Promise<Plant> {
        if (cacheOpts?.fromCache) {
            console.log(criteria);
            console.log(cacheOpts);
            const plant = this._cacheService.get<Plant>(criteria[cacheOpts?.cacheKey])
            console.log(plant)
            return plant
        }
        return await this._plantRepository.findBy(criteria)
    }

    public async save(plant: Plant | PlantWithCache): Promise<void> {
        const plantAsPlantWithCache = plant as PlantWithCache
        if (!!plantAsPlantWithCache.cached) {
            this._cacheService.set(plant.id, plant)
        }
        await this._plantRepository.save(plant)
    }

    public async saveMany(...plants: Array<Plant | PlantWithCache>): Promise<void> {
        await Promise.all(plants.map(plant => {
            const plantAsPlantWithCache = plant as PlantWithCache
            if (!!plantAsPlantWithCache.cached) {
                this._cacheService.set(plant.id, plant)
            }
            // return this._plantRepository.save(plant)
        }))
    }
}
