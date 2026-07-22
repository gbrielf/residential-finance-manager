export type PersonTotalResponse = {
	id: number;
	name: string;
	totalIncome: number;
	totalExpense: number;
	balance: number;
};

export type ReportResponse = {
	people: PersonTotalResponse[];
	totalIncome: number;
	totalExpense: number;
	totalBalance: number;
};
