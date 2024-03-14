import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poc2Component } from './poc2.component';

describe('Poc2Component', () => {
  let component: Poc2Component;
  let fixture: ComponentFixture<Poc2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Poc2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Poc2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
