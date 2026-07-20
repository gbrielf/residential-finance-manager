namespace ResidentialFinanceManager.Api.Entities;

// tabela Pessoa
public class Person
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public int Age { get; set; }

    public ICollection<FinancialTransaction> Transactions { get; set; } = new List<FinancialTransaction>();
}