import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { PlantService } from 'src/app/services/plant/plant.service';
import { AppModule } from '../../app.module';
import { Plant } from '../../models/plant';
import { NodeDetailsPage } from '../node-details/node-details.page';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [AppModule],
})
export class HomePage implements OnInit, OnDestroy {

    public plants$: Observable<Plant[]>
    public loading$ = new BehaviorSubject(true)
    public nodeDetailsPage = NodeDetailsPage

    constructor(private readonly _plantService: PlantService) {
        this.plants$ = from(this._plantService.all(true))
    }

    public ngOnInit(): void {
        this.plants$.subscribe(() => {
            this.loading$.next(false)
            this.loading$.complete()
        })
    }

    public ngOnDestroy(): void {
    }
}
