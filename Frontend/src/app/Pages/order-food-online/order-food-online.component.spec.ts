import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFoodOnlineComponent } from './order-food-online.component';

describe('OrderFoodOnlineComponent', () => {
  let component: OrderFoodOnlineComponent;
  let fixture: ComponentFixture<OrderFoodOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFoodOnlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFoodOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
