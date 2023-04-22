import { Component, OnInit } from '@angular/core';
import { AppModule } from './app.module';
import { newGuid } from './helpers/guid/guid';
import { PlantService } from './services/plant/plant.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [AppModule],
    providers: [PlantService]
})
export class AppComponent implements OnInit {
    /**
     *
     */
    constructor(private plantService: PlantService) {
    }

    ngOnInit(): void {
        this.plantService.saveMany(
            ...
            [
                { id: newGuid(), name: 'Foo', cached: true },
                { id: newGuid(), name: 'Bar', cached: true },
                { id: newGuid(), name: 'Baz', cached: true },
            ])
    }
}
