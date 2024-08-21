import { Atendimento } from "../entities/Atendimento";
import { KitMaterial } from "../entities/KitMaterial";
import { Orcamento } from "../entities/Orcamento";
import { Tamanho } from "../entities/Tamanho";
import { AtendimentoRepository } from "../repositories/AtendimentoRepository";
import { OrcamentoRepository } from "../repositories/OrcamentoRepository";
import { CriarOrcamentoPayload } from "../types/CriarOrcamentoPayload";
import { PeluciaService } from "./PeluciaService";

export class OrcamentoService {
    private peluciaService

    constructor(){
        this.peluciaService = new PeluciaService()
    }

    async criarOrcamento(input: CriarOrcamentoPayload): Promise<Orcamento> {
        const pelucia = await this.peluciaService.criarPelucia(input)
        const atendimento = await this.criarAtendimento(input.clienteId)
        const orcamento = await OrcamentoRepository.create(atendimento, pelucia)

        return orcamento
    }

    private async criarAtendimento(clienteId: number): Promise<Atendimento> {
        let atendimento = await AtendimentoRepository.get(clienteId)
        if(atendimento) {
            return atendimento
        }

        return await AtendimentoRepository.create(clienteId)        
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
}