package com.myevent.eventos.entity.dto;

public record ClienteDTO(String nome,
							String razao,
							String email,
							String telefone,
							Long idVendedor,
							String nomeVendedor,
							String cnpj,
							String quemCadastrou,
							Boolean aceitaReceberEmails) {

}
