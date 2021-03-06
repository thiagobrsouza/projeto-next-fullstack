import { Produto } from "app/models/produtos"

interface TabelaProdutosProps {
  produtos: Array<Produto>;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({produtos}) => {
  return (
    <table className="table is-hoverable">
      <thead>
        <tr>
          <th>Código</th>
          <th>SKU</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {
          produtos.map( produto => <ProdutoRow key={produto.id} produto={produto} />)
        }
      </tbody>
    </table>
  )
}

interface ProdutoRowProps {

}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
  produto
}) => {
  return (
    <tr>
      <td>{produto.id}</td>
      <td>{produto.sku}</td>
      <td>{produto.nome}</td>
      <td>{produto.preco}</td>
      <td>
        <button className="button is-success">Editar</button>
        <button className="button is-danger">Excluir</button>
      </td>
    </tr>
  )
}