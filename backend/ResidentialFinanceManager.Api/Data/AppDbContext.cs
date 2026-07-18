using Microsoft.EntityFrameworkCore;
using ResidentialFinanceManager.Api.Entities;

namespace ResidentialFinanceManager.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Person> People { get; set; } = null!;

    // public DbSet<FinancialTransaction> Transactions { get; set; } = null!;
}