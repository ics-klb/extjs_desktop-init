/*
 * Ics-Demo-Swan 1.1.0
 *
 * @package     System\Core
 * @subpackage  Swan-Test-Demo
 * @copyright   Copyright (c) 2021 LLC ICS (http://www.icstime.com)
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 */

Ext.define('KlbDesktopApp.SwanRecordModel', {
    extend: 'Ext.data.Model',
    requires:[
        'Ext.data.proxy.LocalStorage',
        'Ext.data.proxy.Ajax'
    ],
    idProperty: 'book_id',

    fields: [
        { name: 'book_id', type: 'int' },
        { name: 'book_name' },
        { name: 'author_name' },
        { name: 'book_year', type: 'int' },
        { name: 'status' }
    ],
    proxy: {
        type: 'ajax',
        api: {
            create: '/service.php/Book/addList',
            read: '/service.php/Book/loadList',
            update: '/service.php/Book/updateList',
            destroy: '/service.php/Book/removeList'
        },
        reader: {
            type: 'json',
            idProperty: 'book_id'
        }
    }
});

Ext.define('KlbDesktopApp.SwanRecordStore', {
    extend: 'Ext.data.Store',
    xtype: 'storeswan',
    model: 'KlbDesktopApp.SwanRecordModel',
    pageSize: 0, //disable paging,
    autoLoad: true,
    remoteSort: false,
    sorters: [{
        property: 'book_name',
        direction: 'ASC'
    }]
});


Ext.define('KlbDesktopApp.SwanGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'booksgrid',
    itemId: 'booksgrid',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.plugin.CellEditing',

        'KlbDesktopApp.SwanGridViewController',
        'KlbDesktopApp.SwanGridViewModel'
    ],
    controller: 'swanbooks',
    viewModel: {
        type: 'swanbooks'
    },
    layout: 'fit',
    config: {
        currentItem: null
    },
    store:  {
        itemId: 'bookstore',
        model: 'KlbDesktopApp.SwanRecordModel',
        // proxy: {
        //     type: 'ajax',
        //     url: '/service.php/Book/loadList',
        //     reader: {
        //         type: 'json',
        //         idProperty: 'book_id'
        //     }
        // },
        autoLoad: true,
        remoteSort: false,
        sorters: [{
            property: 'book_name',
            direction: 'ASC'
        }]
    },
    header: {
        padding: '4 9 5 9',
        items: [{
                text:'Обновить',
                xtype: 'button',
                iconCls:'accept',
                itemId: 'accept',
                handler: 'onGridButton'
            }, {
                text: 'Добавить',
                xtype: 'button',
                iconCls: 'add',
                itemId: 'add',
                handler: 'onGridButton'
            }, // {
            //     text:'Редактировать',
            //     xtype: 'button',
            //     iconCls:'edit',
            //     handler: 'onGridButton'
            // },
            {
                text:'Удалить',
                xtype: 'button',
                iconCls:'remove',
                itemId: 'reject',
                handler: 'onGridButton'
            }, {
                text:'Экспорт в XML',
                xtype: 'button',
                iconCls:'option',
                itemId: 'export',
                handler: 'onExportButton'
            }
        ]
    },
    columns: [
        {
            text: i18n("Автор"),
            width: 150,
            flex: 1,
            sortable: true,
            dataIndex: 'author_name',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: i18n("Название книги"),
            flex: 2,
            dataIndex: 'book_name',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: i18n("Год издания"),
            width: 140,
            sortable: true,
            dataIndex: 'book_year',
            default: '1980',
            editor: {
                xtype: 'numberfield'
            }
        }
    ],
    plugins: [
        {
            ptype: 'cellediting'
        }
    ],
    listeners: {
        select: 'onGridpanelSelect'
    }
});