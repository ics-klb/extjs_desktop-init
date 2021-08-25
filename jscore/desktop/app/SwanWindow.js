/*
 * Ics-Demo-Swan 1.1.0
 *
 * @package     System\Core
 * @subpackage  Swan-Test-Demo
 * @copyright   Copyright (c) 2021 LLC ICS (http://www.icstime.com)
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 */

Ext.define('KlbDesktopApp.SwanWindow', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'KlbDesktopApp.SwanGrid'
    ],

    id:'swan-win',

    init : function(){
        this.launcher = {
            text: i18n('Книги'),
            iconCls:'icon-grid'
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop(),
            win = desktop.getWindow('swan-win');
        if(!win){
            win = desktop.createWindow({
                id: 'swan-win',
                title: i18n('Книги'),
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,

                layout: 'fit',
                items: [
                    {
                        border: false,
                        xtype: 'booksgrid'
                    }
                ]
            });
        }
        return win;
    }
});