using PortfolioApi.Common.Responses;
using PortfolioApi.Modules.Works.Dtos;

namespace PortfolioApi.Modules.Works.Interfaces;

public interface IWorkService
{
    Task<PagedResult<WorkDto>> GetPagedAsync(string? category, string? search, int page, int pageSize);
    Task<List<string>> GetCategoriesAsync();
    Task<WorkDto> CreateAsync(CreateWorkDto dto);
    Task<WorkDto> UpdateAsync(string id, UpdateWorkDto dto);
    Task DeleteAsync(string id);
}
