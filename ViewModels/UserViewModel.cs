namespace Data.ViewModels
{
public class UserViewModel
{
    public int Id { get; set; }
    public string Title { get; set; }
     public string FirstName { get; set; }
      public string LastName { get; set; }
      public string Email { get; set; }
      public string Password { get; set; }
      public string ConfirmPassword { get; set; }
      public bool acceptTerms { get; set; }

}
}