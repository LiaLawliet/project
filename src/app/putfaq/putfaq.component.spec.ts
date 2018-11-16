import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PutfaqComponent } from './putfaq.component';

describe('PutfaqComponent', () => {
  let component: PutfaqComponent;
  let fixture: ComponentFixture<PutfaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PutfaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PutfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
