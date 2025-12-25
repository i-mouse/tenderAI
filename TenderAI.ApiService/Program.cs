
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);
// Use the Action<ConfigurationOptions> delegate directly

// Add services to the container.
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.Run();

