# SOMA_Dashboards

O projeto contém um código simples em Javascript que disponibiliza um objeto **myScreenHandler** em uma janela do browser. 
Esse objeto possui como atributo um array de **DATASOURCES** com o nome das fontes de dado do SOMA, e é capaz de receber e armazenar em memória dados correspondentes a
cada uma dessas fontes de dado no formato:
~~~
{
      dataSourceName: string,
      type: string,
      data: any,
      unit: string,
      digitsOfPrecision: number,
      alarm: number,
      timestamp: number
}
~~~   

Esse objeto será atualizado com dados pelo Webcomponent. O próprio objeto deverá implementar a 
atualização da página sempre que o dado for atualizado, ou em caso de timeout.

## Utilização

1) Para atualizar o estado interface, o webcomponent do SOMA deverá chamar o método **updateData(newData)** 
do objeto **myScreenHandler**.

2) Na página HTML que implementará o Dashboard, importar o script **screenHandler.js**.
~~~html 
<script type="module" src="screenHandler.js"></script>
~~~
2) No script screenHandler.js, o qual utiliza a classe pai 
definida em **dataHandler.js**, definir a lista de **DATASOURCES** com 
o nome das fontes de dados requeridas, conforme registrado no SOMA.

~~~html
//////////////////////////////////////////////////////////
//     Dashboard TAG Definitions:                       //
//////////////////////////////////////////////////////////

const DATASOURCES = ['Temperature', 'Pressure'];
~~~

4) Também no no script screenHandler.js, na classe filha **ScreenHandler**,  para atualizar visualmente a própria interface, insira o seu código na função **updateScreen()**.

~~~html

  updateScreen() {
    console.log("ScreenHandler: Updating the screen with new data...");

         //////////////////////////////////////////////////////////
         //     This is an Example. Replace with your Code.      //
         //////////////////////////////////////////////////////////
    });
  }
    

~~~

## OBSERVAÇÃO

* v.1.0 - O usuário deve se responsabilizar por implementar timeout na interface, 
evitando que dados muito antigos continuem a ser exibidos incorretamente.
