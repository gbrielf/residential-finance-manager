using ResidentialFinanceManager.Api.Features.Reports.DTOs;

namespace ResidentialFinanceManager.Api.Features.Reports.Services;

public interface IReportService
{
    Task<ReportResponse> GetTotalsAsync();
}