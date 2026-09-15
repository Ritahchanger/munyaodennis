namespace PortfolioApi.Common.Exceptions;

public class UnauthorizedApiException : ApiException
{
    public UnauthorizedApiException(string message) : base(message, StatusCodes.Status401Unauthorized)
    {
    }
}
