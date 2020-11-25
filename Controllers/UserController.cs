using Data.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace FullstackPlay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserViewModel>>> GetUser()
        {
            return await _context.Users
                .Select(x => MapToViewModel(x))
                .ToListAsync();
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserViewModel userViewModel)
        {
            if (id != userViewModel.Id)
            {
                return BadRequest();
            }

            var userModel = await _context.Users.FindAsync(id);
            if (userModel == null)
            {
                return NotFound();
            }
            userModel.FirstName = userViewModel.FirstName;
            userModel.LastName = userViewModel.LastName;
            userModel.Email = userViewModel.Email;
            userModel.Password = userViewModel.Password;
            userModel.ConfirmPassword = userViewModel.ConfirmPassword;
            userModel.AcceptTerms = userViewModel.AcceptTerms;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!UserExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UserViewModel>> GetUser(int id)
        {
            var userModel = await _context.Users.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }

            return MapToViewModel(userModel);
        }
        [HttpPost]
        public async Task<ActionResult<UserViewModel>> CreateUser(UserViewModel UserDTO)
        {
            var newData = new User
            {
                FirstName = UserDTO.FirstName,
                LastName = UserDTO.LastName,
                Email = UserDTO.Email,
                Password = UserDTO.Password,
                ConfirmPassword = UserDTO.ConfirmPassword,
                AcceptTerms = UserDTO.AcceptTerms

            };

            _context.Users.Add(newData);
            await _context.SaveChangesAsync();

            return base.CreatedAtAction(
                nameof(GetUser),
                new { id = newData.Id },
                UserController.MapToViewModel(newData));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var todoItem = await _context.Users.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Users.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id) =>
             _context.Users.Any(e => e.Id == id);
        private static UserViewModel MapToViewModel(User user) =>
           new UserViewModel
           {
               Id = user.Id,
               FirstName = user.FirstName,
               LastName = user.LastName,
               Email = user.Email,
               Password = user.Password,
               ConfirmPassword = user.ConfirmPassword,
               AcceptTerms = user.AcceptTerms
           };
    }
}
