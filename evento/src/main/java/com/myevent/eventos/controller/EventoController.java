package com.myevent.eventos.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.http.HttpStatus;
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
import com.myevent.eventos.entity.dto.EventoDTO;
import com.myevent.eventos.service.EventoService;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin("http://localhost:4200")
public class EventoController {

	private EventoService eventoService;

	public EventoController(EventoService eventoService) {
		this.eventoService = eventoService;
	}

	@GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
	public Evento getEventoById(@PathVariable Long id) {
		return this.eventoService.findEventoById(id);
	}

	@GetMapping("listagem/{id}")
    @ResponseStatus(HttpStatus.OK)
	public List<Evento> getAllEventos(@PathVariable Long id){
		return this.eventoService.listEventos(id);
	}

	@GetMapping("/ulltimoEvento")
    @ResponseStatus(HttpStatus.OK)
	public Evento getEventoById() {
		return this.eventoService.buscarUltimoEvento();
	}


    @PostMapping("{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Evento saveEvento(@PathVariable Long id,@RequestBody EventoDTO eventoDTO) throws ParseException {
        return eventoService.saveEvento(id, eventoDTO);
    }


	@DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteEvento(@PathVariable Long id) {
		this.eventoService.deleteEventoById(id);
	}

	@PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
	public void putEvento(@PathVariable Long id, @RequestBody Evento evento,  @RequestParam Long idVendedor) {
		this.eventoService.modifyEvento(id, evento, idVendedor);
	}

    @GetMapping("/clientes-em-eventos/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Cliente> getClientesPorEvento(@PathVariable Long id, @RequestParam Long idVendedor) {
        return eventoService.buscarClientesPorEvento(id, idVendedor);
    }
    
    @GetMapping("/clientes-em-eventos-interesse/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Cliente> getClientesPorEventoInteresse(@PathVariable Long id, @RequestParam Long idVendedor) {
        return eventoService.buscarClientesPorEventoInteresse(id, idVendedor);
    }
    
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Evento> getClientesListagemOpcoes() {
        return eventoService.listagemClientesOpcoes();
    }
}
