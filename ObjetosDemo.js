import { validate } from "bycontract";
import { Objeto, Ferramenta } from "./Basicas.js";
import { Chave, Martelo } from "./FerramentasDemo.js";

export class Armario extends Objeto {
	constructor() {
		super("armario","O armário está fechado",
			  "O armário está aberto. Não tem nada dentro");
	}

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		return false;
	}

}
// ---------------------------------------------
export class Carta extends Objeto {
    constructor() {
		super("carta","Há uma carta, nela está escrito \"A vida é doce!\"","");
	}

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		return false;
	}
}

// ---------------------------------------------
export class PoteDeAcucar extends Objeto {
	constructor() {
		super("pote_de_acucar","O pote de açúcar esta fechado",
			  "O pote de açúcar esta quebrado. Tinha um diamante dentro!");
	}

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		console.log(ferramenta.nome);
		if (ferramenta instanceof Martelo) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}
}
// ---------------------------------------------
export class PoteDeArroz extends Objeto {
	constructor() {
		super("pote_de_arroz","O pote de arroz esta fechado",
			  "O pote de arroz esta quebrado. Tem arroz espalhado por todo lado");
	}

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		if (ferramenta instanceof Martelo) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}
}
// ---------------------------------------------
export class Bau extends Objeto {
    #conteudo;   // Map interna de itens
    #aberto;     // se o bau está aberto ou não

    constructor(itens = []) {
        super(
            "bau",
            "Há um baú trancado aqui.",
            "O baú está aberto, revelando seu conteúdo!"
        );

        validate(itens, ["Array"]);
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
        validate(arguments, [Ferramenta, "Optional"]);

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

    // Opcional: pegar itens diretamente do bau (apenas se aberto)
    pega(nomeFerramenta, engine) {
        validate(nomeFerramenta, "String");

        if (!this.#aberto) {
            console.log("O baú está trancado!");
            return false;
        }

        const ferramenta = this.#conteudo.get(nomeFerramenta);
        if (!ferramenta) return false;

        if (engine) engine.mochila.guarda(ferramenta);
        this.#conteudo.delete(nomeFerramenta);

        return true;
    }

    ferramentasDisponiveis() {
        if (!this.#aberto) return [];
        return [...this.#conteudo.values()].map(f => f.nome);
    }
}