import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComAreaComponent } from './com-area.component';

describe('ComAreaComponent', () => {
  let component: ComAreaComponent;
  let fixture: ComponentFixture<ComAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
