import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createPerson } from './features/people/api/createPerson';
import { getReport } from './features/reports/api/getReport';
import { createTransaction } from './features/transactions/api/createTransaction';
import { type TransactionType } from './features/transactions/types/transactions';

export default function App() {
    const queryClient = useQueryClient();
console.log("App renderizou");
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
        await queryClient.invalidateQueries({ queryKey: ['report'] });
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
        mutationFn: (payload: { description: string; value: number; type: TransactionType; personId: number }) =>
            createTransaction(payload.description, payload.value, payload.type, payload.personId),
        onSuccess: async () => {
            setDescription('');
            setValue('');
            setType(0);
            setPersonId('');
            await refreshReport();
        },
    });
    console.log("App renderizou");
    const report = reportQuery.data;

    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
                <header className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-700">
                        Residential Finance Manager
                    </p>
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                        Controle pessoas, transações e o saldo consolidado em um só lugar.
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm text-slate-600 sm:text-base">
                        Cadastre pessoas, registre receitas e despesas, e veja o relatório consolidado atualizado depois de cada operação.
                    </p>
                </header>

                <div className="grid gap-6 lg:grid-cols-2">
                    <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-semibold text-slate-900">Cadastrar Pessoa</h2>

                        <div className="mt-5 space-y-4">
                            <input
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
                                placeholder="Nome"
                                value={personName}
                                onChange={(e) => setPersonName(e.target.value)}
                            />

                            <input
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
                                placeholder="Idade"
                                type="number"
                                value={personAge}
                                onChange={(e) => setPersonAge(e.target.value)}
                            />

                            <button
                                onClick={async () => {
                                    await createPersonMutation.mutateAsync({
                                        name: personName,
                                        age: Number(personAge),
                                    });
                                }}
                                disabled={createPersonMutation.isPending}
                                className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {createPersonMutation.isPending ? 'Salvando...' : 'Cadastrar Pessoa'}
                            </button>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-semibold text-slate-900">Nova Transação</h2>

                        <div className="mt-5 space-y-4">
                            <input
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
                                placeholder="Descrição"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <input
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
                                placeholder="Valor"
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />

                            <select
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
                                value={type}
                                onChange={(e) => setType(Number(e.target.value) as TransactionType)}
                            >
                                <option value={0}>Receita</option>
                                <option value={1}>Despesa</option>
                            </select>

                            <input
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
                                placeholder="ID da Pessoa"
                                value={personId}
                                onChange={(e) => setPersonId(e.target.value)}
                            />

                            <button
                                onClick={async () => {
                                    await createTransactionMutation.mutateAsync({
                                        description,
                                        value: Number(value),
                                        type,
                                        personId: Number(personId),
                                    });
                                }}
                                disabled={createTransactionMutation.isPending}
                                className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {createTransactionMutation.isPending ? 'Salvando...' : 'Cadastrar Transação'}
                            </button>
                        </div>
                    </section>
                </div>

                <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900">Relatório</h2>
                            <p className="text-sm text-slate-500">Resumo gerado pela API.</p>
                        </div>
                        {reportQuery.isFetching && <span className="text-sm text-slate-500">Atualizando...</span>}
                    </div>

                    {reportQuery.isError && (
                        <p className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            Não foi possível carregar o relatório.
                        </p>
                    )}

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Total Receitas</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-900">{report?.totalIncome ?? 0}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Total Despesas</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-900">{report?.totalExpense ?? 0}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Saldo Geral</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-900">{report?.totalBalance ?? 0}</p>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4">
                        {report?.people?.length ? (
                            report.people.map((person) => (
                                <article key={person.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                        <strong className="text-lg text-slate-900">{person.name}</strong>
                                        <span className="text-sm text-slate-500">#{person.id}</span>
                                    </div>
                                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                        <p>Receitas: {person.totalIncome}</p>
                                        <p>Despesas: {person.totalExpense}</p>
                                        <p>Saldo: {person.balance}</p>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
                                Nenhum lançamento encontrado ainda.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}