/*
 * Ics-Demo-Swan 1.1.0
 *
 * @package     System\Core
 * @subpackage  Swan-Test-Demo
 * @copyright   Copyright (c) 2021 LLC ICS (http://www.icstime.com)
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 */

Ext.ns('Klb.system.Abstract', 'Klb.system.Abstract', 'Klb.system.Abstract.store', 'KlbDesktop.app', 'KlbDesktop.MVC');

Ext.define("Klb.system.Abstract",      { extend: "Object" });
Ext.define('Klb.system.Abstract.AppController', { extend: 'Ext.app.Controller'});

Ext.define('Klb.system.app.ViewController', { extend: 'Ext.app.ViewController' });
Ext.define('Klb.system.app.ViewModel', { extend: 'Ext.app.ViewModel' });
Ext.define('Klb.system.Abstract.Model',     { extend: 'Ext.data.Model',  xtype: 'klbmodel', identifier: 'uuid' });
Ext.define('Klb.system.Abstract.StoreData', { extend: 'Ext.data.Store',  xtype: 'klbstore', identifier: 'uuid', proxy: 'memory', rootProperty: 'results' });
