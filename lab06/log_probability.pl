#!/usr/bin/perl -w

%matchcount=();
%wordcount=();

$match = $ARGV[0];
$match =~ tr/A-Z/a-z/;
$n = 0;
$total = 0;
$fraction = 0;

foreach $file (glob "lyrics/*.txt") {
	
	open (F, $file) or die ("could not open file");
	
	# get artist name by altering file name	
	$name = $file;
	$name =~ s/lyrics\///;
	$name =~ s/.txt//;
	$name =~ s/_/ /g;

	while ($line = <F>) {
		$line =~ tr/A-Z/a-z/;
		$line =~ s/[^a-z]/ /g;
		$line =~ s/\s/ /g;
		$line =~ s/^\s+//g;
		@words = split (/\s+/, $line);
		foreach $word (@words) {
			$total++;
			if ($word eq $match) {
				$n++;
			}
		}
	}
	$matchcount{$file} = $n;
	$wordcount{$file} = $total;

	$fraction = ($matchcount{$file}+1)/$wordcount{$file}; 
	$log = log$fraction;

	printf("log((%d+1)/%6d) = %8.4f $name\n", $matchcount{$file},$wordcount{$file},$log);

	$n = 0;
	$total = 0;
	$fraction = 0;
}
