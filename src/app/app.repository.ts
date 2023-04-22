import { NgModule } from '@angular/core';
import { PlantRepository, PlantRepositoryService } from './services/repositories';

@NgModule({
    providers: [
        { provide: PlantRepository, useClass: PlantRepositoryService }
    ],
})
export class AppRepositoryModule { }
