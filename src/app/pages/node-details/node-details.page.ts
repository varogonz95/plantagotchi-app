import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AppModule } from '../../app.module';
import { Plant } from '../../models/plant';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from 'src/app/services/plant/plant.service';

@Component({
    selector: 'app-node-details',
    templateUrl: './node-details.page.html',
    styleUrls: ['./node-details.page.scss'],
    standalone: true,
    imports: [AppModule, FormsModule],
    providers: [PlantService]
})
export class NodeDetailsPage implements OnInit {

    public plant$ = new Observable<Plant>

    constructor(
        private readonly _activatedRoute: ActivatedRoute,
        private readonly _plantService: PlantService
    ) { }

    ngOnInit() {
        const nodeId = this._activatedRoute.snapshot.params['nodeId']
        this._plantService
            .find({ id: nodeId }, { fromCache: true, cacheKey: 'id' })
            .then(plant => this.plant$ = of(plant))
    }


}
