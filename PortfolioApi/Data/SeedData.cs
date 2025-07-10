using PortfolioApi.Models;

namespace PortfolioApi.Data
{
    public static class SeedData
    {
        public static void Initialize(WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();

            // Skip seeding if we already have any data
            if (db.Projects.Any() || db.Skills.Any())
                return;

            // Seed skills
            var skillC = new Skill { Name = "C" };
            var skillDotNet = new Skill { Name = "ASP.NET" };

            db.Skills.AddRange(skillC, skillDotNet);
            db.SaveChanges();

            // Seed a project with those skills
            var project = new Project
            {
                Title = "Portfolio Website",
                Description = "Personal portfolio with AI job matcher",
                Skills = new List<Skill> { skillC, skillDotNet }
            };

            db.Projects.Add(project);
            db.SaveChanges();
        }
    }
}
