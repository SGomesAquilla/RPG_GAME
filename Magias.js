import {Ferramenta} from "./Basicas.js";
import {validate} from "bycontract"

class Magia extends Ferramenta {
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

export class LancaDeFogo extends Magia {
    constructor() {
        super("Magia_Lanca_de_Fogo", "Fogo", 3);
    }
}

export class RaioDivino extends Magia {
    constructor() {
        super("Magia_Raio_Divino", "Radiante", 1);
    }
}

export class RaioDeGelo extends Magia {
    constructor() {
        super("Maia_Raio_de_Gelo", "Congelante", 3);
    }
}

export class MisseisMagicos extends Magia {
    constructor() {
        super("Magia_Misseis_Magicos", "Energia", 2);
    }
}

export class Luz extends Magia {
	constructor() {
		super("Magia_de_Luz", "Nao Letal", 5);
	}
}