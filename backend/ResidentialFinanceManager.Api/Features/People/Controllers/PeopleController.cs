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
        var person = await _personService.CreateAsync(request);

        return CreatedAtAction(nameof(GetAll), new { id = person.Id }, person);
    }

    [HttpGet]
    public async Task<ActionResult<List<PersonResponse>>> GetAll()
    {
        var people = await _personService.GetAllAsync();

        return Ok(people);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
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
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }
}