import { MagnifyingGlass } from 'phosphor-react';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { TransactionsContext } from '../../contexts/TransactionsContext';
import { SearchFormContainer } from './style';

/**
 * Por que um componente renderiza?
 * - Hooks changed(mudou estado, contexto, reducer)
 * - Props changed(mudou propriedades)
 * - Parent rerendered (componente pai renderizou)
 *
 * Qual o fluxo de renderização?
 * 1. O React recria o HTML da interface daquele componente
 * 2. Compara a versão do HTML recriada com a versão anterior
 * 3. SE mudou algo, ele reescreve o HTML na tela
 *
 * MEMO:
 * 0. Hooks changed, Props chagend -> (deep comparison)
 * 0.1: Comparar a versão anterior dos hooks e props
 * 0.2: SE mudou algoi, ele permite a nova renderização
 *
 * ---> UTILIZA-SE O MEMO APENAS EM COMPONENTES COMPLEXOS
 *      DEEP COMPARISON É MAIS CUSTOZO DO QUE COMPARAR HTMLS DO PASSO 2 <-----
 */

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions;
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });
  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }
  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Busque por transações" {...register("query")} />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}

// export const SearchForm = memo(SearchFormComponent);
