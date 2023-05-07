import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderConfirmedPage } from './order-confirmed.page';

describe('OrderConfirmedPage', () => {
  let component: OrderConfirmedPage;
  let fixture: ComponentFixture<OrderConfirmedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrderConfirmedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
