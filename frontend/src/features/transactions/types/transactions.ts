export enum TransactionType {
	Income = 0,
	Expense = 1,
}

export type CreateTransactionRequest = {
	description: string;
	value: number;
	type: TransactionType;
	personId: number;
};

export type TransactionResponse = {
	id: number;
	description: string;
	value: number;
	type: TransactionType;
	personId: number;
};
