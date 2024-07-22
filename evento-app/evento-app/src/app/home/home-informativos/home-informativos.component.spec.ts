import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInformativosComponent } from './home-informativos.component';

describe('HomeInformativosComponent', () => {
  let component: HomeInformativosComponent;
  let fixture: ComponentFixture<HomeInformativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeInformativosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeInformativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
