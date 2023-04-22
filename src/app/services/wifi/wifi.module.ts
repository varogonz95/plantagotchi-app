import { NgModule } from "@angular/core";
import { WifiWizard2 } from "@awesome-cordova-plugins/wifi-wizard-2/ngx";
import { WifiService, wifiWizardFactory } from "./wifi.service";

@NgModule({
    providers: [
        WifiService,
        { provide: WifiWizard2, useFactory: wifiWizardFactory }
    ],
})
export class WifiModule {
}