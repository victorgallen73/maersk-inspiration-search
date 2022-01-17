import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspirationSearcherRoutingModule } from './inspiration-searcher-routing.module';
import { SearcherComponent } from './components/searcher/searcher.component';
import { InspirationSearcherViewComponent } from './views/inspiration-searcher-view/inspiration-searcher-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  exports: [
    InspirationSearcherViewComponent,
  ],
  declarations: [
    SearcherComponent,
    InspirationSearcherViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InspirationSearcherRoutingModule,
    SharedModule,
  ],
})
export class InspirationSearcherModule { }
