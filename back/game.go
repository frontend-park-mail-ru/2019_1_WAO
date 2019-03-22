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
}

func (player *Player) Move(vector Vector) {
	player.x += vector.x
	player.y += vector.y
}

func Gravity(player *Player, g float32) {
	player.vy += g
	player.y += player.vy
	fmt.Printf("x: %f, y: %f\n", player.x, player.y)
}
