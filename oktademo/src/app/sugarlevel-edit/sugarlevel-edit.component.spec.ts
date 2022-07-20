import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugarlevelEditComponent } from './sugarlevel-edit.component';

describe('SugarlevelEditComponent', () => {
  let component: SugarlevelEditComponent;
  let fixture: ComponentFixture<SugarlevelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugarlevelEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugarlevelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
