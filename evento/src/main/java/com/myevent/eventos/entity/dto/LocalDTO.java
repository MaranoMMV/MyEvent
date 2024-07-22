package com.myevent.eventos.entity.dto;

public record LocalDTO(String estado,
						String cidade,
						String bairro,
						String rua,
						String nomeLocal,
						Integer numero,
						Long eventoId,
						Boolean status) {

}
