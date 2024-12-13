import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarPostulacionPage } from './administrar-postulacion.page';

describe('AdministrarPostulacionPage', () => {
  let component: AdministrarPostulacionPage;
  let fixture: ComponentFixture<AdministrarPostulacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPostulacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
