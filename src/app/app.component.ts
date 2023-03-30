import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule],
    providers: [WifiWizard2]
})
export class AppComponent {
    /**
     *
     */
    constructor() {
    }
}
