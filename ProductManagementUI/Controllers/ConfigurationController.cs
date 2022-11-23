using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace ProductManagementUI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConfigurationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ConfigurationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public Dictionary<string, string> Get()
        {
            return new Dictionary<string, string>
            {
                { "ProductMgmtAPIBaseURL", _configuration["ProductMgmtAPIBaseURL"] },
                { "TenantId", _configuration["TenantId"] },
                { "ClientId", _configuration["ClientId"] },                
                { "Authority", _configuration["Authority"] },
                { "RedirectUrl", _configuration["RedirectUrl"] },
                { "PostLogoutUrl", _configuration["PostLogoutUrl"] }
            };
        }
    }
}
