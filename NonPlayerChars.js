import {Objeto} from "./Basicas.js"
import {validate} from "bycontract"

class NPC extends Objeto {
    #descricaoAtaqueFalha;
    #descricaoAtaqueSucesso;
    #fraqueza;
    #hostil;
    #vivo;

    constructor(nome, descricao, descricaoAtaqueFalha, descricaoAtaqueSucesso, fraqueza, hostil) {
        validate(arguments,["String", "String", "String", "String", "Optional", "Boolean"]);
        super(nome, descricao, "");
        this.#descricaoAtaqueFalha = descricaoAtaqueFalha;
        this.#descricaoAtaqueSucesso = descricaoAtaqueSucesso;
        this.#fraqueza = fraqueza;   // pode ser Ferramenta ou null
        this.#hostil = hostil;
        this.#vivo = true;
    }

    get vivo() {
        return this.#vivo;
    }

    get descricao() {
        return this.#vivo ? this.descricaoAntesAcao : `${this.nome} está morto.`;
    }

    usa(ferramenta, engine) {
        validate(arguments, [Ferramenta, Engine]);

        if (!this.#vivo) {
            console.log(`O que está fazendo ?... ${this.nome} já está morto...`);
            return false;
        }

        // Se o NPC não tem fraqueza definida, morre pra qualquer ferramenta
        if (this.#fraqueza == null || ferramenta.nome === this.#fraqueza.nome) {
            this.#vivo = false;
            console.log(this.#descricaoAtaqueSucesso);
            return true;
        }

        if (this.#hostil && this.#vivo) {
            console.log(`${this.nome} contra-ataca!`);
            engine.indicaFimDeJogo();
        }

    }	

}