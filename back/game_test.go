package game

import (
	"fmt"
	"sync"
	"testing"
	"time"
)

func TestGameLoop(t *testing.T) {
	player1 := Player{2, 6, 0, 0, 1, 1}
	// player2 := Player{50, 60, 0, 0, 10, 10}
	block := Block{2, 36.43, 1, 2}
	// players = append(playrs, &player1, &player2)
	players = append(players, &player1)
	wgr := sync.WaitGroup{}
	for i := 0; i < 20; i++ {
		timer1 := time.NewTimer(time.Second / 16)
		<-timer1.C
		fmt.Print(i+1, " sec\n")
		GameLoop()
		for _, plr := range players {
			wgr.Add(1)
			go func(pl *Player) {
				defer wgr.Done()
				if pl.CheckCollision(block) {
					pl.y = block.y - 1
					pl.vy = -15
					fmt.Println("Collision was occured")
				}
			}(plr)
		}
		wgr.Wait()
	}
	for index, player := range players {
		fmt.Printf("player %x, x: %f, y: %f\n", index+1, player.x, player.y)
	}
}

// func TestSin(t *testing.T) {
// 	for i := 0.0; i < 10; i += 0.1 {
// 		fmt.Println(math.Sin(float64(i)))
// 	}
// }
