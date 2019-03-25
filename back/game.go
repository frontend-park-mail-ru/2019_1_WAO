package game

import (
	"sync"
)

var players []*Player

func GameLoop() {
	var wg sync.WaitGroup
	for _, player := range players {
		wg.Add(1)
		go func(pl *Player) {
			defer wg.Done()
			pl.Gravity(9.81)
			pl.Move(Vector{pl.vx, pl.vy})
		}(player)
	}
	wg.Wait()

}
