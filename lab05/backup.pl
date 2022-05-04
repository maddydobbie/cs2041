#!/usr/bin/perl -w
use File::Copy;

# get file name and set counter to 0
$name = $ARGV[0];
$count = 0;
# if file -e for the count, increment
while (-e ".$name.$count") {
	$count = $count+1;	
}
# backup file for that count and print success message
copy("$name",".$name.$count") or die "Copy failed: $!";
print "Backup of '$name' saved as '.$name.$count'\n";


