
namespace TenderAI.ApiService.Features.RfpSubmission
{
    public class SubmitRfpRequest
    {
        public required IFormFile File { get; set; }
        public required string UserId { get; set; }

    }
}
