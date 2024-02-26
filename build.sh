#!/bin/bash

# build the book
rm -r _build
rm -r book_EN/_build
rm -r book_NL/_build

cd book_EN
# make sure the v-env is activated
jupyter-book build .
cd ../book_NL
jupyter-book build .
cd _build
mv html nl
cp -r nl ../../book_EN/_build/html
cd ../../book_EN
mv _build ../_build

# Message for user
if [ $? -ne 0 ]; then
	echo "-----------------------------------------"
	echo "      Error: Building failed."
	echo "-----------------------------------------"
    exit 1
fi

echo "-----------------------------------------"
echo "      The book has been built!"
echo "-----------------------------------------"