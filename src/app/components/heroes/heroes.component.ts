import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/core/models/hero';
import { HeroService } from 'src/app/core/services/hero.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes!: Hero[];
  selectedHero!: Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe({
      next: (heroes: Hero[]) => {
        this.heroes = heroes;
      },
      error: (error) => {
        console.log('An error occured -> ', error);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }

  add(value: string): void {
    const name = value.trim();
    if (!name) return;
    this.heroService
      .addHero({ name } as Hero)
      .subscribe((hero) => this.heroes.push(hero));
  }

  delete(heroId: number): void {
    this.heroService.deleteHero(heroId).subscribe(() => this.getHeroes());
  }
}
