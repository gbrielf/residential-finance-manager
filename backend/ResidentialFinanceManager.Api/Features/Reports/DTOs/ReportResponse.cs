namespace ResidentialFinanceManager.Api.Features.Reports.DTOs;

public class ReportResponse
{
    public List<PersonTotalResponse> People { get; set; } = new();

    public decimal TotalIncome { get; set; }

    public decimal TotalExpense { get; set; }

    public decimal TotalBalance { get; set; }
}