var startCount;
var runCount;

function countdown(length, running) {
	var start = Date.now(),
		remains,
		min,
		sec;
	console.log(running, start, remains, min, sec);

	function timer() {
		if (running) {
			remains = length - (((Date.now() - start) / 1000) | 0);

			min = parseInt(remains / 60);
			if (min < 10) {
				min = "0" + min
			}
			sec = parseInt(remains % 60)
			if (sec < 10) {
				sec = "0" + sec
			}

			$('#mins').html(min);
			$('#secs').html(sec);

			console.log(start, remains, min, sec);

			if (remains === 0) {
				running = false;
				console.log('running: ',running);
				if (runCount === 1) {
					$('#pomo').addClass('hide');
					$('#break').removeClass('hide');
				} else
					if (runCount === 0) {
						$('#pomo').removeClass('hide');
						$('#break').addClass('hide');
					}

			}
		}
	};

	timer();
	startCount = setInterval(timer, 1000);
}

$(document).ready(function () {
	var pomoSet = 25;
	var breakSet = 5;
	var running;
	runCount = 0;
	$('#mins').html('25');
	$('#secs').html('00');
	$('#breakTime').html(breakSet);
	$('#pomoTime').html(pomoSet);

	$('.btn').click(function () {
		clicked = $(this).attr('value');

		if (clicked === 'breakLess') {
			console.log(clicked);
			if (breakSet === 1) {
				breakSet = 1;
			} else
				breakSet -= 1;
		}

		if (clicked === 'breakMore') {
			console.log(clicked);
			if (breakSet === 60) {
				breakSet = 60;
			} else
				breakSet += 1;
		}

		if (clicked === 'pomoLess') {
			console.log(clicked);
			if (pomoSet === 1) {
				pomoSet = 1;
			} else
				pomoSet -= 1;
		}

		if (clicked === 'pomoMore') {
			console.log(clicked, pomoSet);
			if (pomoSet === 60) {
				pomoSet = 60;
			} else
				pomoSet += 1;
		}

		if (clicked === 'stop') {
			clearInterval(startCount);
			$('#stop').toggle();
			$('#reset').toggle();
			if (runCount === 1) { runCount = 0; } else
				if (runCount === 0) { runCount = 1; }
			console.log(clicked, runCount);
		}

		if (clicked === 'reset') {
			$('#mins').html('00');
			$('#secs').html('00');
			$('#stop').toggle();
			$('#reset').toggle();
			running = false;
			console.log(clicked, runCount);
		}

		if (clicked === 'start') {
			if (running === true) {
				console.log('Already running!');
			} else {
				if (runCount === 0) {
					console.log(clicked, runCount, 'for pomo');
					running = true;
					countdown(pomoSet * 60, running);
					runCount = 1;
				} else
					if (runCount === 1) {
						console.log(clicked, runCount, 'for break');
						running = true;
						countdown(breakSet * 60, running);
						runCount = 0;
					}
			}
		}

		$('#breakTime').html(breakSet);
		$('#pomoTime').html(pomoSet);
	})
});

