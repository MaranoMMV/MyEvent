package com.myevent.eventos.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.myevent.eventos.entity.Horario;
import com.myevent.eventos.entity.Local;
import com.myevent.eventos.entity.Vendedor;
import com.myevent.eventos.entity.dto.HorarioDTO;
import com.myevent.eventos.repository.HorarioRepository;
import com.myevent.eventos.repository.LocalRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HorarioService {

	private final HorarioRepository horarioRepository;
	private final LocalRepository localRepository;
	private final VendedorService vendedorService;
	
	public Horario findHorarioById(Long id) {
		return this.horarioRepository.findById(id).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Horario não encontrado"));
	}
	
	public Horario salvarHorario(Long id, HorarioDTO horarioDTO) {
		Vendedor vendedor = this.vendedorService.findVendedorById(id);
		Long idDepartamento = vendedor.getDepartamento().getId();
		
		if (idDepartamento == 1) {
			return null;
		} else if (idDepartamento == 2 || idDepartamento == 3 ) {
		Local local = this.localRepository.findById(horarioDTO.localId()).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Local não encontrado"));
		 String horarioInicioFormatado = this.formatarHorario(horarioDTO.horarioInicio());
         String horarioFimFormatado = this.formatarHorario(horarioDTO.horarioFim());
		Horario horario = new Horario();
		horario.setData(horarioDTO.data());
		horario.setHorarioInicio(horarioInicioFormatado);
		horario.setHorarioFim(horarioFimFormatado);
		horario.setLocal(local);
		return this.horarioRepository.save(horario);
		}else {
			return null;
		}
	}
	
	public List<Horario> buscarHorarios(){
		return this.horarioRepository.findAll();
	}
	
	public List<Horario> buscarHorarioPorLocal(Long id){
		Local local = this.localRepository.findById(id).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Local não encontrado"));
		return this.horarioRepository.findByLocal(local);
	}
	
	public void editarHorario(Long id, HorarioDTO horarioDTO, Long idVendedor) {
		Vendedor vendedor = this.vendedorService.findVendedorById(id);
		Long idDepartamento = vendedor.getDepartamento().getId();
		
		if (idDepartamento == 1) {
		} else if (idDepartamento == 2 || idDepartamento == 3 ) {
		Local local = this.localRepository.findById(horarioDTO.localId()).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Local não encontrado"));
		this.horarioRepository.findById(id).map(horario -> {
			horario.setData(horarioDTO.data());
			horario.setHorarioFim(horario.getHorarioFim());
			horario.setHorarioInicio(horario.getHorarioInicio());
			horario.setLocal(local);
			 return this.horarioRepository.save(horario);
		});
		}
	}
	
	public static String formatarHorario(String horario) {
        // Verifica se o horário já contém ':'
        if (horario != null && !horario.contains(":") && horario.length() == 4) {
            // Adiciona ':' entre os dois primeiros e os dois últimos caracteres
            return horario.substring(0, 2) + ":" + horario.substring(2, 4);
        }
        return horario;
    }
}
