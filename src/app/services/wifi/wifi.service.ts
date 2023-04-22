import { Injectable } from '@angular/core';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { environment } from '../../../environments/environment';
import { PermissionResult } from '../../enums';

export interface WifiResult {
    SSID: string
    frequency: number
    level?: number
    BSSID?: string
    capabilities?: string
    timestamp?: number
    channelWidth?: number
    centerFreq0?: number
    centerFreq1?: number
}

export interface IWifiService {
    getNearbyNetworks(): Promise<WifiResult[]>
}

@Injectable()
export class WifiService implements IWifiService {
    constructor(
        private readonly _wifiWizard: WifiWizard2
    ) { }

    public async getNearbyNetworks(): Promise<WifiResult[]> {
        const permission: PermissionResult = await this._wifiWizard.requestPermission()

        if (permission === PermissionResult.GRANTED) {
            return this._wifiWizard.scan()
        }

        throw new Error("WifiService: Permission Denied");
    }
}

export const wifiWizardFactory = (data: any) => {
    if (environment.production) {
        return WifiWizard2
    }
    return {
        async requestPermission(): Promise<PermissionResult> {
            return PermissionResult.GRANTED
        },
        async scan(): Promise<WifiResult[]> {
            return [{ SSID: 'Wifi 1', frequency: 1234 }]
        }
    } as WifiWizard2
}