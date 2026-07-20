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
        // capturando as exceçoes do service caso algo dê errado
        try
        {
            var transaction = await _transactionService.CreateAsync(request);

            // retorna status 201 created
            return Created(string.Empty, transaction);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<TransactionResponse>>> GetAll()
    {
        var transactions = await _transactionService.GetAllAsync();

        return Ok(transactions);
    }
}