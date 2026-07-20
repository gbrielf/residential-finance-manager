using Microsoft.EntityFrameworkCore;
using ResidentialFinanceManager.Api.Data;
using ResidentialFinanceManager.Api.Entities;
using ResidentialFinanceManager.Api.Features.People.DTOs;

namespace ResidentialFinanceManager.Api.Features.People.Services;

public class PersonService : IPersonService
{
    // contexto do banco
    private readonly AppDbContext _context;

    public PersonService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PersonResponse> CreateAsync(CreatePersonRequest request)
    {
        var person = new Person
        {
            Name = request.Name,
            Age = request.Age
        };

        _context.People.Add(person);

        await _context.SaveChangesAsync();

        return new PersonResponse
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.Age
        };
    }

    public async Task<List<PersonResponse>> GetAllAsync()
    {
        return await _context.People.Select(person => new PersonResponse
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.Age,
        })
        .ToListAsync();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        // Person.objects.get(pk=id)
        var person = await _context.People.FindAsync(id);

        // confere se não existe
        if(person == null)
        {
            return false;
        }

        // se existir:
        _context.People.Remove(person);

        // enviando SQL
        await _context.SaveChangesAsync();

        return true;
    }

}
