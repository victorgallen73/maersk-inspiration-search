import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthService } from './auth/services/auth.service';
import { InspirationSearcherViewComponent } from './inspiration-searcher/views/inspiration-searcher-view/inspiration-searcher-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'flight-inspiration-search', pathMatch: 'full' },
  { path: 'flight-inspiration-search', component: InspirationSearcherViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
