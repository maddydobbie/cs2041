#!/bin/sh
# get file name and set counter to 0
name=$1
count=0
# if file -e for the count, increment
while [ -e ".$name.$count" ]
do 
	count=$((count+1))
done
# backup file for that count and print success message
cp $name ".$name.$count"
echo "Backup of '$name' saved as '.$name.$count'"

