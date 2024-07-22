package com.myevent.eventos.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.myevent.eventos.entity.Cliente;
import com.myevent.eventos.entity.Departamento;
import com.myevent.eventos.entity.Evento;
import com.myevent.eventos.entity.Vendedor;
import com.myevent.eventos.repository.ClienteRepository;
import com.myevent.eventos.repository.DepartamentoRepository;
import com.myevent.eventos.repository.EventoRepository;
import com.myevent.eventos.repository.VendedorRepository;

@Configuration
public class Instantiation implements CommandLineRunner {

	@Autowired
	private VendedorRepository vendedorRepository;
	@Autowired
	private ClienteRepository clienteRepository;
	@Autowired
	private DepartamentoRepository departamentoRepository;
	@Autowired
	private EventoRepository eventoRepository;

	@Override
	public void run(String... args) throws Exception {
		// Mockagem Vendedores
		System.out.println("Verificando se vai ser necessário criar o vendedor '1 - Sem Vinculo'");
		if (this.vendedorRepository.findById(1L).isEmpty()) {
			System.out.println("Criando o Vendedor '1 - Sem Vinculo'");

			Vendedor vendedor1 = new Vendedor();
			vendedor1.setId(1L);
			vendedor1.setNome("Sem Vinculo");

			vendedorRepository.saveAll(Arrays.asList(vendedor1));
		} else {
			System.out.println("Não foi necessário gerar o código do vendedor '1 - Sem Vinculo'");
		}

		// Mockagem Clientes
		System.out.println("Verificando se vai ser necessário criar um Cliente '1 - Teste'");
		if (this.clienteRepository.findById(1L).isEmpty()) {
			System.out.println("Criando Cliente '1 - Teste'");
			Cliente cliente1 = new Cliente();
			cliente1.setId(1L);
			cliente1.setNome("Teste1");
			cliente1.setRazao("Teste1 Razao");
			cliente1.setTelefone("1123456789");
			cliente1.setCnpj("123456789");
			cliente1.setVendedor(this.vendedorRepository.findById(1L).get());

			Cliente cliente2 = new Cliente();
			cliente2.setId(2L);
			cliente2.setNome("Teste2");
			cliente2.setRazao("Teste2 Razao");
			cliente2.setTelefone("1123456789");
			cliente2.setCnpj("987654321");
			cliente2.setVendedor(this.vendedorRepository.findById(1L).get());

			this.clienteRepository.saveAll(Arrays.asList(cliente1, cliente2));

		} else {
			System.out.println("Não foi necessário gerar o código do Cliente '1 - Teste1' e Cliente '2 - Teste2'");
		}

		// Mockagem Departamento
		System.out.println("Verificando se vai ser necessário criar Departamentos '1 - Vendedores' e '2 - Promotores'");
		if (this.departamentoRepository.findById(1L).isEmpty()) {
			System.out.println("Criando Departamentos '1 - Vendedores' e outros");
			Departamento departamento1 = new Departamento();
			departamento1.setId(1L);
			departamento1.setNome("Vendedores");

			Departamento departamento5 = new Departamento();
			departamento5.setId(2L);
			departamento5.setNome("TI");

			Departamento departamento6 = new Departamento();
			departamento6.setId(3L);
			departamento6.setNome("ADMIN");

			this.departamentoRepository.saveAll(Arrays.asList(departamento1, departamento5, departamento6));

		} else {
			System.out.println("Não foi necessário gerar os códigos dos Departamentos");
		}

		// Mockagem Evento
		System.out.println("Verificando se vai ser necessário criar Evento '1 - EventoTeste'");
		if (this.eventoRepository.findById(1L).isEmpty()) {
			System.out.println("Criando Evento '1 - TesteEvento1'");
			Evento evento1 = new Evento();
			evento1.setId(1L);
			evento1.setNome("TesteEvento1");
//			evento1.setStart(new Date());
//			evento1.setEndDate(new Date());

			Cliente cliente1 = this.clienteRepository.findById(1L).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente 1 não encontrado"));
			Cliente cliente2 = this.clienteRepository.findById(2L).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente 2 não encontrado"));

			evento1.setClientes(Arrays.asList(cliente1, cliente2));

			cliente1.getEventos().add(evento1);
			cliente2.getEventos().add(evento1);

			this.eventoRepository.save(evento1);
			this.clienteRepository.saveAll(Arrays.asList(cliente1, cliente2));

		} else {
			System.out.println("Não foi necessário gerar o código do Evento '1 - TesteEvento1'");
		}

		// Mockagem ADMIN Maquina Virtual
		System.out.println("Verificando se vai ser necessário criar o usuário na tabela vendedor 'admin'");
		if (this.vendedorRepository.findById(2L).isEmpty()) {
			System.out.println("Criando o Vendedor '2 - admin'");

			Departamento departamento = this.departamentoRepository.findById(2L).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Departamento admin não encontrado"));

			Vendedor vendedor2 = new Vendedor();
			vendedor2.setId(2L);
			vendedor2.setNome("Admin");
			vendedor2.setDepartamento(departamento);
			vendedor2.setPassword("$2a$10$0cc8i3LAwq7GeBswW7gOP.dCyIZ73qed.kEUG4qQCZmOGFwAsBC4W");
			vendedor2.setUsuario("admin");
			vendedor2.setRole("ADMIN");
			vendedor2.setStatus(true);



			vendedorRepository.saveAll(Arrays.asList(vendedor2));
		} else {
			System.out.println("Não foi necessário gerar o código do vendedor 'maquina.virtual - admin'");
		}
	}
}
