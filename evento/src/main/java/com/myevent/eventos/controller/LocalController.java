package com.myevent.eventos.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.myevent.eventos.entity.Local;
import com.myevent.eventos.entity.dto.LocalDTO;
import com.myevent.eventos.service.LocalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/locais")
@CrossOrigin("http://localhost:4200")
public class LocalController {

	private final LocalService localService;
	
	@GetMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public Local getLocalById(@PathVariable Long id) {
		return this.localService.procurarLocalById(id);
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Local> getListagemLocal(){
		return this.localService.listagemDeLocal();
	}
	
	@PostMapping("{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Local postLocal(@PathVariable Long id ,@RequestBody LocalDTO localdto) {
		return this.localService.adicionarLocal(id, localdto);
	}
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void putLocal(Long id, LocalDTO localDTO) {
		this.localService.editarLocal(id, localDTO);
	}
	
	@GetMapping("locaisPorEvento/{id}")
	@ResponseStatus(HttpStatus.OK)
	public List<Local> getListagemLocalPorEvento(@PathVariable Long id){
		return this.localService.procurarLocalPorEvento(id);
	}
	
	
}
