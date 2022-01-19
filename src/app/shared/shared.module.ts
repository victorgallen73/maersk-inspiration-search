import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxMatRangeSliderModule} from 'ngx-mat-range-slider';


@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    CommonModule,
    TranslateModule,
    // Material Components
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    MatButtonModule,
    // MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    // MatChipsModule,
    MatDatepickerModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    // MatListModule,
    // MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    // MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    // MatSidenavModule,
    // MatSnackBarModule,
    // MatSortModule,
    MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    MatTooltipModule,
    // MatSliderModule,
    NgxMatRangeSliderModule,
  ],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'en-DK'}
  ]
})
export class SharedModule { }
