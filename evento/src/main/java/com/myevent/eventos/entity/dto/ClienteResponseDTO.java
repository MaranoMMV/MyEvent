package com.myevent.eventos.entity.dto;

public record ClienteResponseDTO(String nome,
							String razao,
							String email,
							String telefone,
							Long idVendedor,
							String cnpj,
							String quemCadastrou,
							Boolean aceitaReceberEmail,
							String token
		) {

}
