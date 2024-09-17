import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat-app';

  ngOnInit(): void {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Cast 'button' to HTMLElement and access 'dataset' with bracket notation
        const targetTab = document.getElementById((button as HTMLElement).dataset['tab']!);
        tabContents.forEach(content => content.classList.remove('active'));
        targetTab?.classList.add('active');
      });
    });

    // Countdown clock
    const countdownElement = document.getElementById('countdown');
    const targetDate = new Date(new Date().getFullYear() + 1, 0, 1);

    function updateCountdown() {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      if (countdownElement) {
        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    }
    setInterval(updateCountdown, 1000);

    // Video play/pause control
    const video = document.getElementById('background-video') as HTMLVideoElement;
    const playPauseBtn = document.getElementById('playPauseBtn');

    playPauseBtn?.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.textContent = 'Pause';
      } else {
        video.pause();
        playPauseBtn.textContent = 'Play';
      }
    });
  }
}
