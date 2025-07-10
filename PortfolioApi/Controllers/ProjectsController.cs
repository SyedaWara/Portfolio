using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Data;
using PortfolioApi.Dtos;
using PortfolioApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly PortfolioDbContext _context;

        public ProjectsController(PortfolioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Projects.Include(p => p.Skills).ToList());

        [HttpPost]
        public IActionResult Create(CreateProjectDto dto)
        {
            var skills = dto.Skills.Select(s => new Skill { Name = s }).ToList();
            var project = new Project { Title = dto.Title, Description = dto.Description, Skills = skills };
            _context.Projects.Add(project);
            _context.SaveChanges();
            return Ok(project);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var project = _context.Projects.Find(id);
            if (project == null) return NotFound();
            _context.Projects.Remove(project);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
