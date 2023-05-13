import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatedProfilePage } from './updated-profile.page';

describe('UpdatedProfilePage', () => {
  let component: UpdatedProfilePage;
  let fixture: ComponentFixture<UpdatedProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatedProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
