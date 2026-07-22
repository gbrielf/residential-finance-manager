import { useState } from 'react';
import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { createPerson } from './features/people/api/createPerson';
import { getReport } from './features/reports/api/getReport';
import { createTransaction } from './features/transactions/api/createTransaction';
import { type TransactionType } from './features/transactions/types/transactions';

const formatCurrency = (value: number | undefined) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value ?? 0);
};

export default function App() {
    const queryClient = useQueryClient();

    const [personName, setPersonName] = useState('');
    const [personAge, setPersonAge] = useState('');

    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [type, setType] = useState<TransactionType>(0);
    const [personId, setPersonId] = useState('');

    const reportQuery = useQuery({
        queryKey: ['report'],
        queryFn: getReport,
    });

    const refreshReport = async () => {
        await queryClient.invalidateQueries({
            queryKey: ['report'],
        });
    };

    const createPersonMutation = useMutation({
        mutationFn: (payload: { name: string; age: number }) =>
            createPerson(payload.name, payload.age),

        onSuccess: async () => {
            setPersonName('');
            setPersonAge('');
            await refreshReport();
        },
    });

    const createTransactionMutation = useMutation({
        mutationFn: (payload: {
            description: string;
            value: number;
            type: TransactionType;
            personId: number;
        }) =>
            createTransaction(
                payload.description,
                payload.value,
                payload.type,
                payload.personId,
            ),

        onSuccess: async () => {
            setDescription('');
            setValue('');
            setType(0);
            setPersonId('');
            await refreshReport();
        },
    });

    const report = reportQuery.data;

    const balance = report?.totalBalance ?? 0;

    return (
        <main className="min-h-screen bg-[#0d1117] text-[#f0f6fc]">
            <div className="border-b border-[#30363d] bg-[#010409]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] text-xl">
                            $
                        </div>

                        <div>
                            <p className="font-semibold text-[#f0f6fc]">
                                Residential Finance Manager
                            </p>

                            <p className="text-xs text-[#8b949e]">
                                Painel de controle financeiro
                            </p>
                        </div>
                    </div>

                    <div className="hidden items-center gap-2 rounded-full border border-[#238636]/40 bg-[#238636]/10 px-3 py-1.5 text-xs font-medium text-[#3fb950] sm:flex">
                        <span className="h-2 w-2 rounded-full bg-[#3fb950]" />
                        Sistema conectado
                    </div>
                </div>
            </div>

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
                <header className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] p-6 shadow-2xl sm:p-8">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#1f6feb]/10 blur-3xl" />

                    <div className="relative">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1f6feb]/40 bg-[#1f6feb]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#58a6ff]">
                            Dashboard financeiro
                        </div>

                        <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-[#f0f6fc] sm:text-4xl lg:text-5xl">
                            Controle as finanças da residência em um só lugar.
                        </h1>

                        <p className="mt-4 max-w-3xl text-sm leading-6 text-[#8b949e] sm:text-base">
                            Cadastre pessoas, registre receitas e despesas e
                            acompanhe o saldo consolidado de forma simples.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#8b949e]">
                            <span className="rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2">
                                Pessoas: {report?.people?.length ?? 0}
                            </span>

                            <span className="rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2">
                                Relatório atualizado automaticamente
                            </span>
                        </div>
                    </div>
                </header>

                <div className="grid gap-6 lg:grid-cols-2">
                    <section className="rounded-xl border border-[#30363d] bg-[#161b22] shadow-xl">
                        <div className="border-b border-[#30363d] px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1f6feb]/40 bg-[#1f6feb]/10 text-lg text-[#58a6ff]">
                                    +
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-[#f0f6fc]">
                                        Cadastrar pessoa
                                    </h2>

                                    <p className="text-sm text-[#8b949e]">
                                        Adicione um novo morador ao sistema.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 p-6">
                            <div>
                                <label
                                    htmlFor="person-name"
                                    className="mb-2 block text-sm font-medium text-[#f0f6fc]"
                                >
                                    Nome
                                </label>

                                <input
                                    id="person-name"
                                    className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5 text-sm text-[#f0f6fc] outline-none transition placeholder:text-[#6e7681] hover:border-[#8b949e] focus:border-[#1f6feb] focus:ring-2 focus:ring-[#1f6feb]/30"
                                    placeholder="Digite o nome completo"
                                    value={personName}
                                    onChange={(event) =>
                                        setPersonName(event.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="person-age"
                                    className="mb-2 block text-sm font-medium text-[#f0f6fc]"
                                >
                                    Idade
                                </label>

                                <input
                                    id="person-age"
                                    className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5 text-sm text-[#f0f6fc] outline-none transition placeholder:text-[#6e7681] hover:border-[#8b949e] focus:border-[#1f6feb] focus:ring-2 focus:ring-[#1f6feb]/30"
                                    placeholder="Digite a idade"
                                    type="number"
                                    min="0"
                                    value={personAge}
                                    onChange={(event) =>
                                        setPersonAge(event.target.value)
                                    }
                                />
                            </div>

                            {createPersonMutation.isError && (
                                <div className="rounded-md border border-[#f85149]/40 bg-[#f85149]/10 px-4 py-3 text-sm text-[#ff7b72]">
                                    Não foi possível cadastrar a pessoa.
                                    Verifique os dados e tente novamente.
                                </div>
                            )}

                            {createPersonMutation.isSuccess && (
                                <div className="rounded-md border border-[#238636]/40 bg-[#238636]/10 px-4 py-3 text-sm text-[#3fb950]">
                                    Pessoa cadastrada com sucesso.
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={async () => {
                                    await createPersonMutation.mutateAsync({
                                        name: personName,
                                        age: Number(personAge),
                                    });
                                }}
                                disabled={
                                    createPersonMutation.isPending ||
                                    !personName.trim() ||
                                    !personAge
                                }
                                className="inline-flex w-full items-center justify-center rounded-md border border-[#2ea043] bg-[#238636] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2ea043] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {createPersonMutation.isPending
                                    ? 'Cadastrando...'
                                    : 'Cadastrar pessoa'}
                            </button>
                        </div>
                    </section>

                    <section className="rounded-xl border border-[#30363d] bg-[#161b22] shadow-xl">
                        <div className="border-b border-[#30363d] px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#a371f7]/40 bg-[#a371f7]/10 text-lg text-[#d2a8ff]">
                                    ↕
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-[#f0f6fc]">
                                        Nova transação
                                    </h2>

                                    <p className="text-sm text-[#8b949e]">
                                        Registre uma receita ou uma despesa.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 p-6">
                            <div>
                                <label
                                    htmlFor="transaction-description"
                                    className="mb-2 block text-sm font-medium text-[#f0f6fc]"
                                >
                                    Descrição
                                </label>

                                <input
                                    id="transaction-description"
                                    className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5 text-sm text-[#f0f6fc] outline-none transition placeholder:text-[#6e7681] hover:border-[#8b949e] focus:border-[#1f6feb] focus:ring-2 focus:ring-[#1f6feb]/30"
                                    placeholder="Ex.: Salário, supermercado..."
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="transaction-value"
                                        className="mb-2 block text-sm font-medium text-[#f0f6fc]"
                                    >
                                        Valor
                                    </label>

                                    <input
                                        id="transaction-value"
                                        className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5 text-sm text-[#f0f6fc] outline-none transition placeholder:text-[#6e7681] hover:border-[#8b949e] focus:border-[#1f6feb] focus:ring-2 focus:ring-[#1f6feb]/30"
                                        placeholder="0,00"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={value}
                                        onChange={(event) =>
                                            setValue(event.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="transaction-type"
                                        className="mb-2 block text-sm font-medium text-[#f0f6fc]"
                                    >
                                        Tipo
                                    </label>

                                    <select
                                        id="transaction-type"
                                        className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5 text-sm text-[#f0f6fc] outline-none transition hover:border-[#8b949e] focus:border-[#1f6feb] focus:ring-2 focus:ring-[#1f6feb]/30"
                                        value={type}
                                        onChange={(event) =>
                                            setType(
                                                Number(
                                                    event.target.value,
                                                ) as TransactionType,
                                            )
                                        }
                                    >
                                        <option value={0}>Receita</option>
                                        <option value={1}>Despesa</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="transaction-person-id"
                                    className="mb-2 block text-sm font-medium text-[#f0f6fc]"
                                >
                                    ID da pessoa
                                </label>

                                <input
                                    id="transaction-person-id"
                                    className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5 text-sm text-[#f0f6fc] outline-none transition placeholder:text-[#6e7681] hover:border-[#8b949e] focus:border-[#1f6feb] focus:ring-2 focus:ring-[#1f6feb]/30"
                                    placeholder="Digite o ID da pessoa"
                                    type="number"
                                    min="1"
                                    value={personId}
                                    onChange={(event) =>
                                        setPersonId(event.target.value)
                                    }
                                />
                            </div>

                            {createTransactionMutation.isError && (
                                <div className="rounded-md border border-[#f85149]/40 bg-[#f85149]/10 px-4 py-3 text-sm text-[#ff7b72]">
                                    Não foi possível cadastrar a transação.
                                    Verifique os dados e as regras de negócio.
                                </div>
                            )}

                            {createTransactionMutation.isSuccess && (
                                <div className="rounded-md border border-[#238636]/40 bg-[#238636]/10 px-4 py-3 text-sm text-[#3fb950]">
                                    Transação cadastrada com sucesso.
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={async () => {
                                    await createTransactionMutation.mutateAsync(
                                        {
                                            description,
                                            value: Number(value),
                                            type,
                                            personId: Number(personId),
                                        },
                                    );
                                }}
                                disabled={
                                    createTransactionMutation.isPending ||
                                    !description.trim() ||
                                    !value ||
                                    !personId
                                }
                                className="inline-flex w-full items-center justify-center rounded-md border border-[#388bfd] bg-[#1f6feb] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#388bfd] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {createTransactionMutation.isPending
                                    ? 'Cadastrando...'
                                    : 'Cadastrar transação'}
                            </button>
                        </div>
                    </section>
                </div>

                <section className="overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] shadow-xl">
                    <div className="flex flex-col gap-3 border-b border-[#30363d] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-[#f0f6fc]">
                                Relatório financeiro
                            </h2>

                            <p className="mt-1 text-sm text-[#8b949e]">
                                Resumo consolidado das receitas, despesas e
                                saldos.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {reportQuery.isFetching && (
                                <span className="flex items-center gap-2 text-sm text-[#8b949e]">
                                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#58a6ff]" />
                                    Atualizando...
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={refreshReport}
                                disabled={reportQuery.isFetching}
                                className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-2 text-sm font-medium text-[#c9d1d9] transition hover:border-[#8b949e] hover:bg-[#30363d] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Atualizar
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {reportQuery.isLoading && (
                            <div className="rounded-md border border-[#30363d] bg-[#0d1117] px-4 py-10 text-center text-sm text-[#8b949e]">
                                Carregando relatório...
                            </div>
                        )}

                        {reportQuery.isError && (
                            <div className="rounded-md border border-[#f85149]/40 bg-[#f85149]/10 px-4 py-3 text-sm text-[#ff7b72]">
                                Não foi possível carregar o relatório.
                                Verifique se a API está funcionando.
                            </div>
                        )}

                        {!reportQuery.isLoading && !reportQuery.isError && (
                            <>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <article className="rounded-lg border border-[#30363d] bg-[#0d1117] p-5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-[#8b949e]">
                                                Total de receitas
                                            </p>

                                            <span className="rounded-md bg-[#238636]/15 px-2 py-1 text-xs font-semibold text-[#3fb950]">
                                                Entrada
                                            </span>
                                        </div>

                                        <p className="mt-4 text-2xl font-bold tracking-tight text-[#3fb950]">
                                            {formatCurrency(
                                                report?.totalIncome,
                                            )}
                                        </p>
                                    </article>

                                    <article className="rounded-lg border border-[#30363d] bg-[#0d1117] p-5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-[#8b949e]">
                                                Total de despesas
                                            </p>

                                            <span className="rounded-md bg-[#f85149]/15 px-2 py-1 text-xs font-semibold text-[#ff7b72]">
                                                Saída
                                            </span>
                                        </div>

                                        <p className="mt-4 text-2xl font-bold tracking-tight text-[#ff7b72]">
                                            {formatCurrency(
                                                report?.totalExpense,
                                            )}
                                        </p>
                                    </article>

                                    <article className="rounded-lg border border-[#30363d] bg-[#0d1117] p-5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-[#8b949e]">
                                                Saldo geral
                                            </p>

                                            <span
                                                className={`rounded-md px-2 py-1 text-xs font-semibold ${
                                                    balance >= 0
                                                        ? 'bg-[#1f6feb]/15 text-[#58a6ff]'
                                                        : 'bg-[#f85149]/15 text-[#ff7b72]'
                                                }`}
                                            >
                                                Consolidado
                                            </span>
                                        </div>

                                        <p
                                            className={`mt-4 text-2xl font-bold tracking-tight ${
                                                balance >= 0
                                                    ? 'text-[#58a6ff]'
                                                    : 'text-[#ff7b72]'
                                            }`}
                                        >
                                            {formatCurrency(balance)}
                                        </p>
                                    </article>
                                </div>

                                <div className="mt-8 overflow-hidden rounded-lg border border-[#30363d]">
                                    <div className="border-b border-[#30363d] bg-[#0d1117] px-5 py-4">
                                        <h3 className="font-semibold text-[#f0f6fc]">
                                            Resumo por pessoa
                                        </h3>

                                        <p className="mt-1 text-sm text-[#8b949e]">
                                            Valores financeiros individuais dos
                                            moradores cadastrados.
                                        </p>
                                    </div>

                                    {report?.people?.length ? (
                                        <div className="divide-y divide-[#30363d]">
                                            {report.people.map((person) => (
                                                <article
                                                    key={person.id}
                                                    className="bg-[#161b22] px-5 py-5 transition hover:bg-[#1c2128]"
                                                >
                                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#30363d] bg-[#0d1117] font-semibold uppercase text-[#58a6ff]">
                                                                {person.name
                                                                    .charAt(0)
                                                                    .toUpperCase()}
                                                            </div>

                                                            <div>
                                                                <strong className="block text-base text-[#f0f6fc]">
                                                                    {
                                                                        person.name
                                                                    }
                                                                </strong>

                                                                <span className="text-sm text-[#8b949e]">
                                                                    Pessoa #
                                                                    {person.id}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="grid flex-1 gap-3 sm:grid-cols-3 lg:max-w-2xl">
                                                            <div className="rounded-md border border-[#30363d] bg-[#0d1117] px-4 py-3">
                                                                <p className="text-xs font-medium uppercase tracking-wide text-[#8b949e]">
                                                                    Receitas
                                                                </p>

                                                                <p className="mt-1 font-semibold text-[#3fb950]">
                                                                    {formatCurrency(
                                                                        person.totalIncome,
                                                                    )}
                                                                </p>
                                                            </div>

                                                            <div className="rounded-md border border-[#30363d] bg-[#0d1117] px-4 py-3">
                                                                <p className="text-xs font-medium uppercase tracking-wide text-[#8b949e]">
                                                                    Despesas
                                                                </p>

                                                                <p className="mt-1 font-semibold text-[#ff7b72]">
                                                                    {formatCurrency(
                                                                        person.totalExpense,
                                                                    )}
                                                                </p>
                                                            </div>

                                                            <div className="rounded-md border border-[#30363d] bg-[#0d1117] px-4 py-3">
                                                                <p className="text-xs font-medium uppercase tracking-wide text-[#8b949e]">
                                                                    Saldo
                                                                </p>

                                                                <p
                                                                    className={`mt-1 font-semibold ${
                                                                        person.balance >=
                                                                        0
                                                                            ? 'text-[#58a6ff]'
                                                                            : 'text-[#ff7b72]'
                                                                    }`}
                                                                >
                                                                    {formatCurrency(
                                                                        person.balance,
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-[#0d1117] px-6 py-14 text-center">
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#30363d] bg-[#161b22] text-xl text-[#8b949e]">
                                                $
                                            </div>

                                            <p className="mt-4 font-medium text-[#c9d1d9]">
                                                Nenhum lançamento encontrado
                                            </p>

                                            <p className="mt-1 text-sm text-[#8b949e]">
                                                Cadastre uma pessoa e registre
                                                uma transação para preencher o
                                                relatório.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </section>

                <footer className="border-t border-[#21262d] py-6 text-center text-xs text-[#6e7681]">
                    Residential Finance Manager · ASP.NET Core, React e
                    TypeScript
                </footer>
            </div>
        </main>
    );
}