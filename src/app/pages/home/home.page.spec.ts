import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { AppModule } from 'src/app/app.module';
import { PermissionResult } from 'src/app/enums';
import { WifiService } from 'src/app/services/wifi/wifi.service';
import { HomePage } from './home.page';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    beforeEach(waitForAsync(() => {
        const wifiWizard2Mock = {
            async requestPermission() {
                return PermissionResult.GRANTED
            },
            async scan() {
                return []
            }
        }
        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [
                {
                    provide: WifiWizard2,
                    useValue: wifiWizard2Mock
                },
                WifiService,
            ]
        })
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
