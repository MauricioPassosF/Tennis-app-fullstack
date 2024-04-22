using System.Data.Common;
using System.Drawing.Text;
using System.Text.Json.Serialization;
using FluentAssertions.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Tennis.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Tennis.Services;


public class Program
{
  public static void Main(string[] args)
  {
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
    builder.Services.AddDbContext<TennisContext>();
    builder.Services.AddScoped<ITennisContext, TennisContext>();
    builder.Services.AddScoped<IUserRepository, UserRepository>();
    builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
    builder.Services.AddScoped<ITournamentRepository, TournamentRepository>();
    builder.Services.AddScoped<IGameRepository, GameRepository>();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddAuthentication(options =>
    {
      options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
      options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options =>
    {
      options.SaveToken = true;
      options.RequireHttpsMetadata = false;
      options.TokenValidationParameters = new TokenValidationParameters()
      {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("testetestetesteTESTE"))
      };
    });

    // var port = builder.Configuration["PORT"];
    // builder.WebHost.UseUrls($"http://*:{port};http://localhost:5500");
    var app = builder.Build();

    using (var serviceScope = app.Services.CreateScope())
    {
      var services = serviceScope.ServiceProvider;
      var logger = services.GetRequiredService<ILogger<Program>>();
      try
      {
        logger.LogInformation("Migrating database associated with context {DbContextName}", nameof(TennisContext));
        var context = services.GetRequiredService<TennisContext>();
        InvokeMigrate(context);

      }
      catch (Exception ex)
      {
        logger.LogError(ex, "An error occurred while migrating the database used on context {DbContextName}", nameof(TennisContext));
      }
    }
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
      app.UseSwagger();
      app.UseSwaggerUI();
      // app.UseCors(builder => builder.WithOrigins("http://localhost:5194") // Substitua por seu domínio
      //                             .WithMethods("GET", "POST", "PUT", "DELETE")
      //                             .WithHeaders("Authorization", "Content-Type")
      //                             .AllowCredentials()
      //                             .SetIsOriginAllowedToAllowWildcardSubdomains()
      //                             .WithExposedHeaders("WWW-Authenticate"));
    }

    app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

    app.UseHttpsRedirection();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
  }

  private static void InvokeMigrate(TennisContext context)
  {
    var canConnect = context.Database.CanConnect();
    var retryCount = 0;

    while (!canConnect && retryCount < 10)
    {
      System.Threading.Thread.Sleep(200000);
      canConnect = context.Database.CanConnect();
      retryCount++;
    }
    if (canConnect)
    {
      context.Database.Migrate();
      context.Database.EnsureCreated();
    }
    else
    {
      throw new InvalidOperationException("Could not connect to the database after multiple attempts.");
    }
  }
}