
/////////////////////////////////////////////////////////////
//                Não Edite Esse Arquivo!!!                //
//                Edite o screenHandler.js                 //
/////////////////////////////////////////////////////////////


export class dataHandler {
  /**
   * Construtor da classe DataHandler.
   * @param {string[]} tags - Uma lista de strings representando as TAGs.
   */
  constructor(tags = []) {
    this._tags = tags;
    this._dados =tags.map(tag => ({
      Tag: tag,
      Type: null,
      Data: null,
      Alarm: null,
      DateTime: null,
}));
  }

  getTAGs() {
    return this._tags;
  }

  /**
   * Atualiza um objeto na lista de Dados.
   * Se a TAG do objeto fornecido não existir na lista, emite um warning.
   * O atributo 'Alarm' será garantido como um número inteiro.
   * O atributo 'DateTime' será garantido como um objeto Date válido.
   * O objeto a ser atualizado/adicionado, com a estrutura {Tag: string, Type: string, Data: any, Alarm: number, DateTime: Date|string}.
   * A função retorna True se a atualização foi bem-sucedida ou um novo dado foi adicionado, false caso contrário (por exemplo, se o novoDado for inválido).
   */
  updateDado(novoDado) {
    if (!novoDado || typeof novoDado.Tag === 'undefined') {
      console.error("Erro: Objeto de dado inválido. Usar a estrutura {Tag: string, Type: string, Data: any, Alarm: number, DateTime: Date|string}");
      return false;
    }

    // --- Tratamento do campo 'Alarm' ---
    if (typeof novoDado.Alarm !== 'undefined') {
      novoDado.Alarm = parseInt(novoDado.Alarm, 10);
      if (isNaN(novoDado.Alarm)) {
        console.warn(`Aviso: O valor de 'Alarm' para a TAG '${novoDado.Tag}' não é um número válido e foi definido como 0. Considere um valor numérico.`);
        novoDado.Alarm = 0;
      }
    }

    // --- Tratamento do campo 'DateTime' ---
    if (typeof novoDado.DateTime !== 'undefined') {
      // Se já for um objeto Date, usa-o. Se for string, tenta converter.
      if (!(novoDado.DateTime instanceof Date)) {
        const parsedDate = new Date(novoDado.DateTime);
        if (isNaN(parsedDate.getTime())) { // Verifica se a data é válida
          console.warn(`Aviso: O valor de 'DateTime' para a TAG '${novoDado.Tag}' não é um formato de data/hora válido e foi definido como 'Invalid Date'. Considere um formato válido.`);
          novoDado.DateTime = new Date('Invalid Date'); // Define um objeto Date inválido
        } else {
          novoDado.DateTime = parsedDate;
        }
      }
    }

    const index = this._dados.findIndex(dado => dado.Tag === novoDado.Tag);

    if (index !== -1) {
      // Atualiza o objeto existente
      this._dados[index] = { ...this._dados[index], ...novoDado };
      console.log(`Dado com a TAG '${novoDado.Tag}' atualizado.`);
      this.updateScreen(); // Chama a função de atualização da tela
      return true;
    } else {
      console.log(`Dados recebidos, A TAG '${novoDado.Tag}' não foi reconhecida.`);
      return false;
    }
   

  }

  
  /**
   * Função vazia (template) para ser sobrescrita.
   * Destina-se a conter a lógica para atualizar a interface do usuário ou a tela.
   * Este método é chamado automaticamente após uma atualização nos dados.
   */
  updateScreen() {
    console.log("updateScreen: A tela precisa ser atualizada com os novos dados.");
    // Esta função deve ser implementada com a lógica de atualização da interface do usuário.
    // Por exemplo:
    // renderDataToDOM(this._dados);
    // updateCharts(this._dados);
  }

  /**
   * Retorna a lista completa de Dados.
   * @returns {Array<Object>} A lista de Dados.
   */
  getDados() {
    return this._dados;
  }

  getDadoByTag(tag) {
    return this._dados.find(dado => dado.Tag === tag);
  }
}

