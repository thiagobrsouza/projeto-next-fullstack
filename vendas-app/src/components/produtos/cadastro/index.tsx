import { useState } from 'react';
import { Layout, Input, Message } from "components";
import { useProdutoService } from 'app/services';
import { Produto } from 'app/models/produtos';
import { converterEmBigDecimal } from 'app/util/money';
import { Alert } from 'components/common/message';
import Link from 'next/link';
import * as yup from 'yup';

const msgCampoObrigatorio = 'Campo obrigatório!'

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(msgCampoObrigatorio),
  nome: yup.string().trim().required(msgCampoObrigatorio),
  descricao: yup.string().trim().required(msgCampoObrigatorio),
  preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "Valor deve ser maior que 0,00")
})

interface FormErros {
  sku?: string;
  nome?: string;
  preco?: string;
  descricao?: string;
}

export const CadastroProdutos: React.FC = () => {

  const service = useProdutoService()
  const [sku, setSku] = useState<string>('')
  const [preco, setPreco] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [id, setId] = useState<string | undefined>('')
  const [dataCadastro, setDataCadastro] = useState<string | undefined>('')
  const [messages, setMessages] = useState<Array<Alert>>([])
  const [errors, setErrors] = useState<FormErros>({})

  const submit = () => {
    const produto: Produto = {
      id, sku, preco: converterEmBigDecimal(preco), nome, descricao
    };

    validationSchema.validate(produto).then(obj => {
      setErrors({})
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
    }).catch(err => {
      const field = err.path;
      const message = err.message;
      setErrors({
        [field]: message
      })
    })

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
          placeholder="Digite o SKU do produto" error={errors.sku}/>
        
        <Input label="Preço: *" columnClasses="is-half" onChange={setPreco} value={preco} id="preco"
          placeholder="Digite o preço do produto" currency maxLength={16} error={errors.preco}/>
      </div>

      <div className="columns">
        <Input label="Nome: *" columnClasses="is-full" onChange={setNome} value={nome} id="nome"
          placeholder="Digite o nome do produto" error={errors.nome}/>
      </div>

      <div className="columns">
        <div className="field column is-full">
          <label className="label" htmlFor="descricao">Descrição:</label>
          <div className="control">
            <textarea className="textarea" placeholder="Digite a descrição do produto" id="descricao"
            value={descricao} onChange={event => setDescricao(event.target.value)}/>
            {errors.descricao &&
              <p className="help is-danger">{errors.descricao}</p>
            }
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
          <Link href="/consultas/produtos">
            <button className="button">Voltar</button>
          </Link>
        </div>
      </div>
      

    </Layout>
  )
}