import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poc3Component } from './poc3.component';

describe('Poc3Component', () => {
  let component: Poc3Component;
  let fixture: ComponentFixture<Poc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Poc3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Poc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
