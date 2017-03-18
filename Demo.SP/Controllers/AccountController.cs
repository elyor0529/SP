using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using Demo.SP.Models;
using Demo.SP.Providers;
using Demo.SP.Results;
using Demo.SP.ViewModels.Account;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;

namespace Demo.SP.Controllers
{
    [Authorize]
    public class AccountController : BaseController
    {

        private readonly IAuthenticationManager _authenticationManager;

        public AccountController(IAuthenticationManager authenticationManager, ApplicationDbContext db, ApplicationUserManager manager) : base(db, manager)
        {
            _authenticationManager = authenticationManager;
        }

        // POST api/Account/Logout
        [ActionName("Logout")]
        [HttpGet]
        public IHttpActionResult Logout()
        {
            _authenticationManager.SignOut(CookieAuthenticationDefaults.AuthenticationType);

            return Ok();
        }

        // GET api/Account/ExternalLogin
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [HttpGet]
        [ActionName("Login")]
        public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
        {
            if (error != null)
                return Redirect(Url.Content("~/") + "#error=" + Uri.EscapeDataString(error));

            if (!User.Identity.IsAuthenticated)
                return new ChallengeResult(provider, this);

            var externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            if (externalLogin == null)
                return InternalServerError();

            if (externalLogin.LoginProvider != provider)
            {
                _authenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);

                return new ChallengeResult(provider, this);
            }

            var user = await Manager.FindAsync(new UserLoginInfo(externalLogin.LoginProvider, externalLogin.ProviderKey));
            var hasRegistered = user != null;

            if (hasRegistered)
            {
                _authenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);

                var oAuthIdentity = await user.GenerateUserIdentityAsync(Manager, OAuthDefaults.AuthenticationType);
                var cookieIdentity = await user.GenerateUserIdentityAsync(Manager, CookieAuthenticationDefaults.AuthenticationType);
                var properties = ApplicationOAuthProvider.CreateProperties(user.UserName);

                _authenticationManager.SignIn(properties, oAuthIdentity, cookieIdentity);
            }
            else
            {
                var claims = externalLogin.GetClaims();
                var identity = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);

                _authenticationManager.SignIn(identity);
            }

            return Ok();
        }

        #region Helpers


        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }

            public string ProviderKey { get; set; }

            public string UserName { get; set; }

            public IEnumerable<Claim> GetClaims()
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider)
                };

                if (UserName != null)
                    claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));

                return claims;
            }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                var providerKeyClaim = identity?.FindFirst(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(providerKeyClaim?.Issuer) || string.IsNullOrEmpty(providerKeyClaim.Value))
                    return null;

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                    return null;

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name)
                };
            }
        }

        #endregion
    }
}