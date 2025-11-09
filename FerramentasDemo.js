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

export class Espada extends Ferramenta {
	constructor() {
		super("espada")
	}
}

export class Grimorio extends Mochila {
	constructor() {
		super();
	}

	guarda(magia) {
		validate(magia, Magia);
		super.guarda(magia);
	}
}
// ---------------------------------------------

