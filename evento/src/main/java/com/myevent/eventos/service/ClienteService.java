package com.myevent.eventos.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.myevent.eventos.entity.Cliente;
import com.myevent.eventos.entity.Evento;
import com.myevent.eventos.entity.EventoInteresseCliente;
import com.myevent.eventos.entity.Vendedor;
import com.myevent.eventos.entity.dto.ClienteDTO;
import com.myevent.eventos.repository.ClienteRepository;
import com.myevent.eventos.repository.EventoRepository;
import com.myevent.eventos.repository.VendedorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClienteService {

	// Atributos
	@Autowired
	private final ClienteRepository clienteRepository;
	@Autowired
	private final VendedorRepository vendedorRepository;
	@Autowired
	private final EventoRepository eventoRepository;
	@Autowired
	private final EventoClienteService eventoClienteService;
	@Autowired
	private final EventoInteresseClienteService eventoInteresseClienteService;

	// Procura o Cliente por id, caso não encontre ele retorna um NOT_FOUND
	public Cliente findClienteById(Long id) {
		return this.clienteRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));
	}

	// Busca todos os clientes por ordem de ID.
	public ResponseEntity<List<Cliente>> findAllClientes(Long id) {

		Vendedor vendedor = this.vendedorRepository.findById(id).orElseThrow(null);
		Long idDepartamento = vendedor.getDepartamento().getId();

		if (idDepartamento == 1) {
			return ResponseEntity.ok(this.clienteRepository.findByVendedorId(id));
		} else if (idDepartamento == 2 || idDepartamento == 3) {
			return ResponseEntity.ok(this.clienteRepository.findAll(Sort.by(Sort.Direction.ASC, "id")));
		} else {
			return null;
		}
	}

	// Salvar novos clientes ou apenas vincula a um novo evento caso o Cliente já
	// for existente no banco de dados.
    public Cliente saveCliente(ClienteDTO clienteDTO) {

    	//Gera uma data
    	String date = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));


        //Verifica se já existe um cliente existente com o mesmo CNPJ
        String cnpjFormatado = formatarCnpj(clienteDTO.cnpj());

        Optional<Cliente> clienteExistente = this.clienteRepository.findByCnpj(cnpjFormatado);

        Evento ultimoEvento = this.eventoRepository.findTopByOrderByIdDesc();

        //Gerando um novo Objeto Cliente para transformar os dados de DTO para Object
        Cliente cliente = new Cliente();

        //Verifica se o cliente já é existente.
        if (clienteExistente.isPresent()) {
            cliente = clienteExistente.get();

        } else {
            if(clienteDTO.idVendedor() != null) {
                List<Long> departamentoIds = Arrays.asList(1L, 2L);
                Optional<Vendedor> vendedorById = this.vendedorRepository.findActiveByIdAndDepartamentoIds(clienteDTO.idVendedor(), departamentoIds);
            	cliente.setVendedor(vendedorById.get());
            } else if(clienteDTO.nomeVendedor() != null) {
                Optional<Vendedor> vendedorByName = this.vendedorRepository.findTopByNome(clienteDTO.nomeVendedor());
                if(vendedorByName.isPresent()) {
                	cliente.setVendedor(vendedorByName.get());
                }else {
                	Vendedor vendedorSemVinculo = vendedorRepository.findById(1L)
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor 'Sem vínculo' que funciona no sistema não foi encontrado :("));
                    cliente.setVendedor(vendedorSemVinculo);
                }
            }else {
            	//Procura o vendedor Sem vinculo que foi gerado automaticamente pelo sistema, se ele não existir vai ocorrer o erro, pois esse vendedor 'Sem Vinculo' é necessario para o sistema
                Vendedor vendedorSemVinculo = vendedorRepository.findById(1L)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor 'Sem vínculo' que funciona no sistema não foi encontrado :("));
                cliente.setVendedor(vendedorSemVinculo);
            }

            //Verifica o vendedor que foi escrito, se ele procurar o vendedor pelo nome e não encontrar, ele retorna como "Sem Vinculo" e pode ser alterado manualmente no sistema web // put via POSTMAN
            

		//Transformando o DTO para OBJECT
	        cliente.setCnpj(cnpjFormatado);
            cliente.setNome(clienteDTO.nome());
            cliente.setEmail(clienteDTO.email());
            cliente.setRazao(clienteDTO.razao());
            cliente.setData(date);
            cliente.setTelefone(clienteDTO.telefone());
            cliente.setAceitaReceberEmails(clienteDTO.aceitaReceberEmails());

        }
        Cliente clienteSalvo = this.clienteRepository.save(cliente);
        	
        this.eventoInteresseClienteService.salvarEventoCliente(ultimoEvento, clienteSalvo);

        return clienteSalvo;
    }
	
	public void deletarCliente(Long id) {
		// Procura cliente para deletar, se encontrar ele apaga o cliente caso contrario
		// ele joga um erro
		this.clienteRepository.findById(id).map(cliente -> {
			this.clienteRepository.delete(cliente);
			return Void.TYPE;
		}).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado para ser alterado!"));
	}

	// Esta função é um botão no angular que serve para vincular o evento ao cliente
	// mais facilmente, caso o cliente não se cadastre no site e solicia ao vendedor
	// para fazer.
	public void adicionarClienteAoEvento(Long id) {

		// puxa o ultimo evento
		Evento ultimoEvento = this.eventoRepository.findTopByOrderByIdDesc();
		// puxa o clientepor id, e depois vincula ele ao evento.
		this.clienteRepository.findById(id).map(cliente -> {
			if (ultimoEvento != null) {
				eventoClienteService.salvarEventoCliente(cliente, ultimoEvento);
			}
			return this.clienteRepository.save(cliente);

		});
	}

	// Modificação do cliente, primeiro ele puxa o cliente e realiza o mapeamento do
	// cliente de DTO para OBJECT
	public void modifyCliente(Long id, ClienteDTO clienteDTO) {

		this.clienteRepository.findById(id).map(clienteAtualizado -> {

			// Verifica se o vendedor que foi digitado existe, Se não existir coloca ele
			// como vendedor 'sem vinculo'
			if (vendedorRepository.findById(clienteDTO.idVendedor()).isPresent()) {
				Vendedor vendedor = vendedorRepository.findById(clienteDTO.idVendedor()).get();
				clienteAtualizado.setVendedor(vendedor);
			} else {
				Vendedor vendedorSemVinculo = vendedorRepository.findById(1L)
						.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
								"Vendedor 'Sem vínculo' que funciona no sistema não foi encontrado :("));
				clienteAtualizado.setVendedor(vendedorSemVinculo);
			}

			String cnpjFormatado = formatarCnpj(clienteDTO.cnpj());
			// Transformando o DTO para OBJECT
			clienteAtualizado.setCnpj(cnpjFormatado);
			clienteAtualizado.setNome(clienteDTO.nome());
			clienteAtualizado.setEmail(clienteDTO.email());
			clienteAtualizado.setRazao(clienteDTO.razao());
			clienteAtualizado.setTelefone(clienteDTO.telefone());

			return this.clienteRepository.save(clienteAtualizado);

		}).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado para ser alterado!"));
	}

	// Retorna a lista de um cliente de todos os eventos que ele participou
	public ResponseEntity<List<Evento>> getEventosByClienteId(Long clienteId) {
		eventoClienteService.listagemDeEvento(clienteId);
		
		eventoRepository.findByclientesId(clienteId);
		return ResponseEntity.ok(this.eventoRepository.findByclientesId(clienteId));

	}
	
	public List<Evento> getEventosInteresseByClienteId(Long clienteId) {
	    // Obter a lista de EventoInteresseCliente
	    List<EventoInteresseCliente> eventoInteresseClienteList = eventoInteresseClienteService.listagemDeEventoInteresse(clienteId);
	    
	    // Mapear a lista de EventoInteresseCliente para uma lista de Evento
	    List<Evento> eventos = eventoInteresseClienteList.stream()
	                                      .map(EventoInteresseCliente::getEvento)
	                                      .collect(Collectors.toList());
	    
	    return eventos;
	}

	public List<Cliente> findClientesSemVinculoVendedor(Long id) {

		Vendedor vendedor = this.vendedorRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado!"));
		Long idDepartamento = vendedor.getDepartamento().getId();

		if (idDepartamento == 1) {
			return null;
		} else if (idDepartamento == 2 || idDepartamento == 3) {
			return this.clienteRepository.findByVendedorId(1L);
		} else {
			return null;
		}

	}

	public Cliente buscarClienteByCNPJ(Long id, String cnpj) {
		// Formatar o CNPJ
		String cnpjFormatado = formatarCnpj(cnpj);

		// Buscar o vendedor pelo ID
		Vendedor vendedor = this.vendedorRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado!"));

		// Buscar o cliente pelo CNPJ
		Cliente cliente = this.clienteRepository.findByCnpj(cnpjFormatado).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente com o CNPJ não encontrado"));

		Long idDepartamento = vendedor.getDepartamento().getId();

		// Verificar as regras de departamento
		if (idDepartamento == 1) {
			if (cliente.getVendedor().getId().equals(vendedor.getId())) {
				return cliente;
			}
		} else if (idDepartamento == 2 || idDepartamento == 3) {
			return cliente;
		}

		return null;

	}
	public List<Cliente> buscarClientePorVendedor(Long id, Long idVendedorRequest){
		Vendedor vendedor = this.vendedorRepository.findById(id).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		
		Vendedor vendedorRequest = this.vendedorRepository.findById(idVendedorRequest)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado!"));	
		Long idDepartamento = vendedorRequest.getDepartamento().getId();
		
		if(idDepartamento == 1) {
			return null;
		}else if (idDepartamento == 2|| idDepartamento == 3) {
			
			return this.clienteRepository.findByVendedor(vendedor);
		}else {
			return null;
		}
		
	}
	private String formatarCnpj(String cnpj) {
		// Remover caracteres não numéricos do CNPJ
		String cnpjLimpo = cnpj.replaceAll("[^0-9]", "");

		// Formatar CNPJ com pontos, barra e traço
		return cnpjLimpo.replaceFirst("(\\d{2})(\\d{3})(\\d{3})(\\d{4})(\\d{2})", "$1.$2.$3/$4-$5");
	}
	
    public List<Cliente> buscarCadastradosOntem(Long id) {
    	return this.eventoInteresseClienteService.buscarClientesCadastradosOntem(id);
    }
    
    public List<Cliente> buscarCadastradosHoje(Long id) {
    	return this.eventoInteresseClienteService.buscarClientesCadastradosHoje(id);
    }
	

}
