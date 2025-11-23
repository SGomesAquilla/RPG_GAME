import {Engine} from "./Basicas.js"
import { Cela, SalaSaida, Biblioteca, PoraoUmido, Quarto, Corredor, SalaSecreta, SalaoCentral } from "./Salas.js";

export class JogoDemo extends Engine{
    constructor(){
        super();
    }

    criaCenario(){
        // Define as salas que compõem o mapa
        let poraoUmido = new PoraoUmido(this);
        let cela = new Cela(this);
        let salaoCentral = new SalaoCentral(this);
        let biblioteca = new Biblioteca(this);
        let quarto = new Quarto(this);
        let corredor = new Corredor(this);
        let salaSaida = new SalaSaida(this);

        // Encadeia as salas através das portas
        poraoUmido.portas.set(cela.nome, cela);
        cela.portas.set(poraoUmido.nome,poraoUmido);
        cela.portas.set(salaoCentral.nome, salaoCentral);
        salaoCentral.portas.set(cela.nome, cela);
        salaoCentral.portas.set(biblioteca.nome, biblioteca);
        salaoCentral.portas.set(corredor.nome, corredor);
        salaoCentral.portas.set(quarto.nome, quarto);
        biblioteca.portas.set(salaoCentral.nome, salaoCentral);
        quarto.portas.set(salaoCentral.nome, salaoCentral);
        corredor.portas.set(salaoCentral.nome, salaoCentral);
        corredor.portas.set(salaSaida.nome, salaSaida);
        salaSaida.portas.set(corredor.nome, corredor);

        // Define a sala inicial
        this.salaCorrente = cela;
    }
}