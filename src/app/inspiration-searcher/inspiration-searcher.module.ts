import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspirationSearcherRoutingModule } from './inspiration-searcher-routing.module';
import { SearcherComponent } from './components/searcher/searcher.component';
import { InspirationSearcherViewComponent } from './views/inspiration-searcher-view/inspiration-searcher-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearcherComponent,
    InspirationSearcherViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InspirationSearcherRoutingModule
  ],
  exports: [
    InspirationSearcherViewComponent
  ]
})
export class InspirationSearcherModule { }
