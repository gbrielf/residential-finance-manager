using ResidentialFinanceManager.Api.Entities;

namespace ResidentialFinanceManager.Api.Features.Transactions.DTOs;

public class TransactionResponse
{
    public int Id { get; set; }

    public string Description { get; set; } = string.Empty;

    public decimal Value { get; set; }

    public TransactionType Type { get; set; }

    public int PersonId { get; set; }

}