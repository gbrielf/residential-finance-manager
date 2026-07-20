using Microsoft.EntityFrameworkCore;
using ResidentialFinanceManager.Api.Data;
using ResidentialFinanceManager.Api.Entities;
using ResidentialFinanceManager.Api.Features.Transactions.DTOs;

namespace ResidentialFinanceManager.Api.Features.Transactions.Services;

public class TransactionService : ITransactionService
{
    private readonly AppDbContext _context;

    public TransactionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<TransactionResponse> CreateAsync(CreateTransactionRequest request)
    {
        var person = await _context.People.FindAsync(request.PersonId);

        if (person == null)
        {
            throw new KeyNotFoundException("Pessoa não encontrada.");
        }

        if (person.Age < 18 && request.Type == TransactionType.Income)
        {
            throw new InvalidOperationException(
                "Menores de idade podem cadastrar apenas despesas."
                );
        }

        var transaction = new FinancialTransaction
        {
            Description = request.Description,
            Value = request.Value,
            Type = request.Type,
            PersonId = request.PersonId,
        };

        _context.Transactions.Add(transaction);

        await _context.SaveChangesAsync();

        return new TransactionResponse
        {
          Id = transaction.Id,
          Description = transaction.Description,
          Value = transaction.Value,
          Type = transaction.Type,
          PersonId = transaction.PersonId,  
        };
    }

    public async Task<List<TransactionResponse>> GetAllAsync()
    {
        return await _context.Transactions.Select(transaction => new TransactionResponse
        {
          Id = transaction.Id,
          Description = transaction.Description,
          Value = transaction.Value,
          Type = transaction.Type,
          PersonId = transaction.PersonId,  
        }).ToListAsync();
    }
}