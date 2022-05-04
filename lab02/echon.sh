#!/bin/sh
num='^[0-9]'
if [ $# != 2 ]
then 
	echo 'Usage: ./echon.sh <number of lines> <string>'
elif ! [[ $1 =~ $num ]]
then
	echo './echon.sh: argument 1 must be a non-negative integer'
else
	for ((i = 0; i < $1; i++))
	do
		echo $2
	done
fi
