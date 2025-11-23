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

	constructor(){
		this.#ferramentas = [];
	}

	guarda(ferramenta){
		validate(ferramenta,Ferramenta);
		this.#ferramentas.push(ferramenta);
	}

	pega(nomeFerramenta){
		validate(arguments,["String"]);
		let ferramenta = this.#ferramentas.find(f => f.nome === nomeFerramenta);
		return ferramenta;
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
    	return arrObjs.map(obj=>obj.nome+":"+obj.descricao);
	}

	ferramentasDisponiveis(){
		let arrFer = [...this.#ferramentas.values()];
    	return arrFer.map(f=>f.nome);		
	}

	npcsDisponiveis() {
		let arrNpc = [...this.#npc.values()];
		return arrNpc.map(n => n.nome);
	}
	
	portasDisponiveis(){
		let arrPortas = [...this.#portas.values()];
    	return arrPortas.map(sala=>sala.nome);
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
		let descricao = "Você está no "+this.nome+"\n";
        if (this.objetos.size == 0){
            descricao += "Não há objetos na sala\n";
        }else{
            descricao += "Objetos: "+this.objetosDisponiveis()+"\n";
        }
        if (this.ferramentas.size == 0){
            descricao += "Não há ferramentas na sala\n";
        }else{
            descricao += "Ferramentas: "+this.ferramentasDisponiveis()+"\n";
        }
		if (this.npc.size == 0)
			descricao += "Não há ninguém aqui\n";
		else
			descricao += "Você vê: " + this.npcsDisponiveis() + "\n";

        descricao += "Portas: "+this.portasDisponiveis()+"\n";
		return descricao;
	}

	usa(ferramenta,objeto){
		return false;
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
		this.#mochila = new Mochila();
		this.#salaCorrente = null;
		this.#fim = false;
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
			console.log("-------------------------");
			console.log(this.salaCorrente.textoDescricao());
			acao = prompt("O que voce deseja fazer? ");
			tokens = acao.split(" ");
			switch (tokens[0]) {
			case "fim":
				this.#fim = true;
				this.#vitoria = false;
				break;
			case "pega":
				if (this.salaCorrente.pega(tokens[1])) {
					console.log("Ok! " + tokens[1] + " guardado!");
				} else {
					console.log("Objeto " + tokens[1] + " não encontrado.");
				}
				break;
			case "inventario":
				console.log("Ferramentas disponiveis para serem usadas: " + this.#mochila.inventario());
				break;
			case "usa":
					if (this.salaCorrente.usa(tokens[1],tokens[2])) {
						console.log("Feito !!");
						if (this.#fim == true){
							// Mudando um pouco a lógica para que haja também o caso de uma Derrota
							if (this.#vitoria) {
								console.log("Parabéns!!! Você Venceu 🏆")
							} else {
								console.log("Fim de Jogo... Você Perdeu 💀")
							}
						}
					} else {
						console.log("Não é possível usar " + tokens[1] + "sobre" + tokens[2] + " nesta sala");
					}
				break;
			case "sai":
				novaSala = this.salaCorrente.sai(tokens[1]);
				if (novaSala == null) {
					console.log("Sala desconhecida ...");
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