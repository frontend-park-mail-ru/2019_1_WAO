package game

import (
	"fmt"
	"testing"
	"time"
)

type Moves struct {
	vector    Vector
	expectedX float32
	expectedY float32
}

var moves = []Moves{
	{Vector{-5, 5}, 5, 15},
	{Vector{-10, -10}, 0, 0},
	{Vector{10, 10}, 20, 20},
	{Vector{3.55, -6.1}, 13.55, 3.9},
	{Vector{0, 0}, 10, 10},
	{Vector{0.00, 0.00}, 10, 10},
}

func TestMove(t *testing.T) {

	for _, pair := range moves {
		player := Player{10, 10, 0, 0}
		player.Move(pair.vector)
		if player.x != pair.expectedX || player.y != pair.expectedY {
			t.Error("Expected x:", pair.expectedX, "y:", pair.expectedY,
				"but got x:", player.x, "y:", player.y)
		}
	}

}

func TestGravity(t *testing.T) {
	player := Player{10, 10, 0, 0}
	for i := 0; i < 20; i++ {
		timer1 := time.NewTimer(time.Second)
		<-timer1.C
		fmt.Print(i+1, " sec:	")
		Gravity(&player, 9.81)
	}
}
