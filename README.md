
# extjs-desktop-init-6.2.x

Пример инициализации базовых элементов приложения "Рабочий стол" DESKTOP на ExtJS 6.x /Classic. В основе подхода задан принцип: загружать скрипты модулей по мере необходимости, а первоначальная инициализация должна быть минимального размера с возможностью компляции в app.js для хранения в localstorage 

В проекте в качестве frontend используется фреймворк ExtJS 6.2.0 GPL (версия classic, документация тут: https://docs.sencha.com/extjs/6.2.0/classic/Ext.html), в качестве backend - CodeIgniter 3.1.9 (документация тут: https://www.codeigniter.com/user_guide/)

Структура каталогов данного проекта:
/application  - файлы, отвечающие за backend приложения
/application/controllers - контроллеры
/application/models - модели
/application/views - представления
/extjs - файлы ExtJS 6.2.0 Classic
/jscore - файлы, отвечающие за frontend приложения
/system - файлы CodeIgniter 3.1.9
