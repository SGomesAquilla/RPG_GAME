# 🏰 RPG PUCRS - Adventure Game

Um jogo de aventura em texto desenvolvido em JavaScript (Node.js), onde o jogador deve explorar masmorras, coletar itens e resolver enigmas para escapar.

## 📖 Sobre o Jogo

O objetivo principal é navegar através de diversas salas, utilizando os itens dispostos no cenário para sobreviver a inimigos e resolver enigmas, culminando na descoberta da saída.

O jogador precisará de astúcia para combinar as ferramentas certas com os objetos e NPCs encontrados pelo caminho.

---

## 🛠️ Pré-requisitos e Instalação

Este jogo roda utilizando **Node.js**.

1.  **Instale o Node.js**:
    * Acesse [nodejs.org](https://nodejs.org/) e baixe a versão **LTS**.
    * Siga as instruções padrão de instalação para seu sistema operacional.
    * Para verificar a instalação, abra seu terminal e digite: `node -v`

2.  **Baixe o Jogo**:
    * Clone este repositório utilizando Git.
    ```bash
    git clone [URL_DO_REPOSITORIO]
    ```
    Ou

    * Procure e clique no botão verde que diz **"<> Code"**. Depois clique em **"Download ZIP"**. Após isso basta descompactar/extrair o conteúdo baixado.

---

## 🚀 Como Executar

1.  Abra o seu **Terminal** (Prompt de Comando ou PowerShell no Windows).
2.  Navegue até a pasta do projeto:
    ```bash
    cd caminho/para/RPG_PUCRS
    ```
3.  Inicie a Engine do jogo:
    ```bash
    node index.js
    ```

---

## 🎮 Comandos do Jogador

Você interage com o mundo digitando comandos textuais. A Engine interpreta suas ações e retorna o resultado.

| Ação | Comando | Exemplo |
| :--- | :--- | :--- |
| **Movimentação** | `sai [destino]` | `sai corredor` |
| **Coletar Itens** | `pega [item]` | `pega espada` |
| **Soltar/Remover Itens** | `remove [item]` | `remove chave` |
| **Interagir/Usar** | `usa [ferramenta] [alvo]` | `usa chave bau`<br>`usa magia candelabro` |
| **Atacar** | `ataca [ferramenta] [alvo]` | `ataca espada rato`<br>`ataca magia monstro` |


---

## 🗺️ Estrutura do Mundo

| Sala | Objetos (Cenário) | Ferramentas (Coletáveis) | Inimigos (NPCs) |
| :--- | :--- | :--- | :--- |
| **Cela** (Início) | Cama, Esqueleto | Espada | - |
| **Salão Central** | Candelabro | Chave, Magia de Luz | - |
| **Biblioteca** | Estante, Escrivaninha | Lança de Fogo, Pena | Goblin |
| **Quarto** | Armário, Cama, Estátua | - | Insectoide |
| **Sala Secreta** | Baú | Raio Divino, Raio de Gelo| - |
| **Corredor** | - | - | Espírito |
| **Saída** | Portão | - | - |

---

## 🧩 Diagrama de Classes

Abaixo está a estrutura técnica atual do projeto, mostrando a relação entre a Engine, Salas, Objetos Interativos e NPCs.

```mermaid
classDiagram
    %% --- CLASSES BASE ---
    class Engine {
        +Mochila mochila
        +Sala salaCorrente
        +Boolean fim
        +indicaFimDeJogo() void
        +criaCenario() void
        +joga() void
    }

    class Sala {
        +String nome
        +Map objetos
        +Map ferramentas
        +Map portas
        +Map npc
        +Engine engine
        +pega(String) void
        +sai(String) void
        +usa(String, String) Boolean
    }

    class Ferramenta {
        +String nome
        +usar() Boolean
    }

    class Objeto {
        +String nome
        +String descricaoAntes
        +String descricaoDepois
        +Boolean acaoOK
        +descricao() String
        +usar(Ferramenta) Boolean
    }

    %% --- HIERARQUIA DE NPC (Herda de Objeto) ---
    class NPC {
        -String descricaoAtaqueFalha
        -String descricaoAtaqueSucesso
        -String fraqueza
        -Boolean hostil
        -Boolean vivo
        +getVivo() Boolean
        +getDescricao() String
        +usa(Ferramenta, Engine) Boolean
    }
    Objeto <|-- NPC
    NPC <|-- RatoGigante
    NPC <|-- Goblin
    NPC <|-- Insectoide
    NPC <|-- Espirito

    class RatoGigante { +fraqueza: "espada" }
    class Goblin { +fraqueza: "qualquer" }
    class Insectoide { +fraqueza: "Magia_Lanca_de_Fogo" }
    class Espirito { +fraqueza: "Magia_Raio_Divino" }

    %% --- RELAÇÕES PRINCIPAIS ---
    Engine --> Sala : salaCorrente
    Sala --> Engine : engine
    Sala o-- Ferramenta : contem
    Sala o-- Objeto : contem
    Sala o-- NPC : contem
    Sala --> Sala : vizinha (portas)

    %% --- HIERARQUIA DE FERRAMENTAS ---
    class Magia {
        -String elemento
        -int usosRestantes
        +usar() Boolean
    }
    Ferramenta <|-- Magia
    Magia <|-- LancaDeFogo
    Magia <|-- RaioDivino
    Magia <|-- RaioDeGelo
    Magia <|-- MisseisMagicos
    Magia <|-- Luz

    Ferramenta <|-- Chave
    Ferramenta <|-- Martelo
    Ferramenta <|-- Espada
    Ferramenta <|-- Escudo
    Ferramenta <|-- Balde
    Ferramenta <|-- Corda
    Ferramenta <|-- Cantil
    Ferramenta <|-- PenaTinteiro

    %% --- HIERARQUIA DE OBJETOS ---
    Objeto <|-- Armario
    Objeto <|-- Carta
    Objeto <|-- Bau
    Objeto <|-- CamaDePalha
    Objeto <|-- EsqueletoAntigo
    Objeto <|-- Candelabro
    Objeto <|-- Escrivaninha
    Objeto <|-- EstanteDeLivros
    Objeto <|-- Cama
    Objeto <|-- Estatua
    Objeto <|-- BarrilQuebrado
    Objeto <|-- Portao

    class Bau {
        -Map conteudo
        -Boolean aberto
        +usar(Chave, Engine)
    }

    %% --- HIERARQUIA DE SALAS ---
    Sala <|-- PoraoUmido
    Sala <|-- Cela
    Sala <|-- SalaoCentral
    Sala <|-- Biblioteca
    Sala <|-- Quarto
    Sala <|-- SalaSecreta
    Sala <|-- Corredor
    Sala <|-- SalaSaida
