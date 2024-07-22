import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Evento, EventoDTO } from '../Evento';
import { EventoService } from '../../../services/evento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { CustomInterceptor } from '../../../custom.interceptor';
import { LoginService } from '../../../services/login.service';
import { Local, LocalDTO } from '../Local';
import { LocalService } from '../../../services/local.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Horario } from '../Horario';
import { HorarioService } from '../../../services/horario.service';

const today = new Date();


@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    MatSelectModule,
    HttpClientModule,
    MatStepperModule,
    MatListModule,
    MatTableModule,
    NgxMaskDirective,
    MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './evento-form.component.html',
  styleUrl: './evento-form.component.scss',
  providers: [LocalService, EventoService, DatePipe, { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }, LoginService, provideNgxMask(), HorarioService]
})
export class EventoFormComponent {

  formulario!: FormGroup;
  id?: number;
  evento?: Evento;
  eventos: EventoDTO[] = [];
  local?: Local;
  locais: LocalDTO[] = [];

  formularioHorariosEvento!: FormGroup;
  formularioLocalEvento!: FormGroup;
  formularioPorEvento!: FormGroup;
  formularioDeLocalPorEvento!: FormGroup;
  formularioDeConsultaDeLocalPorEvento!: FormGroup;
  formularioDeConsultaLocalHorario!: FormGroup;

  displayedColumns: string[] = ['id', 'evento', 'estado', 'cidade', 'nomeLocal', 'editar'];

  displayedColumnsHorario: string[] = ['id', 'data', 'horarioInicio', 'horarioFim', 'editar'];




  EventoLocalDataSouorce!: MatTableDataSource<Evento>;
  EventoLocalPorEventoDataSouorce!: MatTableDataSource<Evento>;
  EventoLocalPorHorarioDataSouorce!: MatTableDataSource<Evento>;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private loginService: LoginService,
    private localService: LocalService,
    private horarioService: HorarioService
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.buscarOpcoesDeEventosLocal();
    this.montarFormularioPorEventoLocal();
    this.montarFormularioConsultaLocalEvento();
    this.montarFormularioHorarios();
    this.buscarOpcoesLocal();
    this.montarFormularioDeConsultaLocalHorario()

    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];

      if (this.id) {
        this.eventoService.procurarPorId(this.id).subscribe(
          response => {
            this.evento = response;
            this.formulario.patchValue(this.evento); // Inicializa os valores do formulário
          }
        );
      }
    });
  }

  buscarOpcoesDeEventosLocal() {
    this.eventoService.list().subscribe((response: EventoDTO[]) => {

      this.eventos = response;
    });
  }

  buscarOpcoesLocal() {
    this.localService.list().subscribe((response: LocalDTO[]) => {
      (response)
      this.locais = response;
    });
  }
  montarFormulario() {
    this.formulario = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
    });
  }

  montarFormularioHorarios() {
    this.formularioHorariosEvento = this.fb.group({
      id: ['', Validators.required],
      data: ['', Validators.required],
      horarioInicio: ['', Validators.required],
      horarioFim: ['', Validators.required],
      localId: ['', Validators.required],
    });
  }

  montarFormularioConsultaLocalEvento() {
    this.formularioDeConsultaDeLocalPorEvento = this.fb.group({
      eventoId: ['', Validators.required],
    });
  }

  montarFormularioDeConsultaLocalHorario() {
    this.formularioDeConsultaLocalHorario = this.fb.group({
      localId: ['', Validators.required],
    })
  }


  montarFormularioPorEventoLocal() {
    this.formularioLocalEvento = this.fb.group({
      id: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      rua: ['', Validators.required],
      nomeLocal: ['', Validators.required],
      numero: ['', Validators.required],
      eventoId: ['', Validators.required],
    });
  }



  onSubmit() {
    const id = this.loginService.getUserId();
    const formValues = this.formulario.value;
    // const start = this.datePipe.transform(formValues.start, 'dd/MM/yyyy') ?? '';
    // const endDate = this.datePipe.transform(formValues.endDate, 'dd/MM/yyyy') ?? '';

    const evento: Evento = new Evento(
      formValues.id,
      formValues.nome,
    );
    (evento)

    if (this.id) {
      this.eventoService.atualizar(evento).subscribe(response => {
        this.openSnackBar("Evento Editado com sucesso!!", "fechar");
        this.router.navigate(['sistema/evento']);
      });
    } else {
      if (id) {
        this.eventoService.save(id, evento).subscribe(resposta => {
          this.eventos = [...this.eventos, resposta];
          this.openSnackBar("Evento Criado com sucesso!!", "fechar");
          this.router.navigate(['sistema/evento']);
        });
      }

    }
  }

  voltarListagem() {
    this.router.navigate(['sistema/evento']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onSubmitEventoLocalTable() {
    // Validar se o formulário é válido antes de prosseguir
    const formValues = this.formularioDeConsultaDeLocalPorEvento.value;
    this.localService.listLocaisPorEvento(formValues.eventoId).subscribe((resposta: any[]) => {
      (resposta);
      this.EventoLocalPorEventoDataSouorce = new MatTableDataSource<any>(resposta); // Remova os colchetes aqui
    });

  }

  onSubmitEventoHorarioTable() {
    // Validar se o formulário é válido antes de prosseguir
    const formValues = this.formularioDeConsultaLocalHorario.value;
    this.horarioService.listLocaisPorLocal(formValues.localId).subscribe((resposta: any[]) => {
      (resposta);
      this.EventoLocalPorHorarioDataSouorce = new MatTableDataSource<any>(resposta); // Remova os colchetes aqui
    });

  }

  onSubmitLocalEvento() {
    const id = this.loginService.getUserId();
    if (this.id) {
      const formValues = this.formularioLocalEvento.value;
      const local: Local = new Local(
        formValues.estado,
        formValues.cidade,
        formValues.bairro,
        formValues.rua,
        formValues.nomeLocal,
        formValues.numero,
        formValues.eventoId,
      );
      (local);
      this.localService.atualizar(local)
        .subscribe(response => {
          this.openSnackBar("cliente Editado com sucesso!!", "fechar");
        });
    } else {
      const formValues = this.formularioLocalEvento.value;
      const local: Local = new Local(
        formValues.estado,
        formValues.cidade,
        formValues.bairro,
        formValues.rua,
        formValues.nomeLocal,
        formValues.numero,
        formValues.eventoId,
      );
      (local);
      this.localService.saveLocal(Number(id), local).subscribe(resposta => {
        this.openSnackBar("cliente Criado com sucesso!!", "fechar");
      });
    }
  }

  onSubmitHorario() {
    const id = this.loginService.getUserId();
    if (this.id) {
      const formValues = this.formularioHorariosEvento.value;
      const horario: Horario = new Horario(
        formValues.data,
        formValues.horarioInicio,
        formValues.horarioFim,
        formValues.localId,
      );
      (horario);
      this.horarioService.atualizar(horario)
        .subscribe(response => {
          this.openSnackBar("Horario Editado com sucesso!!", "fechar");
        });
    } else {
      const formValues = this.formularioHorariosEvento.value;
      const data = this.datePipe.transform(formValues.data, 'dd/MM/yyyy') ?? ''

      const horario: Horario = new Horario(
        data,
        formValues.horarioInicio,
        formValues.horarioFim,
        formValues.localId,
      );
      (horario);
      this.horarioService.saveLocal(Number(id), horario).subscribe(resposta => {
        this.openSnackBar("Horario Criado com sucesso!!", "fechar");
      });
    }
  }
}