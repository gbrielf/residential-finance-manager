namespace ResidentialFinanceManager.Api.Features.Reports.DTOs;

public class PersonTotalResponse
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public decimal TotalIncome { get; set; }

    public decimal TotalExpense { get; set; }

    public decimal Balance { get; set; }
}