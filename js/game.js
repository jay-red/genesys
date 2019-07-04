//Key Codes
var keyCodes = {};
keyCodes[ 'a' ] = 65;
keyCodes[ 's' ] = 83;
keyCodes[ 'd' ] = 68;
keyCodes[ 'f' ] = 70;
keyCodes[ 'space' ] = 32;

//Game Constants
var mapWidth = 64,
	mapHeight = 48,
	tileSize = 32,
	gravity = tileSize * 9.8 * 6,
	maxHorizSpeed = tileSize * 20,
	maxVertSpeed = tileSize * 60,
	acceleration = maxHorizSpeed * 2,
	friction = maxHorizSpeed * 6,
	jump = tileSize * 1500,
	COLORS = [ '#000000', '#ECD078' ];

//Game engine variables
var gameObjects = [],
	playerObjects = {},
	myPlayer,
	gameCanvas = document.getElementById( 'gameCanvas' ),
	gameContext = gameCanvas.getContext( '2d' ),
	gameWidth = mapWidth * tileSize,
	gameHeight = mapHeight * tileSize,
	framesPerSec = 60,
	stepTime = 1 / framesPerSec,
	dt = 0,
	currentTime,
	lastTime = timestamp();

//Player Variables
	
var gameMap = [[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5],[5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0,5],[5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[2,2,2,2,2,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[2,2,2,2,2,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[2,2,2,2,2,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,0,5],[2,2,5,5,5,5,5,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[2,2,5,0,0,0,0,0,0,0,0,0,0,0,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[2,2,5,0,0,0,0,0,0,0,0,0,0,0,5,2,2,2,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[2,2,5,0,0,0,0,0,0,0,0,0,0,0,5,2,2,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,5],[2,2,5,0,0,0,0,0,0,0,0,0,0,0,5,2,2,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[2,2,5,0,0,0,0,0,0,0,5,5,5,5,5,2,2,2,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[2,2,5,0,0,0,0,0,0,0,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[2,2,5,0,0,0,0,0,0,0,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,5],[2,2,5,0,0,0,0,0,0,0,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5,2,2,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[2,2,5,0,0,0,0,0,0,0,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5,2,2,2,2,2,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5],[2,2,5,5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,2,2,5,5,5,5,5,5,5,0,0,0,0,0,0,0,5],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,5,5,5,5,5,5,5,5],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]];

function maxVel( vel, extreme ) {
	return Math.max( -extreme, Math.min( extreme, vel ) );
}
			
function timestamp() {
	if( window.performance && window.performance.now ) {
		return window.performance.now();
	} else {
		return new Data().getTime();
	}
}

function gameFrame() {
	currentTime = timestamp();
	dt = dt + Math.min( 1, ( currentTime - lastTime ) / 1000 );
	while( dt > stepTime ) {
		dt = dt - stepTime;
		gameLoop( stepTime );
	}
	render( gameContext );
	lastTime = currentTime;
	requestAnimationFrame( gameFrame, gameCanvas );
}		

function tileToPixel( t ) {
	return t * tileSize;
}

function pixelToTile( p ) {
	return Math.floor( p / tileSize );
}
			
function newPlayer( id, x, y, name ) {
	var player = {};
	player[ 'posX' ] = x;
	player[ 'posY' ] = y;
	player[ 'horizVel' ] = 0;
	player[ 'vertVel' ] = 0;
	player[ 'flightTime' ] = 10 * 1000;
	player[ 'name' ] = name;
	player[ 'jumped' ] = false;
	player[ 'jumping' ] = false;
	player[ 'flying' ] = false;
	player[ 'lefting' ] = false;
	player[ 'righting' ] = false;
	player[ 'falling' ] = true;
	return player;
}

function playerJoined( id, x, y, name ) {
	var player = newPlayer( id, x, y, name );
	gameObjects.push( player );
	playerObjects[ id ] = player;
	return player;
}

function gameLoop( dt ) {
	var decelLeft,
		decelRight,
		horizVel,
		vertVel,
		tileX,
		tileY,
		unknownX,
		unknownY,
		currentTile,
		rightTile,
		diagTile,
		botTile;
	for( var i = 0; i < gameObjects.length; i++ ) {
		decelLeft = gameObjects[ i ][ 'horizVel' ] < 0;
		decelRight = gameObjects[ i ][ 'horizVel' ] > 0;
		horizVel = 0;
		vertVel = gravity;
		if( gameObjects[ i ][ 'lefting' ] ) {
			horizVel -= acceleration;
		} else if( decelLeft ) {
			horizVel += friction;
		}
		if( gameObjects[ i ][ 'righting' ] ) {
			horizVel += acceleration;
		} else if( decelRight ) {
			horizVel -= friction;
		}
		if( gameObjects[ i ][ 'jumped' ] && !gameObjects[ i ][ 'jumping' ] && !gameObjects[ i ][ 'falling' ] ) {
			vertVel -= jump;
			gameObjects[ i ][ 'jumping' ] = true;
		}
		gameObjects[ i ][ 'posX' ] = Math.floor( gameObjects[ i ][ 'posX' ] + ( dt * gameObjects[ i ][ 'horizVel' ] ) );
		gameObjects[ i ][ 'posY' ] = Math.floor( gameObjects[ i ][ 'posY' ] + ( dt * gameObjects[ i ][ 'vertVel' ] ) );
		gameObjects[ i ][ 'horizVel' ] = maxVel( gameObjects[ i ][ 'horizVel' ] + ( dt * horizVel ), maxHorizSpeed );
		gameObjects[ i ][ 'vertVel' ] = maxVel( gameObjects[ i ][ 'vertVel' ] + ( dt * vertVel ), maxVertSpeed );
		if( ( decelLeft && gameObjects[ i ][ 'horizVel' ] > 0 ) || ( decelRight && gameObjects[ i ][ 'horizVel' ] < 0 ) ) {
			gameObjects[ i ][ 'horizVel' ] = 0;
		}
		tileX = pixelToTile( gameObjects[ i ][ 'posX' ] );
		tileY = pixelToTile( gameObjects[ i ][ 'posY' ] );
		unknownX = gameObjects[ i ][ 'posX' ] % tileSize;
		unknownY = gameObjects[ i ][ 'posY' ] % tileSize;
		currentTile = gameMap[ tileY ][ tileX ];
		rightTile = gameMap[ tileY ][ tileX + 1 ];
		diagTile = gameMap[ tileY + 1 ][ tileX + 1 ];
		botTile = gameMap[ tileY + 1 ][ tileX ];
		if( gameObjects[ i ][ 'vertVel' ] > 0 ) {
			if( ( botTile && !currentTile ) || ( diagTile && !rightTile && unknownX ) ) {
				gameObjects[ i ][ 'posY' ] = tileToPixel( tileY );
				gameObjects[ i ][ 'vertVel' ] = 0;
				gameObjects[ i ][ 'falling' ] = false;
				gameObjects[ i ][ 'jumping' ] = false;
				unknownY = 0;
			}
		} else if( gameObjects[ i ][ 'vertVel' ] < 0 ) {
			if( ( currentTile && !botTile ) || ( rightTile && !diagTile && unknownX ) ) {
				gameObjects[ i ][ 'posY' ] = tileToPixel( tileY + 1 );
				gameObjects[ i ][ 'vertVel' ] = 0;
				currentTile = botTile;
				rightTile = diagTile;
				unknownY = 0;
			}
		}
		if( gameObjects[ i ][ 'horizVel' ] > 0 ) {
			if( ( rightTile && !currentTile ) || ( diagTile && !botTile && unknownY ) ) {
				gameObjects[ i ][ 'posX' ] = tileToPixel( tileX );
				gameObjects[ i ][ 'horizVel' ] = 0;
			}
		} else if( gameObjects[ i ][ 'horizVel' ] < 0 ) {
			if( ( currentTile && !rightTile ) || ( botTile && !diagTile && unknownY ) ) {
				gameObjects[ i ][ 'posX' ] = tileToPixel( tileX + 1 );
				gameObjects[ i ][ 'horizVel' ] = 0;
			}
		}
		gameObjects[ i ][ 'falling' ] = ! ( botTile || ( unknownX && diagTile ) );
	}
}

function render( context ) {
	var tileX,
		tileY;
	
	for( tileY = 0; tileY < mapHeight; tileY++ ) {
		for( tileX = 0; tileX < mapWidth; tileX++ ) {
			context.fillStyle = COLORS[ gameMap[ tileY ][ tileX ] == 0 ? 0 : 1 ];
			context.fillRect( tileX * tileSize, tileY * tileSize, tileSize, tileSize );
		}
	}
	
	for( var i = 0; i < gameObjects.length; i++ ) {
		context.fillStyle = '#542437';
		context.fillRect( gameObjects[ i ][ 'posX' ], gameObjects[ i ][ 'posY' ], tileSize, tileSize );
	}
}

function keyEvent( e, pressed ) {
	switch( e.keyCode ) {
		case keyCodes[ 'a' ]:
			myPlayer[ 'lefting' ] = pressed;
			break;
		case keyCodes[ 'd' ]:
			myPlayer[ 'righting' ] = pressed;
			break;
		case keyCodes[ 'space' ]:
			myPlayer[ 'jumped' ] = pressed;
			break;
		case keyCodes[ 's' ]:
			//Shield
			break;
		case keyCodes[ 'f' ]:
			//Flash
			break;
	}
}

document.addEventListener( 'keydown', function( e ) {
	keyEvent( e, true );
} );

document.addEventListener( 'keyup', function( e ) {
	keyEvent( e, false );
} );

gameCanvas.width = gameWidth;
gameCanvas.height = gameHeight;
myPlayer = playerJoined( 0, 64, 32 * 2, "JenniSys" );
gameFrame();