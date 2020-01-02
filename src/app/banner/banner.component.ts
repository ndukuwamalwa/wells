import { Component, OnInit } from '@angular/core';
import { Song } from '../song.model';
import { songs } from '../library';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  song: Song = songs[Math.ceil(Math.random() * (songs.length - 1))];
  isPlaying: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onOutput(e) {
    this.isPlaying = e.isPlaying;
    this.song = e.song;
  }

  play() {
    this.isPlaying = !this.isPlaying;
  }

}
