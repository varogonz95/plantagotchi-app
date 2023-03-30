import { Injectable } from '@angular/core';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { PermissionResult } from '../enums';

export interface WifiResult {
    level: number
    SSID: string
    BSSID: string
    frequency: number
    capabilities: string
    timestamp: number
    channelWidth: number
    centerFreq0: number
    centerFreq1: number
}

@Injectable()
export class WifiService {
    constructor(private readonly _wifiWizard: WifiWizard2) {
    }

    public async getNearbyNetworks(): Promise<WifiResult[]> {
        const permission: PermissionResult = await this._wifiWizard.requestPermission()

        if (permission === PermissionResult.GRANTED) {
            return this._wifiWizard.scan()
        }

        throw new Error("WifiService: Permission Denied");
    }
}
