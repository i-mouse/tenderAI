using Microsoft.EntityFrameworkCore;

namespace TenderAI.ApiService.Data;

public class TenderDBContext : DbContext
{
    public TenderDBContext( DbContextOptions<TenderDBContext> options ) : base(options)
    {
        
    }
}
