#!/bin/bash

#
# $1 - the name of an environment variable
function requireVar() {
    local value=$(eval "echo \$$1")

    if [ -z "$value" ]; then
        echo "\$$1 is empty!"
        exit 1
    fi
}

#
# $1 - the path of a file or folder 
function assertPath() {
    if [ -e $1 ]; then
        echo "Path '$1' does not exist"
        exit 1
    fi
}