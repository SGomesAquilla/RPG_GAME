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
    * Clone este repositório ou baixe os arquivos para uma pasta local (ex: `RPG_PUCRS`).

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
| **Interagir/Usar** | `usa [ferramenta] [alvo]` | `usa chave bau`<br>`usa espada rato` |

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
    class Engine {
        +Mochila mochila
        +Sala salaCorrente
        +joga()
    }
    class Sala {
        +Map objetos
        +Map ferramentas
        +Map portas
        +usa(ferramenta, objeto)
    }
    class Ferramenta {
        +usar()
    }
    class Objeto {
        +usar(Ferramenta)
    }
    class NPC {
        +vida
        +hostil
        +fraqueza
    }
    
    Engine --> Sala : Gerencia
    Sala o-- Objeto : Contém
    Sala o-- Ferramenta : Contém
    Sala o-- NPC : Contém
    Objeto <|-- NPC
    Ferramenta <|-- Magia