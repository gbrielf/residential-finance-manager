using Microsoft.EntityFrameworkCore;
using ResidentialFinanceManager.Api.Data;
using ResidentialFinanceManager.Api.Entities;
using ResidentialFinanceManager.Api.Features.Reports.DTOs;

namespace ResidentialFinanceManager.Api.Features.Reports.Services;

public class ReportService : IReportService
{
    private readonly AppDbContext _context;

    public ReportService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ReportResponse> GetTotalsAsync()
    {
        var people = await _context.People
        .Include(p => p.Transactions)
        .ToListAsync();

        var peopleTotals = people.Select(person =>
        {
            var income = person.Transactions
            .Where(t => t.Type == TransactionType.Income)
            .Sum(t => t.Value);

            var expense = person.Transactions
            .Where(t => t.Type == TransactionType.Expense)
            .Sum(t => t.Value);

            return new PersonTotalResponse
            {
                Id = person.Id,
                Name = person.Name,
                TotalIncome = income,
                TotalExpense = expense,
                Balance = income - expense
            };
        }).ToList();

        return new ReportResponse
        {
            People = peopleTotals,
            TotalIncome = peopleTotals.Sum(p => p.TotalIncome),
            TotalExpense = peopleTotals.Sum(p => p.TotalExpense),
            TotalBalance = peopleTotals.Sum(p => p.Balance)
        };
    }
}