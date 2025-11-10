import { validate } from "bycontract";
import { Objeto, Ferramenta, Engine } from "./Basicas.js";
import { Chave, Martelo } from "./Ferramentas.js";

export class Armario extends Objeto {
	constructor() {
		super("armario",
			"O armário está fechado",
			"O armário está aberto. Não tem nada dentro"
			);
	}

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		return false;
	}

}
// ---------------------------------------------
export class Carta extends Objeto {
    constructor() {
        super(
            "carta",
            "Há uma carta, nela está escrito: \"Querido amigo, espero que estas palavras encontrem um coração disposto a ouvir, mesmo que não me conheças. Às vezes, é mais fácil abrir a alma a quem não sabe nossos medos. Que a vida te sorria com sinceridade, e que nunca te falte coragem para ser quem és. A luz só incomoda quem tem algo a esconder..\"",
            ""
        );
    }

    usar(ferramenta) {
        validate(ferramenta, Ferramenta);
        return false;
    }
}

// ---------------------------------------------
export class Bau extends Objeto {
    #conteudo;
    #aberto; 

    constructor(itens = []) {
        super(
            "bau",
            "Há um baú trancado aqui.",
            "O baú está aberto, revelando seu conteúdo!"
        );

        validate(itens, "Array");
        itens.forEach(f => validate(f, Ferramenta));

        // Inicializa o conteúdo interno
        this.#conteudo = new Map();
        itens.forEach(f => this.#conteudo.set(f.nome, f));

        this.#aberto = false;
    }

    get aberto() {
        return this.#aberto;
    }

    usar(ferramenta, engine) {
        validate(arguments, [Ferramenta, Engine]);

        if (this.#aberto) {
            console.log("O baú já está aberto.");
            return false;
        }

        // Abrir com chave
        if (ferramenta instanceof Chave) {
            this.#aberto = true;
            this.acaoOk = true;
            console.log("Você destranca o baú e ele se abre com um estalo.");

            // Transfere os itens para a sala corrente para serem pegos
            if (engine) {
                this.#conteudo.forEach(f => {
                    engine.salaCorrente.ferramentas.set(f.nome, f);
                    console.log(`Dentro do baú, você encontra: ${f.nome}`);
                });
            }

            // Limpa o conteúdo interno do bau
            this.#conteudo.clear();

            return true;
        } else {
            console.log("Essa ferramenta não serve para abrir o baú.");
            return false;
        }
    }
}
// ----------------------------------------------------
// CAMA DE PALHA
export class CamaDePalha extends Objeto {
	constructor() {
		super(
			"cama_de_palha",
			"Uma cama de palha velha e fétida está encostada na parede.",
			"A cama de palha está revirada. Nada de útil foi encontrado."
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}

// ----------------------------------------------------
// ESQUELETO ANTIGO
export class EsqueletoAntigo extends Objeto {
	constructor() {
		super(
			"esqueleto_antigo",
			"Há um esqueleto antigo caído no canto da cela.",
			"O esqueleto está desfeito em pedaços. Um silêncio sepulcral permanece."
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}

// ----------------------------------------------------
// CANDELABRO
export class Candelabro extends Objeto {
	constructor() {
		super(
			"candelabro",
			"Um candelabro enferrujado está pendurado precariamente no teto.",
			"O candelabro caiu e se quebrou em pedaços pelo chão."
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}

// ----------------------------------------------------
// ESCRIVANINHA
export class Escrivaninha extends Objeto {
	constructor() {
		super(
			"escrivaninha",
			"Uma escrivaninha coberta de poeira e papéis rasgados.",
			"Você revirou a escrivaninha, mas não encontrou nada além de teias de aranha."
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}

// ----------------------------------------------------
// ESTANTE DE LIVROS
export class EstanteDeLivros extends Objeto {
	constructor() {
		super(
			"estante_de_livros",
			"Uma velha estante cheia de livros deteriorados e mofados.",
			"A estante está caída, e os livros estão espalhados pelo chão."
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}

// ----------------------------------------------------

export class Cama extends Objeto {
	constructor() {
		super(
			"cama",
			"Uma cama simples, com lençóis empoeirados e um travesseiro gasto.",
			"A cama está desarrumada. Você não encontra nada além de poeira e ácaros."
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}

// ----------------------------------------------------

export class Estatua extends Objeto {
	constructor() {
		super(
			"estatua",
			"Uma estátua de pedra representando um homem de expressão serena, mas seus olhos parecem estar sendo ofuscados por uma luz radiante e invisível.",
			"A estátua permanece imóvel, envolta por um brilho tênue e misterioso."
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}

export class BarrilQuebrado extends Objeto {
	constructor() {
		super(
			"barril_quebrado",
			"Um barril simples, velho e furado.",
			""
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}

// ----------------------------------------------------

export class Portao extends Objeto {
	constructor() {
		super(
			"portao",
			"Um portão enorme de pedra bloqueia a passagem. Há inscrições entalhadas em sua superfície: \"Eu não tenho voz, mas grito. Não tenho asas, mas voo. Não tenho dentes, mas mordo. O que sou eu?\" Logo abaixo, há um espaço liso, como se fosse feito para escrever algo.",
			"O portão de pedra está aberto, revelando a passagem adiante."
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		console.log("O portão é imponente e frio. Talvez haja uma maneira de interagir com o enigma gravado nele.");
		return false;
	}
}