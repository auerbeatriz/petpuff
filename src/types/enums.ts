export enum StatusOrcamento {
    NOVO = 'NOVO',
    EM_ANALISE = 'EM ANÁLISE',
    AGUARDANDO_APROVACAO = 'AGUARDANDO APROVAÇÃO',
    EXPIRADO = 'EXPIRADO',
    CANCELADO = 'CANCELADO',
    ACEITO = 'ACEITO'
}

export enum MetodoEntrega {
    PAC = 'CORREIOS - PAC',
    SEDEX = 'CORREIOS - SEDEX',
    TRANSPORTADORA = 'TRANSPORTADORA',
    ENTREGA_LOCAL = 'ENTREGA LOCAL',
    RETIRADA = 'RETIRADA EM LOJA'
}

export enum EtapaEntrega {
    EM_SEPARACAO = 'EM SEPARAÇÃO',
    ENVIADO_TRANSPORTADORA = 'ENVIADO PARA A TRANSPORTADORA',
    A_CAMINHO = 'ENTREGA A CAMINHO',
    ROTA_ENTREGA = 'EM ROTA DE ENTREGA',
    AGUARDANDO_RETIRADA = 'AGUARDANDO RETIRADA',
    ENTREGUE = 'ENTREGUE'
}

export enum Setor {
    VENDAS = 'VENDAS',
    ATENDIMENTO_CLIENTE = 'ATENDIMENTO AO CLIENTE'
}