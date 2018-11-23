import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PutthemesComponent } from './putthemes.component';

describe('PutthemesComponent', () => {
  let component: PutthemesComponent;
  let fixture: ComponentFixture<PutthemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PutthemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PutthemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
