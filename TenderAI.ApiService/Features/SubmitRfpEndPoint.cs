// using Microsoft.AspNetCore.Builder;
 using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Mvc;
using TenderAI.ApiService.Data;
// using Microsoft.AspNetCore.Http;

namespace TenderAI.ApiService.Features.RfpSubmission;

public static class SubmitRfpEndpoint
{
    public static void MapRfpEndPoint(this IEndpointRouteBuilder app)
    {
        app.MapPost("/rfp", async (SubmitRfpRequest request,TenderDBContext dBContext  ) =>
        {
            var result = new
            {
              Message = "RFP Received",
              File = request.File.Name,
              UserId = request.UserId  
            };

            return Results.Ok(result);

        }  ).WithName("SubmitRfp") .DisableAntiforgery();
    }
}