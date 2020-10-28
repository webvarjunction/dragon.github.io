score = 0;
cross = true;

audio = new Audio('lib/music.mp3');
audiogo = new Audio('lib/gameover.mp3');

setTimeout(function(){
	audio.play();
}, 1000);

document.onkeydown = function (e) {
	//	console.log("Key code is: ", e.keyCode);
	if (e.keyCode == 38) {
		dino = document.querySelector('.dino');
		dino.classList.add('animateDino');
		setTimeout(function () {
			dino.classList.remove('animateDino');
		}, 700);
	}
	if (e.keyCode == 39) {
		dino = document.querySelector('.dino');
		dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
		dino.style.left = dinoX + 112 + "px";
		dino.style.transform = 'rotateY(0deg)';
	}
	if (e.keyCode == 37) {
		dino = document.querySelector('.dino');
		dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
		dino.style.left = (dinoX - 112) + "px";
		dino.style.transform = 'rotateY(180deg)';
	}
}

setInterval(function () {
	dino = document.querySelector('.dino');
	gameOver = document.querySelector('.gameOver');
	obstacle = document.querySelector('.obstacle');

	dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
	dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

	ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
	oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

	offsetX = Math.abs(dx - ox);
	offsetY = Math.abs(dy - oy);
	//	console.log(dx, dy);
	//	console.log(ox, oy);
	console.log(offsetX, offsetY);
	if (offsetX < 90 && offsetY < 52) {
		gameOver.innerHTML = 'Game Over - Reload to Play Again!';
		obstacle.classList.remove('obstacleAni');
		dino.style.visibility = "hidden";
		audiogo.play();
		setTimeout(function(){
			audiogo.pause();
			audio.pause();
		}, 1000);
	} else if (offsetX < 100 && cross) {
		score += 1;
		updateScore(score);
		cross = false;
		setTimeout(function () {
			cross = true;
		}, 1000);
		
		setTimeout(function () {
			aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
			newDur = aniDur - 0.05;
			obstacle.style.animationDuration = newDur + 's';
		}, 800);

	}
}, 100);

function updateScore(score) {
	scoreCont.innerHTML = "Your Score: " + score;
}
