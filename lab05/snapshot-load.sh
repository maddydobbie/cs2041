#!/bin/dash

n=$1

snapshot-save.sh
cd .snapshot.$n

echo "Restoring snapshot $n"
for f in *
do 
	cp "$f" "../"
done
