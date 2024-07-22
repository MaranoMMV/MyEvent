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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.myevent.eventos.entity.Horario;
import com.myevent.eventos.entity.dto.HorarioDTO;
import com.myevent.eventos.service.HorarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/horarios")
@CrossOrigin("http://localhost:4200")
@RequiredArgsConstructor
public class HorarioController {

	private final HorarioService horarioSerivce;

	
	@PostMapping("{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Horario salvarHorario(@PathVariable Long id, @RequestBody HorarioDTO horarioDTO) {
		return this.horarioSerivce.salvarHorario(id, horarioDTO);
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Horario> buscarListagemDeHorarios(){
		return this.horarioSerivce.buscarHorarios();
	}
	
	@GetMapping("listagem-horarios/{id}")
	@ResponseStatus(HttpStatus.OK)
	public List<Horario> buscarListagemDeHorariosPorLocal(@PathVariable Long id){
		return this.horarioSerivce.buscarHorarioPorLocal(id);
	}
	
	@GetMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public Horario buscarHorarioPorId(@PathVariable Long id) {
		return this.horarioSerivce.findHorarioById(id);
	}
	
	@PutMapping("{id}")
	public void putHorario(@PathVariable Long id, @RequestBody HorarioDTO horarioDTO, @RequestParam Long idVendedor) {
		this.horarioSerivce.editarHorario(id, horarioDTO, idVendedor);
	}
}
