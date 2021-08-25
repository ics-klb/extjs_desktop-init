/*
 * Ics-Demo-Swan 1.1.0
 *
 * @package     System\Core
 * @subpackage  Swan-Test-Demo
 * @copyright   Copyright (c) 2021 LLC ICS (http://www.icstime.com)
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 */

Ext.preg = Ext.emptyFn;

function i18n(string)     { return string; }


var Klb = Klb || {}; var KlbSys = KlbSys || {};
Ext.apply(Klb, { system: { debug: false, statics: {}, Setting: {} }, App: { Api: {} }, Controller: {}, Setting: {}, Functions: {}, util: {}, clientVersion: {} } );

/**
 * additional date patterns
 * @see{Date}
 */
Date.patterns = {
    ISO8601Long:"Y-m-d H:i:s",
    ISO8601Short:"Y-m-d",
    ISO8601Time:"H:i:s",
    ShortDate: "n/j/Y",
    MediumDate: 'd/m/Y',
    MediumDateTime: 'd/m/Y H:i',
    LongDate: "l, F d, Y",
    FullDateTime: "l, F d, Y g:i:s A",
    MonthDay: "F d",
    ShortTime: "g:i A",
    LongTime: "g:i:s A",
    SortableDateTime: "Y-m-d\\TH:i:s",
    UniversalSortableDateTime: "Y-m-d H:i:sO",
    YearMonth: "F, Y"
};

Ext.LOGLEVEL = Klb.clientVersion.buildType === 'RELEASE' ? 0 : 7;

Klb.system.loadCss = function (url, id) {
    id = id || 'replacecss';
    return Ext.util.CSS.swapStyleSheet(id, url);
};

/**
 * quiet logging in release mode
 */
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: !KlbSys.debug,
    paths: KlbSys.paths
});

Ext.Loader.loadScript({ url: KlbSys.paths['Klb'] + '/system/Abstract.js'});

/**
 * @class Klb.system.Core
 * @namespace Klb.system
 * @sigleton
 */
Ext.define('Klb.system.Ajax', {
    extend : 'Ext.data.Connection',
    alias: 'proxy.klbajax',
    xtype: 'klbajax',
    singleton: true,
    mixins : {
        observable : "Ext.util.Observable"
    },
    autoAbort : false,
    /**
     * @property connection
     */
    connection: Ext.create('Ext.data.Connection')
});

Ext.define('Klb.system.Events', {
    _observers : [],
    init:  Ext.emptyFn,
    defaul_events: {
        onStart: "onStart",
        onStarting: "onStarting",
        onReceived: "onReceived",
        onError: "onError",
        onConnectionSlow: "onConnectionSlow",
        onReconnecting: "onReconnecting",
        onReconnect: "onReconnect",
        onStateChanged: "onStateChanged",
        onDisconnect: "onDisconnect"
    },

    signal: function (eventName, data) {
        for (var i in this._observers) { // перебираю массив подписчиков
            if (this._observers[i].eventName == eventName ) // проверяю подписчиков на тип события
            {
                var item = this._observers[i];
                if (!isnull(item.fn) ) {
                    var fn = Ext.resolveMethod(item.fn, item.obj);
                    fn(item.data);
                } else
                    item.obj.fireEvent('Ev_'+type, item.obj, item.data); // вызываю событие
            }
        }},
    slot: function (eventName, obj, fn, data) {
        // Check if we've been passed a "config style" event.
        if (typeof eventName !== 'string') {
            Ext.EventManager.prepareListenerConfig(eventName);
            return;
        }
        if ( !isnull(obj) )
        {
            this._observers.push({eventName: eventName, obj: obj, id: obj.id || 0, fn: fn || null, data: data || null });
        }
    },
    unslot:function(obj, data) {
        for (var i = 0; i < this._observers.length; i++ ) {
            if (this._observers[i].id == data.id) {
                {
                    this._observers.splice(i,1);
                    i--;
                }
            }
        }
        var e=1;
    }
});

Klb.Msg =  {
    Confirm: function(title, text, callback, scope, options) {
        callback = callback || Ext.emptyFn;
        title = title || _('Warning');
        Ext.Msg.confirm( title
            , text, callback, scope || this);
    },

    Alert: function(title, text, callback) {
        callback = callback || Ext.emptyFn;
        title = title || _('Warning');
        Ext.MessageBox.alert(title, text, callback, this);
    },
    Toast: function(title, text) {
        Ext.toast({
            title: title,
            html:  text,
            align: 't',
            bodyPadding: 10
        });
    },
    Loading: function(status, scope,  text) {
        if (status) {
            Ext.MessageBox.wait({
                title: _('Please wait'),
                msg: text || _('Loading ...'),
                progressText: _('#Calendar/Loading events, please wait...'),
                width: 300, interval: 500, duration: 5000, increment: 5,
                progress: true,
                closable: true,
                animateTarget: scope || null
            });
        } else {
            Ext.Msg.hide();
        }
    },

    WaitUpdate: function(text) {

        Ext.Msg.updateText(text);
    },
    Wait: function(status, title, text) {
        status = status || false;
        title = title || _('Please wait!');
        text  = text ||  _('Updating ...');
        if (status) {
            Ext.Msg.wait( text, title, {
                interval: 500,
                duration: 5000,
                increment: 5,
                closable: true
            });
        } else {
            Ext.Msg.hide();
        }
    }
};

Ext.require([
    'Klb.system.ux.Log'

], function() {

    Ext.define('Klb.system.Core',{
        extend: 'Ext.Base',
        singleton: true,

        /**
         * list of initialised items
         */
        initList: {
            initLog:      false,
            initWindow:   false,
            initViewport: false
        },
        initLog: function () {

            Klb.system.ux.Log.setPrio(Ext.LOGLEVEL);
            Klb.Logger = Klb.system.ux.Log;
            this.initList.initLog = true;
        },

        loadingSystem: function() {
            // предварительнаяинициализация и проверка авторизации пользовователя
            Klb.system.Core.initLog();

        },
        dataRegistry: function() {
           // инициализация базовых модулей

        },
        appDevelop: function() {

            KlbSys.loadCss(KlbSys.paths['Klb.desktop'] + '/resources/Desktop-all.css');
            KlbSys.loadCss(KlbSys.paths['Klb.desktop'] + '/resources/Desktop-all_1.css');
            KlbSys.loadCss(KlbSys.paths['Klb.desktop'] + '/resources/Desktop-all_2.css');

            Ext.application({
                name: 'KlbDesktopApp',
                app: null,
                appFolder: null,
                //-------------------------------------------------------------------------
                // Most customizations should be made to Desktop.Application. If you need to
                // customize this file, doing so below this section reduces the likelihood
                // of merge conflicts when upgrading to new versions of Sencha Cmd.
                //-------------------------------------------------------------------------
                requires: [
                    'KlbDesktopApp.App'
                ],
                init: function() {
                    this.app = new KlbDesktopApp.App();
                }
            });
        }
    });

    Ext.onReady(function () {

        Klb.system.Core.loadingSystem();
        //Develop local version
        Klb.system.Core.appDevelop();
    });

});// Ext.require