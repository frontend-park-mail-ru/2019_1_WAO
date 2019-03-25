package game

import "fmt"

type Vector struct {
	x float32
	y float32
}

type Player struct {
	x  float32
	y  float32
	vx float32
	vy float32
	w  float32
	h  float32
}

func (player *Player) Move(vector Vector) {
	player.x += vector.x
	player.y += vector.y
	fmt.Printf("x: %f, y: %f\n", player.x, player.y)
}

func (player *Player) CheckCollision(block Block) bool {
	if player.y+player.h >= block.y && player.y <= block.y+block.h {
		return true
		// player.y = block.y - 1
		// player.vy = -15
	}
	return false
}

func Gravity(player *Player, g float32) {
	player.vy += g
	// player.Move(Vector{0, player.vy})
	// fmt.Printf("x: %f, y: %f\n", player.x, player.y)
}
