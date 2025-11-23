import {validate} from "bycontract";
import promptsync from 'prompt-sync';
const prompt = promptsync({sigint: true});
// ---------------------------------------------
export class Ferramenta {
	#nome;

	constructor(nome) {
        validate(nome,"String");
		this.#nome = nome;
	}

	get nome() {
		return this.#nome;
	}
	
	usar() {
		return true;
	}
}

export class Mochila {
	#ferramentas;
	#slots;

	constructor(limite){
		validate(arguments, ["Number"]);
		this.#ferramentas = [];
		this.#slots = limite;
	}

	get espacoLivreNaMochila() {
		return this.#slots - this.#ferramentas.length;
	}

	guarda(ferramenta){
		validate(ferramenta,Ferramenta);
		if (this.espacoLivreNaMochila > 0) {
			this.#ferramentas.push(ferramenta);
		}
	}

	pega(nomeFerramenta){
		validate(arguments,["String"]);
		let ferramenta = this.#ferramentas.find(f => f.nome === nomeFerramenta);
		return ferramenta;
	}

	remove(nomeFerramenta) {
		validate(arguments, ["String"]);
		const id = this.#ferramentas.findIndex(f => f.nome === nomeFerramenta)
		if (id !== -1) {
            const ferramentaRemovida = this.#ferramentas.splice(id, 1)[0];
            return ferramentaRemovida; 
        }
		
		return false;
	}

	tem(nomeFerramenta){
		validate(arguments,["String"]);
		return this.#ferramentas.some(f => f.nome === nomeFerramenta);
	}

	inventario(){
		return this.#ferramentas.map(obj => obj.nome).join(", ");
	}
}
// ---------------------------------------------
export class Objeto {
	#nome;
    #descricaoAntesAcao;
    #descricaoDepoisAcao;
    #acaoOk;
    	
	constructor(nome,descricaoAntesAcao, descricaoDepoisAcao) {
		validate(arguments,["String","String","String"]);
		this.#nome = nome;
		this.#descricaoAntesAcao = descricaoAntesAcao;
		this.#descricaoDepoisAcao = descricaoDepoisAcao;
		this.#acaoOk = false;
	}
	
	get nome(){
		return this.#nome;
	}

	get acaoOk() {
		return this.#acaoOk;
	}

	set acaoOk(acaoOk) {
		validate(acaoOk,"Boolean");
		this.#acaoOk = acaoOk;
	}

	get descricao() {
		if (!this.acaoOk) {
			return this.#descricaoAntesAcao;
		}else {
			return this.#descricaoDepoisAcao;
		}
	}

	usa(ferramenta,objeto){
	}
}
// ---------------------------------------------
export class Sala {
	#nome;
	#objetos;
	#ferramentas;
	#npc;
	#portas;
	#engine;
	
	constructor(nome,engine) {
		validate(arguments,["String",Engine]);
		this.#nome = nome;
		this.#objetos = new Map();
		this.#ferramentas = new Map();
		this.#portas = new Map();
		this.#npc = new Map()
		this.#engine = engine;
	}

	get nome() {
		return this.#nome;
	}
	
	get objetos() {
		return this.#objetos;
	}

	get ferramentas() {
		return this.#ferramentas;
	}

	get npc() {
		return this.#npc;
	}
	
	get portas(){
		return this.#portas;
	}

	get engine(){
		return this.#engine;
	}
	
	objetosDisponiveis(){
		let arrObjs = [...this.#objetos.values()];
    	return arrObjs.map(obj=>"• "+obj.nome+": "+obj.descricao).join('\n');
	}

	ferramentasDisponiveis(){
		let arrFer = [...this.#ferramentas.values()];
    	return arrFer.map(f=>"• "+f.nome).join('\n');		
	}

	npcsDisponiveis() {
		let arrNpc = [...this.#npc.values()];
		return arrNpc.map(n =>n.nome);
	}
	
	portasDisponiveis(){
		let arrPortas = [...this.#portas.values()];
    	return arrPortas.map(sala=>"• "+sala.nome).join('\n');
	}
	
	pega(nomeFerramenta) {
		validate(nomeFerramenta,"String");
		let ferramenta = this.#ferramentas.get(nomeFerramenta);
		if (ferramenta != null) {
			this.#engine.mochila.guarda(ferramenta);
			this.#ferramentas.delete(nomeFerramenta);
			return true;
		}else {
			return false;
		}
	}

	sai(porta) {
		validate(porta,"String");
		return this.#portas.get(porta);
	}

	textoDescricao() {
		let descricao = "Você está no "+this.nome+"\n"; // Nome da Sala
		if (this.npc.size == 0) {
			descricao += "--------------------------------------------------\n";
			descricao += "Não há ninguém aqui\n";
		
		} else {
			descricao += "--------------------------------------------------\n";
			const npcAtual = [...this.npc.values()][0];
			if (npcAtual.vivo) { // NPCs na Sala
				if (npcAtual.hostil) {
					descricao += "CUIDADO! Você avista: " + this.npcsDisponiveis() + "\n";
					descricao += "Ele é agressivo para contigo! Fuja (sai) ou Derrote (ataca) ele para prosseguir!";
					return descricao // Retorna a descricao e impede o resto das informaçoes, indiretamente impedindo o Jogador continuar enquanto não derrotar o NPC
									// Método simples (quebra-galho) de obrigar o Jogador interagir em combate com os NPCs, mas não bloqueia o jogador de realizar
									// quaisquer outras acoes que estariam 'invisiveis' na sala, caso ele saiba que exista aquela informacao naquela sala
				} else {
					descricao += "Você vê: " + this.npcsDisponiveis() + "\n";
				}
			} else {
				descricao += "Você vê: " + this.npcsDisponiveis() + " morto" + "\n";
			}
		}
		if (this.ferramentas.size == 0){
			descricao += "--------------------------------------------------\n";
            descricao += "Não há ferramentas na sala\n\n"; 
			
        }else{
			descricao += "--------------------------------------------------\n";
            descricao += "Ferramentas:\n"+this.ferramentasDisponiveis()+"\n"; // Ferramentas na Sala
			
        }		
        if (this.objetos.size == 0){
			descricao += "--------------------------------------------------\n";
            descricao += "Não há objetos na sala\n\n";
			
        }else{
			descricao += "--------------------------------------------------\n";
            descricao += "Objetos:\n"+this.objetosDisponiveis()+"\n"; // Objetos na Sala
			
        }
		descricao += "--------------------------------------------------\n";
        descricao += "Portas:\n"+this.portasDisponiveis()+"\n"; // Direções
		descricao += "--------------------------------------------------\n";
		return descricao;
	}

	usa(ferramenta,objeto){
		return false;
	}

	ataca(ferramentaNome, npcNome) {
		validate(arguments, ["String", "String"]);
		
		if (!this.engine.mochila.tem(ferramentaNome)) {
			return false;
		}
		if (!this.npc.has(npcNome)) {
			return false;
		}
		
		// Obtém a instância do NPC
		let alvoNpc = this.npc.get(npcNome); 
		
		// Obtém a instância da Ferramenta
		let fer = this.engine.mochila.pega(ferramentaNome); 
		
		// Chamada do método ataca() da classe NPC
		return alvoNpc.ataca(fer, this.engine);
	}
}
// ---------------------------------------------
//Exemplo de como pode ser a classe de controle do jogo
// ---------------------------------------------
export class Engine {
	#mochila;
	#salaCorrente;
	#fim;
	#vitoria;

	constructor(){
		this.#mochila = new Mochila(3, ["tocha"]);
		this.#salaCorrente = null;
		this.#fim = false;
		this.#vitoria = false;
		this.criaCenario();
	}

	get mochila(){
		return this.#mochila;
	}

	get salaCorrente(){
		return this.#salaCorrente;
	}

	set salaCorrente(sala){
		validate(sala,Sala);
		this.#salaCorrente = sala;
	}

	indicaFimDeJogo(resultado){ // Modificado para opção de Vitória ou Derrota. True significa Vitória. Retornar False significa Derrota
		this.#fim = true;
		this.#vitoria = resultado;
	}

	// Para criar um jogo deriva-se uma classe a partir de
	// Engine e se sobrescreve o método "criaCenario"
	criaCenario(){}

	// Para poder acionar o método "joga" deve-se garantir que 
	// o método "criaCenario" foi acionado antes
	joga() {
		let novaSala = null;
		let acao = "";
		let tokens = null;
		while (!this.#fim) {
			console.log("--------------------------------------------------");
			console.log(this.salaCorrente.textoDescricao());
			console.log("==============================================================================================================================================================\n");
			acao = prompt("O que voce deseja fazer ? ");
			tokens = acao.split(" ");
			switch (tokens[0]) {
			case "fim":
				this.#fim = true;
				this.#vitoria = false;
				break;
			case "pega":
				if (this.salaCorrente.pega(tokens[1])) {
					if (this.mochila.espacoLivreNaMochila > 0) {
						console.log("Ok! " + tokens[1] + " guardado!");
					} else {
						console.log("Não espaço na Mochila. Remova um item para Adicionar outro.")
					}
				} else {
					console.log("Objeto " + tokens[1] + " não encontrado.");
				}
				break;
			case "remova":
				if (this.mochila.tem(tokens[1])) {
					let ferramentaRemovida = this.mochila.remove(tokens[1]);
					this.salaCorrente.ferramentas.set(ferramentaRemovida.nome, ferramentaRemovida);
					console.log("Ok! " + tokens[1] + " removido!");
				} else {
					console.log("Você não tem uma ferramenta chamada " + tokens[1] + " em sua Mochila")
				}
				break;
			case "inventario":
				console.log("Ferramentas disponiveis para serem usadas: " + this.#mochila.inventario());
				console.log("Espaço livre na Mochila: " + this.#mochila.espacoLivreNaMochila);
				break;
			case "usa":
					if (this.salaCorrente.usa(tokens[1],tokens[2])) {
						console.log("Feito !!");
						if (this.#fim == true){
							// Mudando um pouco a lógica para que haja também o caso de uma Derrota
							if (this.#vitoria) {
								console.log("-------------------------");
								console.log("Parabéns!!! Você Venceu 🏆")
								console.log("-------------------------");
							} else {
								console.log("-------------------------");
								console.log("Fim de Jogo... Você Perdeu 💀")
							}
						}
					} else {
						console.log("-------------------------");
						console.log("Não é possível usar " + tokens[1] + "sobre" + tokens[2] + " nesta sala");
						console.log("-------------------------");
					}
				break;
			case "ataca":
					if (this.salaCorrente.ataca(tokens[1],tokens[2])) {
						if (this.#fim == true){
							if (this.#vitoria) {
								console.log("-------------------------");
								console.log("Parabéns!!! Você Venceu 🏆")
								console.log("-------------------------");
							} else {
								console.log("-------------------------");
								console.log("Fim de Jogo... Você Perdeu 💀")
							}
						}
					} else {
						console.log("-------------------------");
						console.log("Não é possível atacar com " + tokens[1] + "contra" + tokens[2] + " nesta sala");
						console.log("-------------------------");
					}
				break;
			case "sai":
				novaSala = this.salaCorrente.sai(tokens[1]);
				if (novaSala == null) {
					console.log("-------------------------");
					console.log("Sala desconhecida ...");
					console.log("-------------------------");
				} else {
					this.#salaCorrente = novaSala;
				}
				break;
			default:
				console.log("Comando desconhecido: " + tokens[0]);
				break;
			}
		}
		console.log("-------------------------");
		console.log("JOGO ENCERRADO!");
		console.log("-------------------------");
	}
}