using PortfolioApi.Common.Exceptions;
using PortfolioApi.Common.Responses;
using PortfolioApi.Modules.Works.Dtos;
using PortfolioApi.Modules.Works.Entities;
using PortfolioApi.Modules.Works.Interfaces;

namespace PortfolioApi.Modules.Works.Services;

public class WorkService : IWorkService
{
    private readonly IWorkRepository _repository;

    public WorkService(IWorkRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResult<WorkDto>> GetPagedAsync(string? category, string? search, int page, int pageSize)
    {
        var works = await _repository.GetPagedAsync(category, search, page, pageSize);
        var totalCount = await _repository.CountAsync(category, search);

        return PagedResult<WorkDto>.Create(works.Select(ToDto).ToList(), page, pageSize, totalCount);
    }

    public Task<List<string>> GetCategoriesAsync() => _repository.GetDistinctCategoriesAsync();

    public async Task<WorkDto> CreateAsync(CreateWorkDto dto)
    {
        var work = new Work
        {
            Category = dto.Category,
            Name = dto.Name,
            Url = dto.Url,
            Type = dto.Type,
            Order = dto.Order,
        };

        await _repository.InsertAsync(work);
        return ToDto(work);
    }

    public async Task<WorkDto> UpdateAsync(string id, UpdateWorkDto dto)
    {
        var existing = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Work not found.");

        existing.Category = dto.Category;
        existing.Name = dto.Name;
        existing.Url = dto.Url;
        existing.Type = dto.Type;
        existing.Order = dto.Order;

        await _repository.ReplaceAsync(id, existing);
        return ToDto(existing);
    }

    public async Task DeleteAsync(string id)
    {
        var deleted = await _repository.DeleteAsync(id);
        if (!deleted)
        {
            throw new NotFoundException("Work not found.");
        }
    }

    private static WorkDto ToDto(Work work) => new()
    {
        Id = work.Id,
        Category = work.Category,
        Name = work.Name,
        Url = work.Url,
        Type = work.Type,
        Order = work.Order,
    };
}
