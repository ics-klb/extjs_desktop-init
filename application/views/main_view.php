<?php
defined('BASEPATH') OR exit('No direct script access allowed');

    $apptype = 'desktop';


    switch($apptype) :
        case "task":
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>SWAN Test App</title>
	<link rel="stylesheet" type="text/css" href="extjs/classic/theme-triton/resources/theme-triton-all.css">
	<script type="text/javascript" src="extjs/ext-all.js"></script>
	<script type="text/javascript" src="extjs/classic/locale/locale-ru.js"></script>
	<script type="text/javascript" src="jscore/app.js"></script>
</head>
<body>
</body>
</html>
<?php

        break;
    default:
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ru" xml:lang="ru" dir="ltr" id="html-main">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>App-Swan-Demo</title>

    <script type="text/javascript">
        var ExtJsVersion = '6.2.0',
            ExtJsPrefix  = '/extjs', KlbJsPrefix  = '/jscore',
            KlbHostUrl = '/'; // test.rtmis.loc

        var KlbSys = {  debug: true, appMode: 'classic', theme: 'gray'
            , appType:  'test'  // desktop dashboard test
            , extjsUrl: ExtJsPrefix
            , paths: {
                'Ext':        ExtJsPrefix + '/'
                , 'Ext.ux' :    ExtJsPrefix + '/packages/ux/classic/src'
                , 'Ext.chart' : ExtJsPrefix + '/packages/charts/src/chart'
                , 'Ext.draw' :  ExtJsPrefix + '/packages/charts/src/draw'

                , 'Klb':          KlbJsPrefix
                /* Klb system */
                , 'Klb.abstract': KlbJsPrefix + '/abstract'
                , 'Klb.system':   KlbJsPrefix + '/system'
                , 'Klb.desktop':   KlbJsPrefix + '/desktop'
                , 'Klb.system.ux':     KlbJsPrefix + '/system/ux'
                /* Klb Desktop Demo */
                , 'KlbDesktopApp': KlbJsPrefix + '/desktop/app'
            },
            getExtDir :  function(){
                return ExtJsPrefix;
            },
            loadCss: function (url, id) {
                var filecss=document.createElement("link");
                filecss.setAttribute("rel", "stylesheet");
                filecss.setAttribute("type", "text/css");
                filecss.setAttribute("href", url);
                if ( id  && !document.getElementById(id) ) {
                    filecss.setAttribute("id", id);
                    document.getElementsByTagName("head")[0].appendChild( filecss );
                } else {
                    document.getElementsByTagName("head")[0].appendChild( filecss );
                }
                return this;
            }
        };
    </script>

    <script type="text/javascript" src="/jscore/shared/start-ext.js"></script>
</head>
<body id="globalId"></body>
</html>
<?php
     endswitch;
?>