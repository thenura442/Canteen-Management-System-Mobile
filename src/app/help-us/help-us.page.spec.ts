import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpUsPage } from './help-us.page';

describe('HelpUsPage', () => {
  let component: HelpUsPage;
  let fixture: ComponentFixture<HelpUsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HelpUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
