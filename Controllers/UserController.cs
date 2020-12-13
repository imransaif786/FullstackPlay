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
        // GET: api/BlogPosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserViewModel>>> GetUser()
        {
            return await _context.Users
                .Select(x => MapToViewModel(x))
                .ToListAsync();
        }
        // GET: api/BlogPosts/5
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
        // PUT: api/BlogPosts/5
        [HttpPut("{id}")]
         public async Task<IActionResult> UpdateUser(int id, UserViewModel userViewModel)
        {
            var userModel = await _context.Users.FindAsync(id);
            if (userModel == null)
            {
                return NotFound();
            }
            userModel.Title = userViewModel.Title;
            userModel.FirstName = userViewModel.FirstName;
            userModel.LastName = userViewModel.LastName;
            userModel.Email = userViewModel.Email;
            userModel.Gender = userViewModel.Gender;
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
        // POST: api/BlogPosts
        [HttpPost]
        public async Task<ActionResult<UserViewModel>> CreateUser(UserViewModel UserDTO)
        {
            var newData = new User
            {
                Title = UserDTO.Title,
                FirstName = UserDTO.FirstName,
                LastName = UserDTO.LastName,
                Email = UserDTO.Email,
                Gender = UserDTO.Gender,
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
               Title = user.Title,
               FirstName = user.FirstName,
               LastName = user.LastName,
               Email = user.Email,
               Gender = user.Gender,
               Password = user.Password,
               ConfirmPassword = user.ConfirmPassword,
               AcceptTerms = user.AcceptTerms
           };
    }
}
