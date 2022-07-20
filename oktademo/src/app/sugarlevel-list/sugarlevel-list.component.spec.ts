import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugarlevelListComponent } from './sugarlevel-list.component';

describe('SugarlevelListComponent', () => {
  let component: SugarlevelListComponent;
  let fixture: ComponentFixture<SugarlevelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugarlevelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugarlevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
