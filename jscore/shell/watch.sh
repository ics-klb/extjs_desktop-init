#!/bin/sh
# script to build dream factory app for deployment
#
# Copyright (c) 2021 ICS LLC, Inc.
# This file is licensed under the terms of the MIT license.
# See the file license.txt for more details.

test -f ./setting.conf || exit 0
. ./setting.conf

cd ./../

sencha_build()
{
    rm -r -f ./build/*
    sencha app build
}

sencha_watch()
{
    sencha config --prop inspector.address=http://$EXT_SDK_HOST:$EXT_SDK_PORT/ \
    then \
    app watch --inspector
}

sencha_watch