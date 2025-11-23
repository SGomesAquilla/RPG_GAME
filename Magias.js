import {Ferramenta} from "./Basicas.js";
import {validate} from "bycontract"

class Magia extends Ferramenta {
	#elemento;
	#usosRestantes;

	constructor(nome, elemento, limiteUsos){
		super(nome);

		validate(arguments, ["String", "String", "Number"]);

		this.#elemento = elemento;
		this.#usosRestantes = limiteUsos;
	}

	get elemento() {
		return this.#elemento;
	}


	get usosRestantes() {
		return this.#usosRestantes;
	}

	usar() { 
        if (this.#usosRestantes <= 0) {
            console.log(`Você não tem mais mana para conjurar ${this.nome}.`);
            return false;
        }
        return true;
    }
	
	consumirUso() {
        if (this.#usosRestantes > 0) {
            this.#usosRestantes--;
            console.log(`Mana consumida. ${this.#usosRestantes} usos restantes de ${this.nome}.`);
            
            // Retorna true se o uso chegou a zero (para a Engine saber que deve deletar)
            if (this.#usosRestantes <= 0) { 
                console.log(`\n*** A Magia ${this.nome} se esvaiu e será removida! ***\n`);
                return true; 
            }
        }
        return false; // Não quebrou/esvaiu
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