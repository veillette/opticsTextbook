#!/bin/bash

# --------------------------------
# To run this batch script run this command:
#
# ./build.sh
#
# before running it FOR THE FIRST TIME make sure to run this command to make the script executable:
# 
# chmod +x build.sh
#
# also make sure that the python v-env is active
# kind regards
# --------------------------------

# remove old build of the books
rm -r _build
rm -r book_EN/_build
rm -r book_NL/_build

# build EN version
cd book_EN
jupyter-book build .

# build NL version
cd ../book_NL
jupyter-book build .
cd _build

# rename NL-html folder and move it in the EN-html folder 
mv html nl
mv nl ../../book_EN/_build/html/nl

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