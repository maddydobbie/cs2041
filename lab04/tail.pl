#!/usr/bin/perl -w
use Scalar::Util qw(looks_like_number);

$n = 10;
$argC = 0;

foreach $arg (@ARGV) {
	$argC++;
    if ($arg eq "--version") {
        print "$0: version 0.1\n";
        exit 0;
    } elsif (($argC == 1) and (looks_like_number($ARGV[0]))) {
		$n = $ARGV[0]*-1;	
	} else {
        push @files, $arg;
    }
}

foreach $file (@files) {
	$count = 0;
	# open, count number of lines and close
    open F, '<', $file or die "$0: Can't open $file: $!\n";
	$count++ while <F>;
    close F;

	#formatting for multiple files
	if (@files > 1) {
		print "==> $file <==\n";
	}
	# open, get lines assigned to array and close
    open F, '<', $file or die "$0: Can't open $file: $!\n";
	@lines = <F>;
	close F;
	# printing lines if within n last
	$lineNum = 0;
	foreach $line (@lines) {
		$lineNum++;
		if (($lineNum > ($count-$n)) and ($lineNum <= $count)) {
			print "$line";
		}
	}
}

if (@files == 0) {
	@lines = <>;
	$lineNum = 0;
	foreach $line (@lines) {
		$lineNum++;
		if (($lineNum > (@lines-$n)) and ($lineNum <= @lines)) {
			print "$line";
		}
	}
}
