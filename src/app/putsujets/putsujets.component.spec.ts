import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PutsujetsComponent } from './putsujets.component';

describe('PutsujetsComponent', () => {
  let component: PutsujetsComponent;
  let fixture: ComponentFixture<PutsujetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PutsujetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PutsujetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
