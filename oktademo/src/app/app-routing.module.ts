import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { ProfileComponent } from './profile/profile.component';
import { SugarLevelEditComponent } from './sugarlevel-edit/sugarlevel-edit.component';
import { SugarlevelListComponent } from './sugarlevel-list/sugarlevel-list.component';

const routes: Routes = [{
  path: 'login/callback',
  component: OktaCallbackComponent
},
{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [ OktaAuthGuard ],
},
{
  path: 'sugarlevel-list',
  component: SugarlevelListComponent
},
{
  path: 'sugarlevel-add',
  component: SugarLevelEditComponent
},
{
  path: 'sugarlevel-edit/:id',
  component: SugarLevelEditComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
