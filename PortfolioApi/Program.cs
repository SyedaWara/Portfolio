using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlite("Data Source=portfolio.db"));
builder.Services.AddCors();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors(builder =>
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseStaticFiles(); // 🔥 Add this line

app.UseAuthorization();
app.MapControllers();

SeedData.Initialize(app);

app.Run();