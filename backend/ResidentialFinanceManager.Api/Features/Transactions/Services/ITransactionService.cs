using ResidentialFinanceManager.Api.Features.Transactions.DTOs;

namespace ResidentialFinanceManager.Api.Features.Transactions.Services;

public interface ITransactionService
{
    Task<TransactionResponse> CreateAsync(CreateTransactionRequest request);

    Task<List<TransactionResponse>> GetAllAsync();

}

