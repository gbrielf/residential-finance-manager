using Microsoft.AspNetCore.Mvc;
using ResidentialFinanceManager.Api.Features.Transactions.DTOs;
using ResidentialFinanceManager.Api.Features.Transactions.Services;

namespace ResidentialFinanceManager.Api.Features.Transactions.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionsController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpPost]
    public async Task<ActionResult<TransactionResponse>> Create(
        CreateTransactionRequest request)
    {
        var transaction = await _transactionService.CreateAsync(request);

        return Created(string.Empty, transaction);
    }

    [HttpGet]
    public async Task<ActionResult<List<TransactionResponse>>> GetAll()
    {
        var transactions = await _transactionService.GetAllAsync();

        return Ok(transactions);
    }
}