package com.myevent.eventos.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.myevent.eventos.entity.Evento;
import com.myevent.eventos.entity.Local;
import com.myevent.eventos.entity.Vendedor;
import com.myevent.eventos.entity.dto.LocalDTO;
import com.myevent.eventos.repository.LocalRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocalService {

	private final LocalRepository localRepository;
	private final EventoService eventoService;
	private final VendedorService vendedorService;
	
	public Local adicionarLocal(Long id, LocalDTO localDTO) {
		
		Vendedor vendedor = this.vendedorService.findVendedorById(id);
		Long idDepartamento = vendedor.getDepartamento().getId();
		if (idDepartamento == 1 ) {
			return null;
		} else if (idDepartamento == 2 || idDepartamento == 3 ) {
			Evento evento = this.eventoService.findEventoById(localDTO.eventoId());
			Local local = new Local();
			local.setBairro(localDTO.bairro());
			local.setCidade(localDTO.cidade());
			local.setEstado(localDTO.estado());
			local.setNomeLocal(localDTO.nomeLocal());
			local.setNumero(localDTO.numero());
			local.setRua(localDTO.rua());
			local.setEvento(evento);
			local.setStatus(localDTO.status());
			return this.localRepository.save(local);
		} else {
			return null;
		}
		
		
	}
	
	public Local procurarLocalById(Long id) {
		return this.localRepository.findById(id).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Local não encontrado!"));
	}
	
	public List<Local> listagemDeLocal(){
		return this.localRepository.findAll();
	}
	
	public List<Local> procurarLocalPorEvento(Long id){
		Evento evento = this.eventoService.findEventoById(id);
		return this.localRepository.findByEvento(evento);
	}
	
	public void editarLocal(Long id, LocalDTO localDTO) {
		this.localRepository.findById(id).map(novoLocal -> {
			Evento evento = this.eventoService.findEventoById(localDTO.eventoId());
			novoLocal.setBairro(localDTO.bairro());
			novoLocal.setCidade(localDTO.cidade());
			novoLocal.setEstado(localDTO.estado());
			novoLocal.setNomeLocal(localDTO.nomeLocal());
			novoLocal.setNumero(localDTO.numero());
			novoLocal.setRua(localDTO.rua());
			novoLocal.setEvento(evento);
			novoLocal.setStatus(localDTO.status());
			return this.localRepository.save(novoLocal);
		});
	}
	
}
