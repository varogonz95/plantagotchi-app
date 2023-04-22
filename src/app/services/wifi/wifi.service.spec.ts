import { TestBed } from '@angular/core/testing';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { PermissionResult } from '../../enums';
import { WifiResult, WifiService } from './wifi.service';

describe('WifiService', () => {
    beforeEach(() => {
    });

    it('should be created', () => {
        const testbed = configureModuleWith(WifiWizard2)
        const service = testbed.inject(WifiService);
        expect(service).toBeTruthy();
    });

    it('should resolve a call to [getNearbyNetworks()]', async () => {
        const serviceMock = mockWifiWizard2Plugin({ permission: PermissionResult.GRANTED })
        const testbed = configureModuleWith(serviceMock);
        const service = testbed.inject(WifiService);
        await expectAsync(service.getNearbyNetworks()).toBeResolved()
    });

    it('should get at least 1 scanned network', async () => {
        const serviceMock = {
            async requestPermission() {
                return PermissionResult.GRANTED
            },
            async scan(): Promise<WifiResult[]> {
                return [
                    { SSID: 'Wifi 1', frequency: 1234 },
                    { SSID: 'Wifi 2', frequency: 1234 },
                    { SSID: 'Wifi 3', frequency: 1234 },
                    { SSID: 'Wifi 4', frequency: 1234 },
                ]
            }
        }
        const testbed = TestBed.configureTestingModule({
            providers: [
                WifiService,
                {
                    provide: WifiWizard2,
                    useValue: serviceMock
                }]
        });
        const service = testbed.inject(WifiService);
        const wifis = await service.getNearbyNetworks()
        expect(wifis.length).toBeGreaterThan(1)
    });

    it('should fail if permission is denied', async () => {
        const serviceMock = mockWifiWizard2Plugin({ permission: PermissionResult.DENIED })
        const testbed = configureModuleWith(serviceMock);
        const service = testbed.inject(WifiService);
        const expectedError = "WifiService: Permission Denied";
        const result = service.getNearbyNetworks()
        await expectAsync(result)
            .toBeRejectedWithError(expectedError)
    });
});

interface WifiWizard2PluginParams {
    permission: PermissionResult,
    scannedWlans: WifiResult[]
}

function mockWifiWizard2Plugin(params: Partial<WifiWizard2PluginParams>): WifiWizard2 {
    return {
        async requestPermission() {
            return params.permission ?? PermissionResult.UNKNOWN
        },
        async scan() {
            return params.scannedWlans ?? []
        }
    } as unknown as WifiWizard2
}

function configureModuleWith(value: any) {
    return TestBed.configureTestingModule({
        providers: [
            WifiService,
            {
                provide: WifiWizard2,
                useValue: value
            }]
    })
}