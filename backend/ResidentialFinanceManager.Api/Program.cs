using Microsoft.EntityFrameworkCore;
using ResidentialFinanceManager.Api.Data;
using ResidentialFinanceManager.Api.Middleware;
using ResidentialFinanceManager.Api.Features.People.Services;
using ResidentialFinanceManager.Api.Features.Transactions.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the controllers
builder.Services.AddControllers();
// configurção de serviço do swagger e respectio endpoint
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// injeção de dependências
// "quando alguém pedir um AppDbContext, crie um usando SQLite"
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
        )
    );
// AddScoped = Crie uma instância do serviço para cada requisição HTTP
builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();

var app = builder.Build();

// Ativando middleware de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Registrar o middleware de exceção uma única vez
app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
