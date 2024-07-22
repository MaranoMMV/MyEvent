import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteSemVinculoComponent } from './cliente-sem-vinculo.component';

describe('ClienteSemVinculoComponent', () => {
  let component: ClienteSemVinculoComponent;
  let fixture: ComponentFixture<ClienteSemVinculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteSemVinculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteSemVinculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
