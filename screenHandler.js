////////////////////////////////////////////////////////////////////////////////
//   Esse script cria uma classe ScreenHandler, filha de dataHandler, 
//   e sobrecarrega o método updateScreen(). Um objeto é criado ao carregar a
//   página, e é disponibilizado ao HTML.
//   Para utilização desse código: 
//    1) importe esse script na página HTML
//    2) defina aqui no script a strin TAGS
//    3) escreva a função updateScreen()
////////////////////////////////////////////////////////////////////////////////





// Importa a classe DataHandler do arquivo dataHandler.js
import { dataHandler } from './dataHandler.js'; 



//////////////////////////////////////////////////////////
//     Definição das TAGS do Dashboard:                 //
//////////////////////////////////////////////////////////


const TAGS = ['Temperatura','Pressão']


//////////////////////////////////////////////////////////





class ScreenHandler extends dataHandler {
  constructor(tags = []) {
    super(tags); // Chama o construtor da classe pai (DataHandler)
    console.log(`TAGs cadastradas: '${TAGS}' `);
    console.log("ScreenHandler: Instância criada e pronta para gerenciar atualizações de tela.");
  }

  
  updateScreen() {
    let output = '';
    console.log("ScreenHandler: Atualizando a tela com os novos dados...");
    this._tags.forEach(tag => {
      const dado = this.getDadoByTag(tag); // Usa o novo método da classe pai
      if (dado) {
        output += `>>>>TAG: ${dado.Tag} -> Valor: ${dado.Data === null ? 'N/A' : dado.Data} \n` ;
      } else {
        output += `TAG: ${tag} -> Dado não encontrado. \n`;
      }
      outputParagraph.textContent = output;
    });
  }
}

// Garante que o objeto seja instanciado quando a página for carregada.
// Para isso, você pode adicionar este script no final do seu <body>
// ou usar um evento 'DOMContentLoaded'.
export let myScreenHandler;

document.addEventListener('DOMContentLoaded', () => {
  // Você pode passar TAGs iniciais se desejar, ou uma lista vazia
  const initialTags = TAGS; 
  myScreenHandler = new ScreenHandler(initialTags);
  console.log("ScreenHandler instanciado ao carregar a página.");

   // EXPOR AO ESCOPO GLOBAL AQUI
  window.myScreenHandler = myScreenHandler; //
});

