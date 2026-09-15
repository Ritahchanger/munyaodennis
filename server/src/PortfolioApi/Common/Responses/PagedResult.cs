namespace PortfolioApi.Common.Responses;

public class PagedResult<T>
{
    public List<T> Items { get; set; } = new();
    public int Page { get; set; }
    public int PageSize { get; set; }
    public long TotalCount { get; set; }
    public int TotalPages => PageSize <= 0 ? 0 : (int)Math.Ceiling(TotalCount / (double)PageSize);

    public static PagedResult<T> Create(List<T> items, int page, int pageSize, long totalCount) => new()
    {
        Items = items,
        Page = page,
        PageSize = pageSize,
        TotalCount = totalCount,
    };
}
