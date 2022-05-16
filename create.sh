#!/bin/sh

echo -e ">>>>: Please specify the component name capitalized.\n"

read name

echo -e "\n>>: The name of your component is $name\n\n"

echo -e ">>>>: Please specify the name of the root folder.\n"

read path

echo -e "\n>>: Your component $name will be created at ./src/$path\n"

node createComponents.js $name $path
