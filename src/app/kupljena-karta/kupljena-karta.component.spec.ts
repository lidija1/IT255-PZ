import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KupljenaKartaComponent } from './kupljena-karta.component';

describe('KupljenaKartaComponent', () => {
  let component: KupljenaKartaComponent;
  let fixture: ComponentFixture<KupljenaKartaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KupljenaKartaComponent]
    });
    fixture = TestBed.createComponent(KupljenaKartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
