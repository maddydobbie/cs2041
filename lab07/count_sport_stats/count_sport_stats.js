function countStats(data) {
	sum_matches = 0;
	sum_tries = 0;

	for (x in data) {
		var n_match = parseInt(data[x].matches, 10);
		var n_tries = parseInt(data[x].tries, 10);

		sum_matches = sum_matches+n_match;
		sum_tries = sum_tries+n_tries;
	}

    return {
    			matches: sum_matches,
    			tries: sum_tries
			}
}

const json = process.argv[2];
if (json === undefined) {
    throw new Error(`input not supplied`);
}
// include the json file via node's module system,
// this parses the json file into a JS object
// NOTE: this only works via node and will not work in the browser
const stats = require(`./${json}`);

console.log(countStats(stats.results));
