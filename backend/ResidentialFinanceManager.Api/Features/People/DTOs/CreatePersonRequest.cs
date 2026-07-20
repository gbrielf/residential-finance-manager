namespace ResidentialFinanceManager.Api.Features.People.DTOs;

// definição do que pode ser pedido via API
public class CreatePersonRequest
{
    public string Name { get; set; } = string.Empty;

    public int Age { get; set; }
}