package com.myevent.eventos.controller;

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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.myevent.eventos.entity.Departamento;
import com.myevent.eventos.service.DepartamentoService;

@RestController
@RequestMapping("/api/departamentos")
@CrossOrigin("http://localhost:4200")
public class DepartamentoController {

	private DepartamentoService departamentoService;

	public DepartamentoController(DepartamentoService departamentoService) {
		this.departamentoService = departamentoService;
	}

	@PostMapping("{id}")
    @ResponseStatus(HttpStatus.CREATED)
	public Departamento postDepartamento(@RequestBody Departamento departamento, @PathVariable Long id) {
		return this.departamentoService.saveDepartamento(id, departamento);
	}


	@GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
	public Departamento getDepartamento(@PathVariable Long id) {
		return this.departamentoService.findODepartamentoById(id);
	}

	@GetMapping("listagem/{id}")
    @ResponseStatus(HttpStatus.OK)
	public List<Departamento> getAllDepartamento(@PathVariable Long id){
		return this.departamentoService.listDepartamento(id);
	}
	
	@GetMapping
    @ResponseStatus(HttpStatus.OK)
	public List<Departamento> getAllDepartamentoListagemOpcoes(){
		return this.departamentoService.listDepartamentoOpcoes();
	}

	@DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteDepartamento(@PathVariable Long id) {
		 this.departamentoService.deleteDepartamento(null);
	}

	@PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
	public void putDepartamento(@PathVariable Long id, @RequestBody Departamento departamento) {
		this.departamentoService.modifyDepartamento(id, departamento);
	}
}
