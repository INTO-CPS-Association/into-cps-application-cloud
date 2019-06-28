import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiModelComponent } from './multi-model.component';

describe('MultiModelComponent', () => {
  let component: MultiModelComponent;
  let fixture: ComponentFixture<MultiModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
