import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCnpjComponent } from './cliente-cnpj.component';

describe('ClienteCnpjComponent', () => {
  let component: ClienteCnpjComponent;
  let fixture: ComponentFixture<ClienteCnpjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteCnpjComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteCnpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
