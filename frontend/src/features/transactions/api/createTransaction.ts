import { api } from "../../../lib/axios";
import { type TransactionResponse } from "../types/transactions";

export async function createTransaction(
    description: string,
    value: number,
    type: number,
    personId: number
): Promise<TransactionResponse> {
    const { data } = await api.post("/Transactions", {
        description,
        value,
        type,
        personId,
    });

    return data;
}