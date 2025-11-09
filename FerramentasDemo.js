import {Ferramenta, Mochila, Magia} from "./Basicas.js";
import {validate} from "bycontract"

// ---------------------------------------------
export class Chave extends Ferramenta {
	constructor() {
		super("chave");
	}
}
// ---------------------------------------------
export class Martelo extends Ferramenta {
	constructor() {
		super("martelo");
	}
}
// ---------------------------------------------
export class Espada extends Ferramenta {
	constructor() {
		super("espada")
	}
}
// ---------------------------------------------
export class Magia extends Ferramenta {
	#elemento;
	#usos;
	#usosRestantes;

	constructor(nome, elemento, usos){
		super(nome);

		validate(arguments, ["String", "String", "Number"]);

		this.#elemento = elemento;
		this.#usos = usos;
		this.#usosRestantes;
	}

	get elemento() {
		return this.#elemento;
	}

	get usos() {
		return this.#usos;
	}

	get usosRestantes() {
		return this.usosRestantes;
	}

	usar() {
		if (this.#usosRestantes <=0) {
			console.log(`Você não tem mais mana para conjurar ${this.nome}`);
			return false;
		}

		this.#usosRestantes--;
		console.log(`Você conjura ${this.nome}`);
		console.log(`${this.#usosRestantes} usos restantes`);

		return true;
	}
}