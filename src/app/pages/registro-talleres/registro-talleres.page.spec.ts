import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroTalleresPage } from './registro-talleres.page';

describe('RegistroTalleresPage', () => {
  let component: RegistroTalleresPage;
  let fixture: ComponentFixture<RegistroTalleresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTalleresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
