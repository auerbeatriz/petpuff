import { Atendimento } from "../entities/Atendimento";
import { KitMaterial } from "../entities/KitMaterial";
import { Orcamento } from "../entities/Orcamento";
import { Pelucia } from "../entities/Pelucia";
import { Tamanho } from "../entities/Tamanho";
import { AtendimentoRepository } from "../repositories/AtendimentoRepository";
import { OrcamentoRepository } from "../repositories/OrcamentoRepository";
import { ResponderOrcamentoPayload } from "../types/AtualizarOrcamentoPayload";
import { CriarOrcamentoPayload } from "../types/CriarOrcamentoPayload";
import { StatusOrcamento } from "../types/enums";
import { BadRequestError } from "../types/erros/BadRequestError";

export class OrcamentoService {

    async criar(clienteId: number, pelucia: Pelucia, idOrcamentoAnterior?: number): Promise<Orcamento> {
        const atendimento = await this.criarAtendimento(clienteId)
        const orcamento = await OrcamentoRepository.create(atendimento, pelucia, idOrcamentoAnterior)

        return orcamento
    }

    private async criarAtendimento(clienteId: number): Promise<Atendimento> {
        let atendimento = await AtendimentoRepository.get(clienteId)
        if(atendimento) {
            return atendimento
        }

        return await AtendimentoRepository.create(clienteId)        
    }

    async reabrirOrcamento(idOrcamentoAnterior: number): Promise<CriarOrcamentoPayload> {
        const orcamentoAnterior = await OrcamentoRepository.getOrcamento(idOrcamentoAnterior)
        if(![StatusOrcamento.EXPIRADO].includes(orcamentoAnterior.status)) {
            throw new BadRequestError('O orçamento não existe ou não pode ser reaberto (não expirado).')
        }

        const novosOrcamentos = await OrcamentoRepository.getOrcamentoReaberto(idOrcamentoAnterior)
        if(novosOrcamentos) {
            throw new BadRequestError('O orçamento já foi reaberto.')
        }

        return {
            clienteId: orcamentoAnterior.atendimento.cliente.id,
            fotos: orcamentoAnterior.pelucia.fotos.map(({ url }) => url),
            nome: orcamentoAnterior.pelucia.nome,
            detalhes: orcamentoAnterior.pelucia.detalhes,
            tamanho: {
                padrao: orcamentoAnterior.pelucia.tamanho.padrao,
                id: orcamentoAnterior.pelucia.tamanho.id,
                altura: orcamentoAnterior.pelucia.tamanho.altura
            },
            kitMaterialId: orcamentoAnterior.pelucia.kitMaterial.id,
            idOrcamentoAnterior
        }
    }

    async getOrcamentosCliente(clienteId: number) {
        const orcamentos = await OrcamentoRepository.getOrcamentosCliente(clienteId)
        const response = orcamentos.map(orcamento => {
            return {
                ...orcamento,
                pelucia: {
                    ...orcamento.pelucia,
                    fotos: orcamento.pelucia.fotos.map(({ url }) => url)
                }
            }
        })

        return response
    }

    async getOrcamento(orcamentoId: number) {
        const orcamento = await OrcamentoRepository.getOrcamento(orcamentoId)

        if(!orcamento) {
            throw new BadRequestError(`Nenhum orçamento com id: ${orcamentoId} encontrado`)
        }

        const { 
            pelucia, 
            pelucia: { 
                tamanho, 
                kitMaterial 
            }, 
            pedido, 
            atendimento: {
                funcionario,
                cliente
            }, 
            orcamentoAnterior 
        } = orcamento

        const fotos = pelucia.fotos.map(({ url }) => url)
        const valorMinimo = this.getValorMinimo(tamanho, kitMaterial)

        const response = {
            ...orcamento,
            valorMinimo,
            funcionarioResponsavel: funcionario?.nome,
            orcamentoAnterior: orcamentoAnterior?.id,
            pelucia: {
                ...pelucia,
                fotos,
                tamanho: {
                    nome: tamanho?.nome,
                    altura: tamanho.altura
                },
                kitMaterial: {
                    nome: kitMaterial?.nome,
                    materiais: kitMaterial?.materiais?.map(material => ({
                        nome: material.nome,
                        descricao: material.descricao ?? ''
                    })) 
                }
            },
            idPedido: pedido?.id,
            idCliente: cliente.id
        }

        delete (response as any).atendimento
        delete (response as any).pedido

        return response
    }

    private getValorMinimo(tamanho: Tamanho, kitMaterial: KitMaterial) {
        let valorMinimo

        if(kitMaterial && kitMaterial.precoTamanhoPadrao) {
            if(tamanho.padrao) {
                valorMinimo = kitMaterial.precoTamanhoPadrao.find(obj => obj.id === tamanho.id)?.valor
            } else {
                kitMaterial.precoTamanhoPadrao.sort((a, b) => a.tamanho.altura - b.tamanho.altura)
                valorMinimo = kitMaterial.precoTamanhoPadrao.find(obj => obj.tamanho.altura <= tamanho.altura)?.valor
            }

            return valorMinimo
        }
    }

    async responderOrcamento(input: ResponderOrcamentoPayload): Promise<void> {
        const statusOrcamento = (await OrcamentoRepository.getStatusOrcamento(input.id)).status
        let updated = false

        if(statusOrcamento === StatusOrcamento.NOVO) {
            //todo: get idFuncionario associado ao Authorization
            // todo: call PUT orcamento/:id/atendimento para colocar em análise
            // todo: then proceed with the steps below
        }

        if ([StatusOrcamento.EM_ANALISE, StatusOrcamento.RESPONDIDO].includes(statusOrcamento)) {
            if (statusOrcamento === StatusOrcamento.EM_ANALISE) {
                input.updateDates = true
            }
        
            await OrcamentoRepository.responderOrcamento(input)

            updated = true
        }

        if(!updated) {
            throw new BadRequestError('Status do orçamento não permite atualizações.')
        }
    }

    async atenderOrcamento(): Promise<void> {

    }

    async delete(orcamentoId: number): Promise<{ idPelucia: number, fotos: number[] }> {
        const orcamento = await OrcamentoRepository.getOrcamentoMinimo(orcamentoId, StatusOrcamento.CANCELADO)

        if(!orcamento) {
            throw new BadRequestError(`Orçamento de id: ${ orcamentoId } não existe ou não está cancelado.`)
        }

        const { id, fotos } = orcamento.pelucia
        const fotosId = fotos.map(({id}) => id)

        await OrcamentoRepository.deleteOrcamento(orcamentoId)

        return { idPelucia: id, fotos: fotosId}
    }
}