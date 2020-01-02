import { Component, AfterViewInit } from '@angular/core';
import { songs } from '../library';
import { Song } from '../song.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements AfterViewInit {
  listened: string = 'listened';
  favourites: string = 'favourites';
  constructor() { }

  ngAfterViewInit() {
    this.changeTab('music');
  }

  changeTab(id: string) {
    const containers = document.querySelectorAll("#tab-content > div");
    containers.forEach(c => {
      (c as HTMLElement).style.display = "none";
    });
    const show = document.querySelector(`#tab-content > #${id}`);
    (show as HTMLElement).style.display = "flex";
    const tabLinks = document.querySelectorAll("span[data-show]");
    tabLinks.forEach(t => {
      (t as HTMLElement).classList.remove("active");
    });
    const clickedLink = document.querySelector(`span[data-show=${id}]`);
    (clickedLink as HTMLElement).classList.add("active");
  }

  getSongs(): Song[] {
    return songs;
  }

  addToListened(song: Song): void {
    if (window.localStorage.getItem(this.listened)) {
      const listened = JSON.parse(window.localStorage.getItem(this.listened));
      if (listened[song.path]) {
        listened[song.path] = +listened[song.path] + 1;
      } else {
        listened[song.path] = 1;
      }
      window.localStorage.setItem(this.listened, JSON.stringify(listened));
    } else {
      const info = {};
      info[song.path] = 1;
      window.localStorage.setItem(this.listened, JSON.stringify(info));
    }
  }

  favourite(song: Song): void {
    if (window.localStorage.getItem(this.favourites)) {
      const favourites: string[] = JSON.parse(window.localStorage.getItem(this.favourites));
      if (favourites.includes(song.path)) {
        favourites.splice(favourites.indexOf(song.path), 1);
      } else {
        favourites.push(song.path);
      }
      window.localStorage.setItem(this.favourites, JSON.stringify(favourites));
    } else {
      const favourites: string[] = [song.path];
      window.localStorage.setItem(this.favourites, JSON.stringify(favourites));
    }
  }

  isFavourite(song: Song): boolean {
    if (!window.localStorage.getItem(this.favourites)) return false;
    const favourites: string[] = JSON.parse(window.localStorage.getItem(this.favourites));
    if (favourites.includes(song.path)) return true;
    return false;
  }

  popular(): Song[] {
    if (!window.localStorage.getItem(this.listened)) return songs.slice(0, 5);
    const listened = JSON.parse(window.localStorage.getItem(this.listened));
    let times: { path: string, times: number }[] = [];
    Object.keys(listened).forEach(k => {
      let s = songs.find(s => s.path === k);
      times.push({
        path: k,
        times: listened[k]
      });
    });
    if (times.length === 0) return songs.slice(0, 5);
    times = times.sort((a, b) => {
      if (a.times > b.times) return -1;
      return 1;
    });
    const popular: Song[] = [];
    times.forEach(t => {
      popular.push(songs.find(s => s.path === t.path));
    });
    if (popular.length < 5) {
      const extra = 5 - popular.length;
      const nonListened = songs.filter(s => !popular.includes(s));
      for (let i = 1; i <= extra; i ++) {
        popular.push(nonListened[i]);
      }
    }
    return popular;
  }

  albums(): string[] {
    const albums = [];
    songs.forEach(s => {
      if (!albums.includes(s.album)) {
        albums.push(s.album);
      }
    });
    return albums;
  }

  artists(): string[] {
    const artists = [];
    songs.forEach(s => {
      if (!artists.includes(s.artist)) {
        artists.push(s.artist);
      }
    });
    return artists;
  }

}
