package com.myevent.eventos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.myevent.eventos.entity.Departamento;
import com.myevent.eventos.entity.Vendedor;
import com.myevent.eventos.repository.DepartamentoRepository;

@Service
public class DepartamentoService {

	@Autowired
	private DepartamentoRepository departamentoRepository;
	@Autowired
	private VendedorService vendedorService;

	public Departamento saveDepartamento(Long id, Departamento departamento) {
		Vendedor vendedor = this.vendedorService.findVendedorById(id);
		Long idDepartamento = vendedor.getDepartamento().getId();
		if (idDepartamento == 1 ) {
			return null;
		} else if (idDepartamento == 2 || idDepartamento == 3) {

			return this.departamentoRepository.save(departamento);
		} else {
			return null;
		}
	}

	public Departamento findODepartamentoById(Long id) {
		return this.departamentoRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	public List<Departamento> listDepartamento(Long id) {
		Vendedor vendedor = this.vendedorService.findVendedorById(id);
		Long idDepartamento = vendedor.getDepartamento().getId();
		if (idDepartamento == 1) {
			return null;
		} else if (idDepartamento == 2 || idDepartamento == 3) {

			return this.departamentoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
		} else {
			return null;
		}
	}
	
	public List<Departamento> listDepartamentoOpcoes(){
		return this.departamentoRepository.findAll();
	}

	public void modifyDepartamento(Long id, Departamento departamento) {
		this.departamentoRepository.findById(id).map(departamentoAlterado -> {
			departamentoAlterado.setNome(departamento.getNome());
			return this.departamentoRepository.save(departamentoAlterado);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	public void deleteDepartamento(Long id) {
		this.departamentoRepository.findById(id).map(departamento -> {
			this.departamentoRepository.delete(departamento);
			return Void.TYPE;

		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Departamento não encontrado!"));
	}

}
