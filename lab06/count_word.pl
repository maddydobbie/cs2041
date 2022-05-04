#!/usr/bin/perl -w

$arg = $ARGV[0];
$arg =~ tr/A-Z/a-z/;
$n = 0;

while ($line = <STDIN>) {
	$line =~ tr/A-Z/a-z/;
	$line =~ s/[^a-z]/ /g;
	@words = split (/\s+/, $line);
	foreach $word (@words) {
		if ($word eq $arg) {
			$n++;
		}
	}
}
print "$arg occurred $n times\n";
