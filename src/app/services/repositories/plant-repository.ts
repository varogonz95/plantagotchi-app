import { Plant } from "src/app/models/plant";

export abstract class PlantRepository {
    abstract findBy(criteria: Partial<Plant>): Promise<Plant>
    abstract save(plant: Plant): Promise<void>
    abstract saveMany(...plants: Plant[])
}