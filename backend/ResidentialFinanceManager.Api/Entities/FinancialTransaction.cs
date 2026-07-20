namespace ResidentialFinanceManager.Api.Entities;

public enum TypeChoices
{
    Income,
    Expenses,
}

// tabela das Transações
public class FinancialTransaction
{
    public int Id{ get; set; }

    public string Description { get; set; } = string.Empty;

    public decimal Value { get; set; }

    //Income ou Expenses
    public TypeChoices Type { get; set; }
    
}