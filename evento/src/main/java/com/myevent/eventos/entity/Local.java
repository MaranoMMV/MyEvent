package com.myevent.eventos.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Local {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String estado;
	
	private String Cidade;
	
	private String bairro;
	
	private String rua;
	
	private String nomeLocal;
	
	private Integer numero;
	
    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Evento evento;
	
	private Boolean status;
}
