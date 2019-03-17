//enum state of the next tile based on the tank direction if the path is blocked or not 
var tankPathEnum = {
	UNBLOCKED: Symbol('UNBLOCKED'), 
	BLOCKED: Symbol('BLOCKED')
}; 

//enum type of terrain tiles
var tankTileEnum  = {
	GRASS: Symbol('GRASS'),
	DIRT: Symbol('DIRT'),
	AUTUMN: Symbol('AUTUMN'),
	STONE: Symbol('STONE'),
	WATER: Symbol('WATER'),
	LAVA: Symbol('LAVA'),
	MAGIC: Symbol('MAGIC')
};

class TankTerrain {

	constructor(nextTile) {
		this.nextTile = nextTile;
	};

	//looks if the path of the tank is blocked 
	setTankPathState()
	{
		let tankState = UNBLOCKED;

		if(this.nextTile == STONE || this.nextTile == WATER)
			tankState = BLOCKED;

		return tankState;
	}
	

};