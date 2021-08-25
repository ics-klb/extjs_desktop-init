/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */


Ext.define('KlbDesktopApp.ReportsWindow', {
    extend: 'Ext.window.Window',

    uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border',
    ],

    id:'repots-win',

    init : function(){
        this.launcher = {
            text: 'Report Window',
            iconCls:'icon-grid'
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('repots-win');
        if(!win){
            win = desktop.createWindow({
                id: 'grid-win',
                title:'Report Window',
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    { xtype: 'combination-dashboard'}
                ]
            });
        }
        return win;
    }
});


Ext.define('KlbDesktopApp.GridWindow', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'grid-win',

    init : function(){
        this.launcher = {
            text: 'Авторы',
            iconCls:'icon-grid'
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('grid-win');
        if(!win){
            win = desktop.createWindow({
                id: 'grid-win',
                title: i18n('Авторы'),
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    {
                        border: false,
                        xtype: 'grid',
                        store: new Ext.data.ArrayStore({
                            fields: [
                               { name: 'company' },
                               { name: 'price', type: 'float' },
                               { name: 'change', type: 'float' },
                               { name: 'pctChange', type: 'float' }
                            ],
                            data: KlbDesktopApp.GridWindow.getDummyData()
                        }),
                        columns: [
                            new Ext.grid.RowNumberer(),
                            {
                                text: i18n("Company"),
                                flex: 1,
                                sortable: true,
                                dataIndex: 'company'
                            },
                            {
                                text: i18n("Price"),
                                width: 70,
                                sortable: true,
                                renderer: Ext.util.Format.usMoney,
                                dataIndex: 'price'
                            },
                            {
                                text: i18n("Change"),
                                width: 70,
                                sortable: true,
                                dataIndex: 'change'
                            },
                            {
                                text: i18n("% Change"),
                                width: 70,
                                sortable: true,
                                dataIndex: 'pctChange'
                            }
                        ]
                    }
                ],
                tbar:[{
                    text:i18n('Add Something'),
                    tooltip:i18n('Add a new row'),
                    iconCls:'add'
                }, '-', {
                    text: i18n('Options'),
                    tooltip:i18n('Modify options'),
                    iconCls:'option'
                },'-',{
                    text: i18n('Remove Something'),
                    tooltip: i18n('Remove the selected item'),
                    iconCls:'remove'
                }]
            });
        }
        return win;
    },

    statics: {
        getDummyData: function () {
            return [
                ['3m Co',71.72,0.02,0.03],
                ['Alcoa Inc',29.01,0.42,1.47],
                ['American Express Company',52.55,0.01,0.02],
                ['American International Group, Inc.',64.13,0.31,0.49],
                ['AT&T Inc.',31.61,-0.48,-1.54],
                ['Caterpillar Inc.',67.27,0.92,1.39],
                ['Citigroup, Inc.',49.37,0.02,0.04],
                ['Exxon Mobil Corp',68.1,-0.43,-0.64]
            ];
        }
    }
});
