export const Schema: { [key: string]: string[] } = {
    CRIAR_ORCAMENTO: ['fotos', 'nome', 'tamanho', 'tamanho', 'kitMaterialId', 'detalhes'],
    RESPONDER_ORCAMENTO: ['valor', 'prazoConfeccao'],
    ATUALIZAR_PELUCIA: ['tamanho', 'kitMaterial', 'detalhes'],
    GET_METODOS_ENTREGA: ['altura', 'peso', 'valor', 'cep'],
    FECHAR_PEDIDO: ['pelucia', 'cliente', 'entrega', 'pagamento'],
    ANDAMENTO_PEDIDO: ['status', 'id'],
    ATENDER_ORCAMENTO: ['idOrcamento', 'idFuncionario']
}