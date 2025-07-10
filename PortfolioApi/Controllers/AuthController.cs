using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Dtos;

namespace PortfolioApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private const string AdminPassword = "wara";

        [HttpPost("login")]
        public IActionResult Login(LoginRequestDto dto)
        {
            if (dto.Password == AdminPassword)
                return Ok(new { Success = true });
            return Unauthorized(new { Success = false, Message = "Invalid password" });
        }
    }
}
