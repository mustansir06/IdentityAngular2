using System.Web;
using System.Web.Optimization;

namespace IdentityAngular2
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region Default bundle

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Assets/scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Assets/scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Assets/scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Assets/scripts/bootstrap.js",
                      "~/Assets/scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Assets/css/content/css").Include(
                      "~/Assets/css/content/bootstrap.css",
                      "~/Assets/css/content/site.css"));

            #endregion

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            "~/Assets/scripts/jquery/jquery.unobtrusive*",
            "~/Assets/scripts/jquery/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundle/theme/jquery").Include(
                      "~/Assets/scripts/jquery/jquery-{version}.js",
                      "~/Assets/scripts/bootstrap.min.js",
                      "~/Assets/scripts/theme.js",
                      "~/Assets/scripts/bootstrap.datepicker.js",
                      "~/Assets/plugins/toastr/toastr.min.js",
                      "~/Assets/scripts/select2.min.js"));

            bundles.Add(new StyleBundle("~/bundle/theme/bootstrap").Include(
                      "~/Assets/theme/css/bootstrap/bootstrap.css",
                      "~/Assets/theme/css/bootstrap/bootstrap-responsive.css",
                      "~/Assets/theme/css/bootstrap/bootstrap-overrides.css"));

            bundles.Add(new StyleBundle("~/bundle/theme/css").Include(
                      "~/Assets/theme/css/layout.css",
                      "~/Assets/theme/css/elements.css",
                      "~/Assets/theme/css/icons.css",
                      "~/Assets/theme/css/compiled/form-showcase.css",
                      "~/Assets/theme/css/lib/font-awesome.css",
                      "~/Assets/theme/css/compiled/tables.css",
                      "~/Assets/theme/css/compiled/calendar.css",
                      "~/Assets/theme/css/lib/bootstrap.datepicker.css",
                      "~/Assets/theme/css/googleFonts-OpenSans.css",
                      "~/Assets/theme/css/googleFonts-Lato.css",
                      "~/Assets/plugins/toastr/toastr.css",
                      "~/Assets/theme/css/lib/select2.css"));

        }
    }
}
