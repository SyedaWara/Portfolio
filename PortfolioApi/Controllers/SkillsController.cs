using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Data;
using PortfolioApi.Dtos;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkillsController : ControllerBase
    {
        private readonly PortfolioDbContext _context;

        public SkillsController(PortfolioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Skills.ToList());

        [HttpPost]
        public IActionResult Create(CreateSkillDto dto)
        {
            var skill = new Skill { Name = dto.Name };
            _context.Skills.Add(skill);
            _context.SaveChanges();
            return Ok(skill);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var skill = _context.Skills.Find(id);
            if (skill == null) return NotFound();
            _context.Skills.Remove(skill);
            _context.SaveChanges();
            return NoContent();
        }
    }
}