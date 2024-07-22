package com.myevent.eventos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.myevent.eventos.entity.Cliente;
import com.myevent.eventos.entity.Evento;
import com.myevent.eventos.entity.dto.ClienteDTO;
import com.myevent.eventos.service.ClienteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("http://localhost:4200")
@RequiredArgsConstructor
public class ClienteController {

	@Autowired
	private final ClienteService clienteService;

	@PostMapping
    @ResponseStatus(HttpStatus.CREATED)
	public void postCliente(@RequestBody ClienteDTO clienteDTO) {
		System.out.println(clienteDTO.toString());
		 this.clienteService.saveCliente(clienteDTO);
	}

	@GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
	public Cliente getClienteById(@PathVariable Long id) {
		return this.clienteService.findClienteById(id);
	}

	@GetMapping("{id}/listagem")
    @ResponseStatus(HttpStatus.OK)
	public ResponseEntity<List<Cliente>> getAllClientes(@PathVariable Long id) {
		return this.clienteService.findAllClientes(id);
	}

	@DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCliente(@PathVariable Long id) {
		this.clienteService.deletarCliente(id);
	}

	@PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
	public void putCliente(@PathVariable Long id, @RequestBody ClienteDTO clienteDTO) {
		this.clienteService.modifyCliente(id, clienteDTO);
		}

    @GetMapping("{id}/eventos")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Evento>> getEventosByClienteId(@PathVariable Long id) {
        return clienteService.getEventosByClienteId(id);
    }

    @GetMapping("{id}/sem-vinculo")
    @ResponseStatus(HttpStatus.OK)
    public List<Cliente> getClientesSemVinculoVendedor(@PathVariable Long id){
    	return this.clienteService.findClientesSemVinculoVendedor(id);
    }

    @PostMapping("/adicionar-evento-ao-cliente")
    @ResponseStatus(HttpStatus.CREATED)
    public void adicionarClienteAoEvento(@RequestBody Long id) {
    	this.clienteService.adicionarClienteAoEvento(id);
    }

	@GetMapping("/by-cnpj/{id}")
    @ResponseStatus(HttpStatus.OK)
	public Cliente buscarClientesPorCnpj(@PathVariable Long id ,@RequestParam String cnpj) {
		return this.clienteService.buscarClienteByCNPJ(id, cnpj);
	}
	
    @GetMapping("{id}/eventos-interesse")
    @ResponseStatus(HttpStatus.OK)
    public List<Evento> getEventosInteresseByClienteId(@PathVariable Long id) {
        return clienteService.getEventosInteresseByClienteId(id);
    }

    @GetMapping("{id}/cliente-vendedor")
    @ResponseStatus(HttpStatus.OK)
    public List<Cliente> getClientePorVendedor(@PathVariable Long id, @RequestParam Long idVendedor){
    	return this.clienteService.buscarClientePorVendedor(id, idVendedor);
    }
    
    @GetMapping("listagem-cadastrados-hoje")
    @ResponseStatus(HttpStatus.OK)
    public List<Cliente> getClientesCadastradosHoje(@RequestParam Long idVendedor){
    	return this.clienteService.buscarCadastradosHoje(idVendedor);
    }
    
    @GetMapping("listagem-cadastrados-ontem")
    @ResponseStatus(HttpStatus.OK)
    public List<Cliente> getClientesCadastradosOntem(@RequestParam Long idVendedor){
    	return this.clienteService.buscarCadastradosOntem(idVendedor);
    }

}
