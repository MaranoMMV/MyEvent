package com.myevent.eventos.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.myevent.eventos.entity.Departamento;
import com.myevent.eventos.entity.Vendedor;
import com.myevent.eventos.entity.dto.ResponseDTO;
import com.myevent.eventos.entity.dto.VendedorDTO;
import com.myevent.eventos.infra.security.TokenService;
import com.myevent.eventos.repository.DepartamentoRepository;
import com.myevent.eventos.repository.VendedorRepository;

@Service
public class VendedorService {

	@Autowired
	private VendedorRepository vendedorRepository;
	@Autowired
	private DepartamentoRepository departamentoRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private TokenService tokenService;


	public Vendedor findVendedorById(Long id) {
		return this.vendedorRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado!"));
	}

	public List<Vendedor> findAllVendedores(Long id) {
		Vendedor vendedor = this.vendedorRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado!"));

		Long idDepartamento = vendedor.getDepartamento().getId();
		if (idDepartamento == 2 || idDepartamento == 3 ) {
			return this.vendedorRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
		} else if (idDepartamento == 1) {
			return null;
		} else {
			return null;
		}

	}

	public ResponseEntity saveVendedor(Long idVendedor, VendedorDTO vendedorDTO) {
		Vendedor vendedorAVerificar = this.vendedorRepository.findById(idVendedor).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Não encontrado o vendedor"));
		Long idDepartamento = vendedorAVerificar.getDepartamento().getId();
		if (idDepartamento == 1) {
			return null;
		} else if (idDepartamento == 2 || idDepartamento == 3 ) {

			Optional<Vendedor> vendedor = this.vendedorRepository.findByUsuario(vendedorDTO.usuario());

			if (vendedor.isEmpty()) {
				Departamento departamento = this.departamentoRepository.findById(vendedorDTO.departamentoId())
						.orElseThrow(
								() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Departamento não encontrado"));

				Vendedor novoVendedor = new Vendedor();
				novoVendedor.setPassword(passwordEncoder.encode(vendedorDTO.password()));
				novoVendedor.setUsuario(vendedorDTO.usuario());
				novoVendedor.setNome(vendedorDTO.nome());
				novoVendedor.setDepartamento(departamento);
				novoVendedor.setNome(vendedorDTO.nome());
				novoVendedor.setRole(vendedorDTO.role());
				novoVendedor.setStatus(vendedorDTO.status());
				novoVendedor.setNome(vendedorDTO.nome());

				this.vendedorRepository.save(novoVendedor);

				String token = this.tokenService.generateToken(novoVendedor);
				return ResponseEntity.ok(new ResponseDTO(novoVendedor.getId(), novoVendedor.getNome(), token));
			}
		}
		return ResponseEntity.badRequest().build();
	}

	public void deleteVendedor(Long id) {
		this.vendedorRepository.findById(id).map(vendedor -> {
			this.vendedorRepository.delete(vendedor);
			return Void.TYPE;
		}).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado para ser apagado!"));
	}

	public void modifyVendedor(Long id, VendedorDTO vendedorDTO) {
		Departamento departamento = this.departamentoRepository.findById(vendedorDTO.departamentoId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

		this.vendedorRepository.findById(id).map(vendedorAtualizado -> {
			vendedorAtualizado.setDepartamento(departamento);
			vendedorAtualizado.setNome(vendedorDTO.nome());
			vendedorAtualizado.setRole(vendedorDTO.role());
			vendedorAtualizado.setStatus(vendedorDTO.status());
			vendedorAtualizado.setUsuario(vendedorDTO.usuario());
			vendedorAtualizado.setPassword(vendedorDTO.password());
			return this.vendedorRepository.save(vendedorAtualizado);
		}).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado para ser alterado!"));
	}

	public List<Vendedor> listagemGeral() {
		return vendedorRepository.findByDepartamentos(Arrays.asList(1L, 2L));
	}

	public List<Vendedor> listagemVendedorAtivo(Long id) {
		Vendedor vendedor = this.vendedorRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado para ser vinculado!"));

		Long departamentoId = vendedor.getDepartamento().getId();

		if (departamentoId == 1) {
			return null;
		} else if (departamentoId == 2 || departamentoId == 3) {
			return this.vendedorRepository.findVendedoresAtivos();
		} else {
			return null;
		}
	}

	public List<Vendedor> listagemVendedorInativo(Long id) {
		Vendedor vendedor = this.vendedorRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado para ser vinculado!"));

		Long departamentoId = vendedor.getDepartamento().getId();

		if (departamentoId == 1) {
			return null;
		} else if (departamentoId == 2 || departamentoId == 3) {
			return this.vendedorRepository.findVendedoresInativos();
		} else {
			return null;
		}
	}

	public List<Vendedor> procurarVendedorPorNome(Long id, String nome) {
		// Verificando se o ID que está fazendo a requisição tem permissão para
		// verificar os vendedores
		Vendedor vendedorVerificado = this.vendedorRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado para ser vinculado!"));

		Long departamentoId = vendedorVerificado.getDepartamento().getId();

		if (departamentoId == 1) {
			return null;
		} else if (departamentoId == 2 || departamentoId == 3) {
			// fazendo a consulta no banco de dados para retornar o Vendedor por nome;
			return this.vendedorRepository.findByNome(nome);
		} else {
			return null;
		}
	}

}
