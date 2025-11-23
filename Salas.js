import { validate } from "bycontract";
import promptsync from 'prompt-sync';
const prompt = promptsync({sigint: true});
import { Sala, Engine, Ferramenta, Objeto } from "./Basicas.js";
import { Chave, Espada, PenaTinteiro} from "./Ferramentas.js";
import { Armario, CamaDePalha, BarrilQuebrado, Carta, Bau, EsqueletoAntigo, Cama, Estatua, Candelabro, Escrivaninha, EstanteDeLivros, Portao } from "./Objetos.js";
import { LancaDeFogo, RaioDeGelo, RaioDivino, Luz } from "./Magias.js";
import { RatoGigante, Goblin, Insectoide, Espirito } from "./NonPlayerChars.js";

export class PoraoUmido extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Porao",engine);

		//NPCs na Sala
		let ratoGigante = new RatoGigante();
		this.npc.set(ratoGigante.nome, ratoGigante);

		//Objetos na Sala
        let barrilQuebrado = new BarrilQuebrado();
		this.objetos.set(barrilQuebrado.nome, barrilQuebrado);
	}

	ataca(ferramentaNome, npcNome) { // Renomeei os parâmetros para evitar conflito de nome
        validate(arguments, ["String", "String"]);
        
        if (!this.engine.mochila.tem(ferramentaNome)) {
            return false;
        }
        if (!this.npc.has(npcNome)) {
            return false;
        }
        
        // Obtém a instância do NPC (que é um RatoGigante)
        let alvoNpc = this.npc.get(npcNome); 
        
        // Obtém a instância da Ferramenta (ex: Espada)
        let fer = this.engine.mochila.pega(ferramentaNome); 
        
        // 1. Chamada do método ataca() da classe NPC
        // O método ataca do NPC é responsável por toda a lógica:
        // - Se o NPC está vivo.
        // - Se a fraqueza foi atingida (matar o NPC).
        // - Se o NPC é hostil e contra-ataca (fim de jogo).
        return alvoNpc.ataca(fer, this.engine);
        
        // Nota: O bloco 'if (fer.nome === "espada" && npc instanceof RatoGigante)' 
        // original se torna desnecessário, pois a lógica de fraqueza já está centralizada 
        // no método NPC.ataca().
    }
}
// ---------------------------------------------
export class Cela extends Sala {
	constructor(engine) {
		validate(engine, Engine);
		super("Cela", engine);

		//Objetos na Sala
		let camaDePalha = new CamaDePalha();
		let esqueletoAntigo = new EsqueletoAntigo();
		this.objetos.set(camaDePalha.nome, camaDePalha);
		this.objetos.set(esqueletoAntigo.nome, esqueletoAntigo);

		//Ferramentas na Sala
		let espada = new Espada();
		this.ferramentas.set(espada.nome, espada);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		return false;
	}
}
// ---------------------------------------------
export class SalaoCentral extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Salao_Central",engine);

		//Objetos na Sala
		let candelabro = new Candelabro();
		this.objetos.set(candelabro.nome, candelabro);

		//Ferramentas na Sala
		let chave = new Chave();
		let luz = new Luz();
		this.ferramentas.set(chave.nome, chave);
		this.ferramentas.set(luz.nome, luz);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)) {
			return false;
		}
		if (!this.objetos.has(objeto)) {
			return false;
		}
		let obj = this.objetos.get(objeto);
		let fer = this.engine.mochila.pega(ferramenta);

		// Caso específico: usar Lança de Fogo no Candelabro
		if (fer.nome === "Magia_Lanca_de_Fogo" && obj instanceof Candelabro) {
			console.log("O candelabro cai em cima de ti, o matando!");
			this.engine.indicaFimDeJogo(false);
			return true;
		}
	}
}
// ---------------------------------------------
export class Biblioteca extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Biblioteca",engine);

		//NPCs na Sala
        let goblin = new Goblin();
		this.npc.set(goblin.nome, goblin);

		//Objetos na Sala
		let escrivaninha = new Escrivaninha();
		let carta = new Carta();
		let estanteDeLivros = new EstanteDeLivros();
		this.objetos.set(escrivaninha.nome, escrivaninha);
		this.objetos.set(carta.nome, carta);
		this.objetos.set(estanteDeLivros.nome, estanteDeLivros);

		//Ferramentas na Sala
		let lancaDeFogo = new LancaDeFogo();
		let penaTinteiro = new PenaTinteiro();
		this.ferramentas.set(penaTinteiro.nome, penaTinteiro);
		this.ferramentas.set(lancaDeFogo.nome, lancaDeFogo);

	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
        // Caso específico: usar Lança de Fogo no Candelabro
		if (fer.nome === "Magia_Lanca_de_Fogo" && obj instanceof EstanteDeLivros) {
			console.log("A estante incendiou... quanto conhecimento jogado fora...");
			return true;
		}
		return true;
	}
}

export class Quarto extends Sala {
	constructor(engine) {
		validate(engine,Engine);
		super("Quarto", engine);

		//NPCs na Sala
		let insectoide = new Insectoide();
		this.npc.set(insectoide.nome, insectoide);

		//Objetos na Sala
		let armario = new Armario();
		let cama = new Cama();
		let estatua = new Estatua();
		this.objetos.set(armario.nome, armario);
		this.objetos.set(cama.nome, cama);
		this.objetos.set(estatua.nome, estatua);

		// Flag para evitar abrir a passagem mais de uma vez
		this.passagemAberta = false;
	}

	usa(ferramenta, objeto) {
		validate(arguments, ["String", "String"]);

		// Verifica se o jogador tem a ferramenta
		if (!this.engine.mochila.tem(ferramenta)) return false;

		let fer = this.engine.mochila.pega(ferramenta);

		// Interação especial: usar Luz na Estátua abre passagem secreta
		if (!this.passagemAberta && fer.nome === "Luz" && this.objetos.has(objeto)) {
			let obj = this.objetos.get(objeto);

			if (obj instanceof Estatua) {
				console.log("A luz reflete na estátua, revelando uma passagem secreta!");
				
				// Cria ou referencia a sala secreta
				let salaSecreta = new SalaSecreta(this.engine);

				// Adiciona como porta da sala atual
				this.portas.set("passagem_secreta", salaSecreta);

				this.passagemAberta = true;
				return true;
			}
		}
	}
}

export class SalaSecreta extends Sala {
	constructor(engine) {
		validate(engine, Engine)
		super("Sala_Secreta", engine);

		// Objetos na Sala
		let bau = new Bau([new RaioDivino(), new RaioDeGelo()]);
		this.objetos.set(bau.nome, bau);
	}

	usa(ferramentaNome, objetoNome) {
        validate(arguments, ["String", "String"]);

        // Verifica se o jogador tem a ferramenta
        if (!this.engine.mochila.tem(ferramentaNome)) {
            return false;
        }

        // Verifica se o objeto existe na sala
        if (!this.objetos.has(objetoNome)) {
            return false;
        }

        // Pega o objeto real e a ferramenta
        const objeto = this.objetos.get(objetoNome);
        const ferramenta = this.engine.mochila.pega(ferramentaNome);

        // Delegamos para o método usar do bau
        return objeto.usar(ferramenta, this.engine);
    }
}

export class Corredor extends Sala {
	constructor(engine) {
		validate(engine,Engine);
		super("Corredor", engine)

		// NPCs na Sala
		let espirito = new Espirito();
		this.npc.set(espirito.nome, espirito);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		return false;
	}
}

export class SalaSaida extends Sala {
	constructor(engine) {
		validate(engine,Engine);
		super("Saida", engine)

		// Objetos na Sala
		let portao = new Portao();
		this.objetos.set(portao.nome, portao);
	}

	usa(ferramentaNome, objetoNome) {
        validate(arguments, ["String", "String"]);

        // Verifica se o jogador tem a ferramenta
        if (!this.engine.mochila.tem(ferramentaNome)) {
            console.log("Você não tem essa ferramenta para usar.");
            return false;
        }

        // Verifica se o objeto existe na sala
        if (!this.objetos.has(objetoNome)) {
            console.log("Não há esse objeto aqui.");
            return false;
        }

        const ferramenta = this.engine.mochila.pega(ferramentaNome);
        const objeto = this.objetos.get(objetoNome);

        // Interação especial com o Portao usando PenaTinteiro
        if (objeto instanceof Portao && ferramenta instanceof PenaTinteiro) {
            console.log("Você toca o portão com a Pena Tinteiro. Precisa escrever a palavra mágica!");
            const resposta = prompt("Digite a palavra mágica: ").trim().toLowerCase();

            if (resposta === "vento") {
                console.log("O portão se abre lentamente e você consegue sair. Parabéns, você venceu!");
                this.engine.indicaFimDeJogo();
                return true;
            } else {
                console.log("Palavra incorreta! A sala começa a desmoronar...");
                this.engine.indicaFimDeJogo();
                return false;
            }
        }

        console.log("Nada acontece.");
        return false;
    }
}
// ---------------------------------------------
