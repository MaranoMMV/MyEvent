package com.myevent.eventos.controller;

import java.util.List;

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

import com.myevent.eventos.entity.Vendedor;
import com.myevent.eventos.entity.dto.VendedorDTO;
import com.myevent.eventos.service.VendedorService;

@RestController
@RequestMapping("/api/vendedores")
@CrossOrigin("http://localhost:4200")
public class VendedorController {

	private VendedorService vendedorService;

	public VendedorController(VendedorService vendedorService) {
		super();
		this.vendedorService = vendedorService;
	}

	@PostMapping("salvar/{idVendedor}")
    @ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Vendedor> postVendedor(@PathVariable Long idVendedor, @RequestBody VendedorDTO vendedorDTO) {
		return this.vendedorService.saveVendedor(idVendedor, vendedorDTO);
	}


	@GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
	public Vendedor getVendedorById(@PathVariable Long id) {
		return this.vendedorService.findVendedorById(id);
	}

	@GetMapping("/listagem/{id}")
    @ResponseStatus(HttpStatus.OK)
	public List<Vendedor> getAllVendedores(@PathVariable Long id){
		return this.vendedorService.findAllVendedores(id);
	}

	@PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
	public void putVendedor(@PathVariable Long id, @RequestBody VendedorDTO vendedorDTO) {
		this.vendedorService.modifyVendedor(id, vendedorDTO);
	}

	@DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteVendedor(@PathVariable Long id) {
		this.vendedorService.deleteVendedor(id);
	}

	@GetMapping
    @ResponseStatus(HttpStatus.OK)
	public List<Vendedor> listagem(){
		return this.vendedorService.listagemGeral();
	}

	@GetMapping("ativos/{id}")
    @ResponseStatus(HttpStatus.OK)
	public List<Vendedor> listagemAtivos(@PathVariable Long id){
		return this.vendedorService.listagemVendedorAtivo(id);
	}

	@GetMapping("inativos/{id}")
    @ResponseStatus(HttpStatus.OK)
	public List<Vendedor> listagemInativos(@PathVariable Long id){
		return this.vendedorService.listagemVendedorInativo(id);
	}

	@GetMapping("buscar-nome/{id}")
    @ResponseStatus(HttpStatus.OK)
	public List<Vendedor> getByNome(@PathVariable Long id, @RequestParam String nome){
		return this.vendedorService.procurarVendedorPorNome(id, nome);
	}
}
