import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OKompanijiComponent } from './o-kompaniji.component';

describe('OKompanijiComponent', () => {
  let component: OKompanijiComponent;
  let fixture: ComponentFixture<OKompanijiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OKompanijiComponent]
    });
    fixture = TestBed.createComponent(OKompanijiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
