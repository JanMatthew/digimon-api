import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigimonDetallesComponent } from './digimon-detalles.component';

describe('DigimonDetallesComponent', () => {
  let component: DigimonDetallesComponent;
  let fixture: ComponentFixture<DigimonDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigimonDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigimonDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
