import { NgModule } from '@angular/core';

import { NbMenuModule } from '@nebular/theme';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from './charts/charts.module';
import { UniswapComponent } from './uniswap/uniswap.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    ChartsModule,

    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    UniswapComponent,
  ],
})
export class PagesModule {
}
