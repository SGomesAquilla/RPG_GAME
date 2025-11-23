import {Objeto} from "./Basicas.js"
import {validate} from "bycontract"

class NPC extends Objeto {
    #descricaoAtaqueFalha;
    #descricaoAtaqueSucesso;
    #fraqueza;
    #hostil;
    #vivo;

    constructor(nome, descricao, descricaoAtaqueFalha, descricaoAtaqueSucesso, fraqueza, hostil) {
        validate(arguments,["String", "String", "String", "String", "String", "Boolean"]);
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

    get descricaoAtaqueFalha() {
        return this.#descricaoAtaqueFalha;
    }

    get descricaoAtaqueSucesso() {
        return this.#descricaoAtaqueSucesso;
    }

    ataca(ferramenta, engine) {
        validate(arguments, [ferramenta, engine]);

        if (!this.#vivo) {
            console.log(`O que está fazendo ?... ${this.nome} já está morto...`);
            return true;
        }

        if (this.#hostil && this.#vivo) {
            // Se o NPC não tem fraqueza definida, morre pra qualquer ferramenta
            if (this.#fraqueza == "qualquer" || ferramenta.nome === this.#fraqueza) {
                this.#vivo = false;
                console.log(this.#descricaoAtaqueSucesso);
                return true;
            } else {
                console.log(this.#descricaoAtaqueFalha)
                engine.indicaFimDeJogo(false);
                return true
            }
        }
        
        return false
    }	

}

export class RatoGigante extends NPC {
    constructor() {
        super(
            "Rato_Gigante",                                          
            "Um rato enorme com olhos vermelhos e dentes sujos.",    
            "O ataque não surte efeito no couro grosso do rato!\n Ele pula em você te perfura com seus gigantescos dentes e você morre",         
            "Você perfura o rato gigante. Ele guincha e morre.", 
            "espada",                                         
            true                                                     
        );
    }
}

export class Goblin extends NPC {
    constructor() {
        super(
            "Goblin",
            "Uma pequena criatura verde com um sorriso malicioso.",
            "O goblin esquiva do seu ataque e ri da sua cara!",
            "Você acerta o goblin. Ele cai no chão, derrotado.",
            "qualquer",
            true
        );
    }
}

export class Insectoide extends NPC {
    constructor() {
        validate(arguments, []);
        super(
            "Insectoide",
            "Um inseto gigante com carapaça dura e mandíbulas afiadas.",
            "Sua magia reflete na carapaça do inseto sem causar dano!",
            "Você consegue perfurar a carapaça com sua espada.",
            "Magia_Lanca_de_Fogo",
            true
        );
    }
}

export class Espirito extends NPC {
    constructor() {
        validate(arguments, []);
        super(
            "Espirito",
            "Uma alma perdida vagando sem rumo, levemente translúcida.",
            "Sua arma passa direto pelo corpo do espírito!",
            "A magia atinge o espírito e ele desaparece.",
            "Magia_Raio_Divino",
            true
        );
    }
}