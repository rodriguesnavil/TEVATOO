import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UniswapComponent } from './uniswap/uniswap.component';
import { CompoundComponent } from './compound/compound.component';
import { GelatoComponent } from './gelato/gelato.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'uniswap-allocation',
      component: UniswapComponent
    },
    {
      path: 'compound-allocation',
      component: CompoundComponent,
    },
    {
      path: 'gelato-allocation',
      component: GelatoComponent
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
