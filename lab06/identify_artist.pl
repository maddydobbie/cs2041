#!/usr/bin/perl -w

foreach $song (@ARGV) {
	# create array @allwords with all the words from input file
	my @allwords;
	open(my $fh, '<', $song) or die "Could not open file '$song' $!";
	while (my $line = <$fh>) {
		$line =~ tr/A-Z/a-z/;
		$line =~ s/[^a-z]/ /g;
		$line =~ s/\s/ /g;
		$line =~ s/^\s+//g;
		my @words = split (' ', $line);
		push @allwords, @words;
	}
	close $fh;

	my %argWords;
	my %artist;

	# put all the words into a hash table, use i to increment
	my $i = 0;
	foreach $word (@allwords) {
		$argWords{$i} = $word;
		$i++;
	}

	# loop through 
	foreach $file (glob "lyrics/*.txt") {
		open(my $fh, '<', $file) or die "Could not open file '$file' $!";

		my $total = 0;
		my %argWordsCount;
		for ($k = 0; $k < $i; $k++) {
			$argWordsCount{$k} = 0;
		}

		while ($line = <$fh>) {
			$line =~ tr/A-Z/a-z/;
			$line =~ s/[^a-z]/ /g;
			$line =~ s/\s/ /g;
			$line =~ s/^\s+//g;
			@words = split (/\s+/, $line);
			foreach $word (@words) {
				$total++;
				for ($j = 0; $j < $i; $j++) {
					if ($word eq $argWords{$j}) {
						$argWordsCount{$j}++;
					}
				}
			}
		}
		close $fh;

		$name = $file;
		$name =~ s/lyrics\///;
		$name =~ s/.txt//;
		$name =~ s/_/ /g;
		for ($m = 0; $m < $i; $m++) {
			$artist{$name} += log(($argWordsCount{$m}+1)/$total);
		}
	}

	my $flag = 0;
	foreach $key (keys %artist) {
		if (($flag == 0) || ($artist{$key} > $artist{$result})) {
			$result = $key;
			$flag = 1;
		}
	}

	printf("$song most resembles the work of $result (log-probability=%.1f)\n",$artist{$result});
}






