using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using IndividualProject4.Models;

namespace IndividualProject4.Data
{
    public class SampleData
    {
        public async static Task Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<ApplicationDbContext>();
            var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

            // Ensure db
            context.Database.EnsureCreated();

            // Ensure Stephen (IsAdmin)
            var blair = await userManager.FindByNameAsync("Blair.Russell@CoderCamps.com");
            if (blair == null)
            {
                // create user
                blair = new ApplicationUser
                {
                    UserName = "Blair.Russell@CoderCamps.com",
                    Email = "Blair.Russell@CoderCamps.com"
                };
                await userManager.CreateAsync(blair, "Secret123!");

                // add claims
                await userManager.AddClaimAsync(blair, new Claim("IsAdmin", "true"));
            }

            // Ensure Mike (not IsAdmin)
            var mike = await userManager.FindByNameAsync("Mike@CoderCamps.com");
            if (mike == null)
            {
                // create user
                mike = new ApplicationUser
                {
                    UserName = "Mike@CoderCamps.com",
                    Email = "Mike@CoderCamps.com"
                };
                await userManager.CreateAsync(mike, "Secret123!");
            }


        }

    }
}
