/*
 * Ics-Demo-Swan 1.1.0
 *
 * @package     System\Core
 * @subpackage  Swan-Test-Demo
 * @copyright   Copyright (c) 2021 LLC ICS (http://www.icstime.com)
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 */

(function() {
    var Tools = {
        getExtDir :  function(){
            return KlbSys.paths['Ext'];
        },
        getQueryParam: function (name, scriptPath) {
            var regex = RegExp('[?&]' + name + '=([^&]*)');

            var match = regex.exec(location.search) || regex.exec(scriptPath);
            return match && decodeURIComponent(match[1]);
        },
        hasOption: function (opt, queryString) {
            var s = queryString || location.search;
            var re = new RegExp('(?:^|[&?])' + opt + '(?:[=]([^&]*))?(?:$|[&])', 'i');
            var m = re.exec(s);

            return m ? (m[1] === undefined || m[1] === '' ? true : m[1]) : false;
        },
        loadCss: function (url) {
            document.write('<link rel="stylesheet" type="text/css" href="' + url + '"\/>');
        },
        loadScript: function (url, defer) {
            document.write('<script type="text/javascript" src="' + url + '"' + (defer ? ' defer' : '') + '><\/script>');
        },
        doApplication: function () {

            Ext = window.Ext || {};
            Ext.manifest = {
                compatibility: {
                    ext: '6.2.0',
                    theme: KlbSys.theme,
                    resources: KlbSys.paths
                }
            };

            // The value of Ext.repoDevMode gets replaced during a build - do not change this line
            Ext.devMode = KlbSys.debug ? 1 : 0;
            var scriptEls = document.getElementsByTagName('script'),
                scriptPath = scriptEls[scriptEls.length - 1].src,
                rtl = this.getQueryParam('rtl'),
                appMode = this.getQueryParam('mode', scriptPath) || KlbSys.appMode,
                themeName =  this.getQueryParam('theme', scriptPath) || KlbSys.theme,
                includeCSS = !this.hasOption('nocss', scriptPath),
                hasOverrides = !this.hasOption('nooverrides', scriptPath) && !!{
                    // TODO: remove neptune
                    neptune: 1,
                    triton: 0,
                    classic: 0,
                    gray: 1,
                    'neptune-touch': 1,
                    crisp: 1,
                    'crisp-touch': 1
                }[themeName],
                i = 4,
                devMode = Ext.devMode,
                extDir = scriptPath,
                rtlSuffix = (rtl ? '-rtl' : ''),
                debugSuffix = (devMode ? '-debug' : ''),
                themePackageDir, themeOverrideJS, extPrefix, extPackagesRoot;

            rtl = rtl && rtl.toString() === 'true';
            while (i--) {
                extDir = extDir.substring(0, extDir.lastIndexOf('/'));
            }

            Ext.manifest = appMode;
            extDir = Tools.getExtDir();
            extPackagesRoot = extDir ;
            themePackageDir = extPackagesRoot + appMode + '/theme-' + themeName + '/';

            extPrefix = KlbSys.debug ? '/ext-all-debug' : '/ext-all';
            themeOverrideJS = themePackageDir + 'theme-' + themeName + debugSuffix + '.js';

            this.loadScript(extPackagesRoot + extPrefix + rtlSuffix + '.js');
            this.loadScript(themeOverrideJS, true);
            this.loadScript(KlbSys.paths['Klb'] + '/system/Core.js');
        }

    };

    Tools.doApplication();
})();
