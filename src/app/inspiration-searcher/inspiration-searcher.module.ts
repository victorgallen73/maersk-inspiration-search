import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspirationSearcherRoutingModule } from './inspiration-searcher-routing.module';
import { SearcherComponent } from './components/searcher/searcher.component';


@NgModule({
  declarations: [
    SearcherComponent
  ],
  imports: [
    CommonModule,
    InspirationSearcherRoutingModule
  ]
})
export class InspirationSearcherModule { }
