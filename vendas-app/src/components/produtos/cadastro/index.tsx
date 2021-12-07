import { useState } from 'react';
import { Layout, Input, Message } from "components";
import { useProdutoService } from 'app/services';
import { Produto } from 'app/models/produtos';
import { converterEmBigDecimal } from 'app/util/money';
import { Alert } from 'components/common/message';

export const CadastroProdutos: React.FC = () => {

  const service = useProdutoService()
  const [sku, setSku] = useState<string>('')
  const [preco, setPreco] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [id, setId] = useState<string | undefined>('')
  const [dataCadastro, setDataCadastro] = useState<string | undefined>('')
  const [messages, setMessages] = useState<Array<Alert>>([])

  const submit = () => {
    const produto: Produto = {
      id, sku, preco: converterEmBigDecimal(preco), nome, descricao
    };

    if (id) {
      service.atualizar(produto).then(response => {
        setMessages([{
          tipo: 'success', texto: 'Produto atualizado com sucesso!'
        }])
      });
    } else {
      service.salvar(produto).then(produtoResposta => {
        setId(produtoResposta.id)
        setDataCadastro(produtoResposta.dataCadastro)
        setMessages([{
          tipo: 'success', texto: 'Produto salvo com sucesso!'
        }])
      });
    }
  }

  return (
    <Layout titulo="Cadastro de Produtos" mensagens={messages}>
      {id &&
        <div className="columns">
            <Input label="Código:" columnClasses="is-half" value={id} id="id" disabled/>  
            <Input label="Data cadastro:" columnClasses="is-half" value={dataCadastro} id="dataCadastro" disabled/>
        </div>
      }

      <div className="columns">
        <Input label="SKU: *" columnClasses="is-half" onChange={setSku} value={sku} id="sku"
          placeholder="Digite o SKU do produto"/>
        
        <Input label="Preço: *" columnClasses="is-half" onChange={setPreco} value={preco} id="preco"
          placeholder="Digite o preço do produto" currency maxLength={16}/>
      </div>

      <div className="columns">
        <Input label="Nome: *" columnClasses="is-full" onChange={setNome} value={nome} id="nome"
          placeholder="Digite o nome do produto"/>
      </div>

      <div className="columns">
        <div className="field column is-full">
          <label className="label" htmlFor="descricao">Descrição:</label>
          <div className="control">
            <textarea className="textarea" placeholder="Digite a descrição do produto" id="descricao"
            value={descricao} onChange={event => setDescricao(event.target.value)}/>
          </div>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={submit}>
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
        <div className="control">
          <button className="button">Voltar</button>
        </div>
      </div>
      

    </Layout>
  )
}