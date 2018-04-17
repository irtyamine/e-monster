import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { TvRoutingModule } from './tv-routing.module';
import { TvComponent } from './tv.component';
import { TvListComponent } from './tv-list/tv-list.component';
import { ShareModule } from '../share/share.module';
import { TvService } from './service/tv.service';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { TvEffect } from './effects/tv';
import { TvListExistGuard } from './guards/tv-list-exist.guard';
import { TvListSidenavComponent } from './tv-list/tv-list-sidenav/tv-list-sidenav.component';
import { TvListContentComponent } from './tv-list/tv-list-content/tv-list-content.component';
import { OwlChipsModule, OwlDialogModule, OwlMenuModule, OwlTooltipModule } from 'owl-ng';

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        TvRoutingModule,

        OwlDialogModule,
        OwlMenuModule,
        OwlTooltipModule,
        OwlChipsModule,

        StoreModule.forFeature('tvs', reducers),
        EffectsModule.forFeature([TvEffect])
    ],
    declarations: [
        TvComponent,
        TvListComponent,
        TvListSidenavComponent,
        TvListContentComponent
    ],
    providers: [
        TvService,
        TvListExistGuard,
    ]
})
export class TvModule {
}