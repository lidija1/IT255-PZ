import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KupovanjeKarteComponent } from './kupovanje-karte.component';

describe('KupovanjeKarteComponent', () => {
  let component: KupovanjeKarteComponent;
  let fixture: ComponentFixture<KupovanjeKarteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KupovanjeKarteComponent]
    });
    fixture = TestBed.createComponent(KupovanjeKarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
