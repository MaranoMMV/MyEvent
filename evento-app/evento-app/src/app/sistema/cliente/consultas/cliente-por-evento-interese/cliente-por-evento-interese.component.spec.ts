import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePorEventoIntereseComponent } from './cliente-por-evento-interese.component';

describe('ClientePorEventoIntereseComponent', () => {
  let component: ClientePorEventoIntereseComponent;
  let fixture: ComponentFixture<ClientePorEventoIntereseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientePorEventoIntereseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientePorEventoIntereseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
