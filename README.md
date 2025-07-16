# SOMA_Dashboards

O projeto contém um código simples em Javascript que disponibiliza um objeto myScreenHandler em uma janela do browser. 
Esse objeto possui como atributo um vetor de TAGs, e é capaz de receber e armazenar em memória dados no formato:

'''
{Tag: string, Type: string, Data: any, Alarm: number, DateTime: Date|string}
'''   

No arquivo segundo o template/exemplo screenHandler.js, o usuário deve adicionar a lista de TAGs e 
codificar a função updateScreen(), a qual se responsabilizará por exibir os dados na página HTML.

A página HTML deve chamar como scripts os arquivos:
dataHandler.js - o qual não deve ser alterado;
screenHandler.js - ou outro arquivo seguindo o mesmo template.
Mais eventuais scripts de componentes gráficos, etc.

Esse código deverá futuramente ser embarcado em um webcomponent do SOMA, que chamará o método updateDado() para atualizar os dados no objeto myScreenHandler.

