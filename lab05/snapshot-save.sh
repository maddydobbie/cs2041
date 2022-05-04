#!/bin/dash

#making .snapshot directory
count=0
# if dir -e for the count, increment
while [ -e ".snapshot.$count" ]
do 
	count=$((count+1))
done
# create snapshot for that count and print success message
mkdir ".snapshot.$count"
echo "Creating snapshot $count"

#for each file, check not this file and then cp file into new dir
for f in *
do
	if [ $f != "snapshot-save.sh" ] 
	then
		if [ $f != "snapshot-load.sh" ]
		then
			cp "$f" ".snapshot.$count/"
		fi
	fi
done

