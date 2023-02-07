import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailComponent } from './edit-detail.component';

describe('EditDetailComponent', () => {
  let component: EditDetailComponent;
  let fixture: ComponentFixture<EditDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
