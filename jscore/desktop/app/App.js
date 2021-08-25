/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.ns('KlbDesktopApp');

Ext.define('KlbDesktopApp.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',

        'KlbDesktopApp.SwanWindow',
        'KlbDesktopApp.GridWindow',
        'KlbDesktopApp.Settings'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();
    },

    getModules : function(){

        return [
            new KlbDesktopApp.SwanWindow(),
            new KlbDesktopApp.GridWindow(),
            new KlbDesktopApp.ReportsWindow()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {

            contextMenuItems: [
                { text: i18n('Change Settings'), handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: i18n('Books'), iconCls: 'grid-shortcut', module: 'swan-win' }
                ]
            }),

            wallpaper: KlbSys.paths['Klb.desktop'] + '/resources/images/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'ICS, Denys',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text: i18n('Settings'),
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text: i18n('Logout'),
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {

        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },

    onSettings: function () {
        var dlg = new KlbDesktopApp.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
