package game

import (
	"fmt"
)

type Vector struct {
	x float32
	y float32
}

type Point struct {
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

func CheckPointCollision(playerPoint, blockUpPoint, blockDownPoint Point) bool {
	if blockUpPoint.x <= playerPoint.x && playerPoint.x <= blockDownPoint.x && blockUpPoint.y <= playerPoint.y && playerPoint.y <= blockDownPoint.y {
		return true
	}
	return false
}

// The function checks all of the player points, but we need only bottom two points
// func (player *Player) CheckCollision(block Block) bool {
// 	var playerPoints []Point

// 	playerPoints = append(playerPoints, Point{player.x, player.y}, Point{player.x + player.w, player.y},
// 		Point{player.x, player.y + player.h}, Point{player.x + player.w, player.y + player.h})
// 	// We will check collisions between the block and each player's point
// 	isCollision := false
// 	blockUpPoint := Point{block.x, block.y}
// 	blockDownPoint := Point{block.x + block.w, block.y + block.h}
// 	for _, point := range playerPoints {
// 		if CheckPointCollision(point, blockUpPoint, blockDownPoint) {
// 			isCollision = true
// 			break
// 		}
// 	}
// 	return isCollision
// }

func (player *Player) CheckCollision(block Block) bool {
	var playerPoints []Point

	playerPoints = append(playerPoints, Point{player.x, player.y + player.h}, Point{player.x + player.w, player.y + player.h})
	// We will check collisions between the block and each player's point
	isCollision := false
	blockUpPoint := Point{block.x, block.y}
	blockDownPoint := Point{block.x + block.w, block.y + block.h}
	for _, point := range playerPoints {
		if CheckPointCollision(point, blockUpPoint, blockDownPoint) {
			isCollision = true
			break
		}
	}
	return isCollision
}

func (player *Player) Gravity(g float32) {
	player.vy += g
	// player.Move(Vector{0, player.vy})
	// fmt.Printf("x: %f, y: %f\n", player.x, player.y)
}
