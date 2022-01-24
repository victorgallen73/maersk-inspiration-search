import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationSearcherViewComponent } from './inspiration-searcher-view.component';

describe('InspirationSearcherViewComponent', () => {
  let component: InspirationSearcherViewComponent;
  let fixture: ComponentFixture<InspirationSearcherViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspirationSearcherViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspirationSearcherViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
