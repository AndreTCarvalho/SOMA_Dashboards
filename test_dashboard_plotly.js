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
  
    this.plotly_data = [
        {
            type: "indicator",
            value: null,
            delta: { reference: 0 },
            gauge: { 
            axis: { 
                visible: false, 
                range: [0, 100] 
            },
            bar: { color: "orange" } 
            },
            domain: { row: 0, column: 0 }
        },
        {
            type: "indicator",
            value: null,
            delta: { reference: 0 },
            gauge: {
            // shape: "bullet",
            axis: {
                visible: false,
                range: [0, 100]
            },
            bar: { color: "darkblue" } // Cor para o primeiro gauge
            },
            domain: { row: 0, column: 1 }
        }
        
        ];

    this.plotly_layout = {
    width: 600,
    height: 400,
    margin: { t: 25, b: 25, l: 25, r: 25 },
    grid: { rows: 1, columns: 2, pattern: "independent" },
    template: {
        data: {
        indicator: [
            {
            title: { text: "Temperatura [°C]" },
            mode: "number+gauge",
            },
            {
            title: { text: "Pressão [bar]" },
            mode: "number+gauge",
            }
        ]
        }
    }
    };
    Plotly.newPlot('dashboard', this.plotly_data, this.plotly_layout);
  }

  
  updateScreen() {
    
    console.log("ScreenHandler: Atualizando a tela com os novos dados...");
    this._tags.forEach(tag => {
      const dado = this.getDadoByTag(tag); // Usa o novo método da classe pai
      switch (dado.Tag) {
      
      case 'Temperatura': {
        this.plotly_data[0].value = dado.Data;
        if (dado.Data >= 80){
            this.plotly_data[0].gauge.bar.color = 'red';
        }
        else {
             this.plotly_data[0].gauge.bar.color = 'orange';
        }
        break;
      } 
      case 'Pressão': {
        this.plotly_data[1].value = dado.Data;
        break;
      } 
      
      default:
        console.log( `TAG: ${tag} -> Tag não encontrada. `);
 
      }
    
    //   outputParagraph.textContent = output;
     
    });
     Plotly.react('dashboard', this.plotly_data, this.plotly_layout);
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

