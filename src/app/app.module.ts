import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { AppRepositoryModule } from "./app.repository";

@NgModule({
    exports: [
        CommonModule,
        RouterModule,
        IonicModule,
        AppRepositoryModule
    ],
    declarations: [
    ]
})
export class AppModule { }