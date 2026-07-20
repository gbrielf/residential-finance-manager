namespace ResidentialFinanceManager.Api.Features.People.DTOs;

// definição do que pode ser devolvido pela API
public class PersonResponse
{
    public int Id{ get; set; }

    public string Name { get; set; } = string.Empty;

    public int Age { get; set; }
}