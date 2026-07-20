using ResidentialFinanceManager.Api.Features.People.DTOs;

namespace ResidentialFinanceManager.Api.Features.People.Services;

public interface IPersonService
{
    Task<PersonResponse> CreateAsync(CreatePersonRequest request);

    Task<List<PersonResponse>> GetAllAsync();

    Task<bool> DeleteAsync(int id);
}