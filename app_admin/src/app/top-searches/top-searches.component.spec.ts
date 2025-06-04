import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSearchesComponent } from './top-searches.component';

describe('TopSearchesComponent', () => {
  let component: TopSearchesComponent;
  let fixture: ComponentFixture<TopSearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSearchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
