using Microsoft.AspNetCore.Mvc;
using ResidentialFinanceManager.Api.Features.Reports.DTOs;
using ResidentialFinanceManager.Api.Features.Reports.Services;


[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportsController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpGet("totals")]
    public async Task<ActionResult<ReportResponse>> GetTotals()
    {
        var report = await _reportService.GetTotalsAsync();

        return Ok(report);
    }
}