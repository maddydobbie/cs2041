#!/usr/bin/perl -w
use File::Copy;

if ($ARGV[0] eq "save") {
	$count = 0;
	while (-e ".snapshot.$count") {
		$count = $count+1;
	}
	$dir = ".snapshot.$count";
	mkdir( $dir ) or die "Couldn't create $dir directory, $!";
	print "Creating snapshot $count\n";

	@files = <*>;
	foreach $file (@files) {
		if ($file ne "snapshot.pl") {
			copy("$file",".snapshot.$count/$file") or die "Copy failed: $!";
		}
	}
} else {
	$n = $ARGV[1];

	$count = 0;
	while (-e ".snapshot.$count") {
		$count = $count+1;
	}
	$dir = ".snapshot.$count";
	mkdir( $dir ) or die "Couldn't create $dir directory, $!";
	print "Creating snapshot $count\n";

	@files = <*>;
	foreach $file (@files) {
		if ($file ne "snapshot-save.sh") {
			if ($file ne "snapshot-load.sh") {
				copy("$file",".snapshot.$count/$file") or die "Copy failed: $!";
			}
		}
	}
	chdir (".snapshot.$n") or die "cannot change: $!\n";
	
	print "Restoring snapshot $n\n";
	@lines = <*>;
	foreach $line (@lines) {
		copy("$line","../$line") or die "Copy failed: $!";
	}

}
