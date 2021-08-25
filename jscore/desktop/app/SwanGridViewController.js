/*
 * Ics-Demo-Swan 1.1.0
 *
 * @package     System\Core
 * @subpackage  Swan-Test-Demo
 * @copyright   Copyright (c) 2021 LLC ICS (http://www.icstime.com)
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 */

Ext.define('KlbDesktopApp.SwanGridViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.swanbooks',


    onGridButton: function(button) {

        var itemId = button.getItemId(),
            view = this.getView(),
            vm = view.getViewModel(),
            store = view.getStore(),
            record;

        if (itemId === 'add') {

            record = store.insert(0, {})[0];
            vm.set('currentItem', record);
            record.commit();
        } else if (itemId === 'edit') {

        } else if (itemId === 'reject') {
            record = view.getSelectionModel().getSelection()[0];
            store.remove(record);
            // store.rejectChanges();
        } else if (itemId === 'commit') {

            store.commitChanges();
            record = vm.get('currentItem');
            record.commit();
            record.reject();
        }

        store.sync({
            failure: function(batch, options) {
                var error = batch.exceptions[0].getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Upgrade Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });

        if (itemId === 'accept') {

            store.load();
        }
        return record;
    },

    onExportButton: function(button) {
        var params = {};

        Klb.system.Ajax.request({
            url: '/service.php/Book/exportXml',
            params: params,
            scope: this,
            success: function(result, request){

            },
            failure: function(result, request) {
                Ext.MessageBox.alert(i18n('Add Contacts'), i18n('Error saving unknown contacts.' ));
            }
        });
    },

    onGridpanelSelect: function(rowmodel, record, index, eOpts) {
        this.getView().setCurrentItem(record);
    }

});