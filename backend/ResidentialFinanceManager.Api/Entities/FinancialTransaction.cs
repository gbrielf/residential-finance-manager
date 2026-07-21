namespace ResidentialFinanceManager.Api.Entities;

public enum TransactionType
{
    Income, // int 0
    Expense, // int 1
}

// tabela das Transações
public class FinancialTransaction
{
    public int Id{ get; set; }

    public string Description { get; set; } = string.Empty;

    public decimal Value { get; set; }

    //Income ou Expenses
    public TransactionType Type { get; set; }

    public int PersonId { get; set; }

    public Person Person { get; set; } = null!;
    
}