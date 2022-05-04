#!/usr/bin/perl -w
use Scalar::Util qw(looks_like_number);
if ($#ARGV != 1) {
	print "Usage: ./echon.pl <number of lines> <string>\n";
} elsif (!looks_like_number($ARGV[0]) or $ARGV[0] < 0) {
	print "./echon.pl: argument 1 must be a non-negative integer\n";
}else {
	for ($i = 0; $i < $ARGV[0]; $i++) {
		print "$ARGV[1]\n";
	}
}
