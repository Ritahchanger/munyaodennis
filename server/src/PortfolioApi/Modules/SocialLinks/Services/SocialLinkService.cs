using PortfolioApi.Common.Exceptions;
using PortfolioApi.Modules.SocialLinks.Dtos;
using PortfolioApi.Modules.SocialLinks.Entities;
using PortfolioApi.Modules.SocialLinks.Interfaces;

namespace PortfolioApi.Modules.SocialLinks.Services;

public class SocialLinkService : ISocialLinkService
{
    private readonly ISocialLinkRepository _repository;

    public SocialLinkService(ISocialLinkRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<SocialLinkDto>> GetAllAsync()
    {
        var links = await _repository.GetAllAsync();
        return links.Select(ToDto).ToList();
    }

    public async Task<SocialLinkDto> CreateAsync(CreateSocialLinkDto dto)
    {
        var link = new SocialLink
        {
            Platform = dto.Platform,
            Label = dto.Label,
            Url = dto.Url,
            Handle = dto.Handle,
            Order = dto.Order,
        };

        await _repository.InsertAsync(link);
        return ToDto(link);
    }

    public async Task<SocialLinkDto> UpdateAsync(string id, UpdateSocialLinkDto dto)
    {
        var existing = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Social link not found.");

        existing.Platform = dto.Platform;
        existing.Label = dto.Label;
        existing.Url = dto.Url;
        existing.Handle = dto.Handle;
        existing.Order = dto.Order;

        await _repository.ReplaceAsync(id, existing);
        return ToDto(existing);
    }

    public async Task DeleteAsync(string id)
    {
        var deleted = await _repository.DeleteAsync(id);
        if (!deleted)
        {
            throw new NotFoundException("Social link not found.");
        }
    }

    private static SocialLinkDto ToDto(SocialLink link) => new()
    {
        Id = link.Id,
        Platform = link.Platform,
        Label = link.Label,
        Url = link.Url,
        Handle = link.Handle,
        Order = link.Order,
    };
}
