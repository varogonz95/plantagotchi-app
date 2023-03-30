import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { PermissionResult } from 'src/app/enums';
import { WifiResult, WifiService } from 'src/app/services/wifi.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [AppModule],
    providers: [WifiService, WifiWizard2],
})
export class HomePage implements OnInit, OnDestroy {
    public loading$ = new BehaviorSubject(true)
    public networks$ = new Observable<WifiResult[]>()
    private _networksSubscription?: Subscription

    constructor(private readonly _wifiService: WifiWizard2) {
    }

    public ngOnInit(): void {
        this._wifiService.requestPermission()
            .then(status => {
                if (PermissionResult.GRANTED === status) {
                    this.networks$ = from(this._wifiService.scan())
                    this._networksSubscription = this.networks$.subscribe(
                        () => this.loading$.next(false)
                    )
                }
            })
            .catch(err => console.log(err))
    }

    public ngOnDestroy(): void {
        this._networksSubscription!.unsubscribe()
    }
}
