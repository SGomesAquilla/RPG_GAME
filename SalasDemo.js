import { validate } from "bycontract";
import { Sala, Engine, Ferramenta, Objeto } from "./Basicas.js";
import { Martelo, Chave } from "./FerramentasDemo.js";
import { Armario, Bilhete, PoteDeAcucar, PoteDeArroz } from "./ObjetosDemo.js";

export class PoraoUmido extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Hall_de_Entrada",engine);
        let martelo = new Martelo();
		this.ferramentas.set(martelo.nome,martelo);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		return false;
	}
}
// ---------------------------------------------
export class CelaInicial extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Sala_de_Estar",engine);
        let armario = new Armario();
		this.objetos.set(armario.nome,armario);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
        let armario = this.objetos.get(objeto);
		return armario.usar(this.engine.mochila.pega(ferramenta));
	}
}
// ---------------------------------------------
export class SalaoCentral extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Quarto",engine);
        let chave = new Chave();
		this.ferramentas.set(chave.nome,chave);
        let bilhete = new Bilhete();
        this.objetos.set(bilhete.nome,bilhete);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		return false;
	}
}
// ---------------------------------------------
export class Biblioteca extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Cozinha",engine);
        let poteAcucar = new PoteDeAcucar();
		this.objetos.set(poteAcucar.nome,poteAcucar);
        let poteArroz = new PoteDeArroz;
		this.objetos.set(poteArroz.nome,poteArroz);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
        let pote = this.objetos.get(objeto);
		let usou = pote.usar(this.engine.mochila.pega(ferramenta));
		if (pote instanceof PoteDeAcucar && usou == true){
			this.engine.indicaFimDeJogo();
		}
		return usou;
	}
}

export class Arsenal extends Sala {

}

export class CamaraSecreta extends Sala {

}

export class SalaBossFinal extends Sala {

}

export class salaSaida extends Sala {

}
// ---------------------------------------------
