using Microsoft.AspNetCore.Mvc;
using ResidentialFinanceManager.Api.Features.People.DTOs;
using ResidentialFinanceManager.Api.Features.People.Services;

namespace ResidentialFinanceManager.Api.Features.People.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PeopleController : ControllerBase
{
    private readonly IPersonService _personService;

    public PeopleController(IPersonService personService)
    {
        _personService = personService;
    }

    [HttpPost]
    public async Task<ActionResult<PersonResponse>> Create(CreatePersonRequest request)
    {
        // utiliza a requisição do cliente para criar uma nova instância
        var person = await _personService.CreateAsync(request);

        // status 201 com o objeto criado
        return CreatedAtAction(nameof(GetAll), new { id = person.Id}, person);
    }

    [HttpGet]
    public async Task<ActionResult<List<PersonResponse>>> GetAll()
    {
        // recebe todas as intâncias
        var people = await _personService.GetAllAsync();

        // retorna ao cliente
        return Ok(people);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        // utiliza propriedade criado no service para deleções passando o id desejado
        var deleted = await _personService.DeleteAsync(id);

        // se não encontrar informa ao usuário
        if (!deleted)
        {
            return NotFound();
        }

        // status 204
        return NoContent();
    }
}