class SlideshowApp {
    constructor() {
        this.config = {
            github: {
                username: 'twicolor',
                repository: 'OurClass',
                imagesFolder: 'images',
                musicFolder: 'music'
            },
            password: '1989',
            slideshowInterval: 5000,
            controlsHideTimeout: 3000
        };

        this.state = {
            images: [],
            tracks: [],
            currentImageIndex: 0,
            currentTrackIndex: 0,
            slideshowPlaying: false,
            musicPlaying: false,
            muted: false,
            slideshowTimer: null,
            controlsTimer: null
        };

        this.elements = {};
        this.audioPlayer = null;

        this.init();
    }

    init() {
        this.bindElements();
        this.bindEvents();
        this.showPasswordScreen();
    }

    bindElements() {
        // Screens
        this.elements.passwordScreen = document.getElementById('passwordScreen');
        this.elements.loadingScreen = document.getElementById('loadingScreen');
        this.elements.mainApp = document.getElementById('mainApp');
        this.elements.errorOverlay = document.getElementById('errorOverlay');

        // Password form
        this.elements.passwordForm = document.getElementById('passwordForm');
        this.elements.passwordInput = document.getElementById('passwordInput');
        this.elements.passwordError = document.getElementById('passwordError');

        // Loading and Error
        this.elements.loadingStatus = document.getElementById('loadingStatus');
        this.elements.errorMessage = document.getElementById('errorMessage');
        this.elements.retryBtn = document.getElementById('retryBtn');

        // Slideshow
        this.elements.slideImage = document.getElementById('slideImage');
        this.elements.currentImageIndex = document.getElementById('currentImageIndex');
        this.elements.totalImages = document.getElementById('totalImages');

        // Control Panel
        this.elements.controlPanel = document.getElementById('controlPanel');
        this.elements.playPauseBtn = document.getElementById('playPauseBtn');
        this.elements.prevImageBtn = document.getElementById('prevImageBtn');
        this.elements.nextImageBtn = document.getElementById('nextImageBtn');
        this.elements.prevTrackBtn = document.getElementById('prevTrackBtn');
        this.elements.nextTrackBtn = document.getElementById('nextTrackBtn');
        this.elements.muteBtn = document.getElementById('muteBtn');
        this.elements.galleryBtn = document.getElementById('galleryBtn');

        // Music info
        this.elements.trackTitle = document.getElementById('trackTitle');

        // Gallery
        this.elements.galleryOverlay = document.getElementById('galleryOverlay');
        this.elements.galleryGrid = document.getElementById('galleryGrid');
        this.elements.closeGalleryBtn = document.getElementById('closeGalleryBtn');

        // Audio
        this.audioPlayer = document.getElementById('audioPlayer');
    }

    bindEvents() {
        // Password form
        this.elements.passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePasswordSubmit();
        });

        // Retry button
        this.elements.retryBtn.addEventListener('click', () => {
            this.hideError();
            this.showLoadingScreen();
            this.loadContent();
        });

        // Control buttons
        this.elements.playPauseBtn.addEventListener('click', () => this.toggleSlideshow());
        this.elements.prevImageBtn.addEventListener('click', () => this.previousImage());
        this.elements.nextImageBtn.addEventListener('click', () => this.nextImage());
        this.elements.prevTrackBtn.addEventListener('click', () => this.previousTrack());
        this.elements.nextTrackBtn.addEventListener('click', () => this.nextTrack());
        this.elements.muteBtn.addEventListener('click', () => this.toggleMute());
        this.elements.galleryBtn.addEventListener('click', () => this.openGallery());

        // Gallery
        this.elements.closeGalleryBtn.addEventListener('click', () => this.closeGallery());
        this.elements.galleryOverlay.addEventListener('click', (e) => {
            if (e.target === this.elements.galleryOverlay) {
                this.closeGallery();
            }
        });

        // Audio events
        this.audioPlayer.addEventListener('ended', () => this.onTrackEnded());
        this.audioPlayer.addEventListener('error', (e) => this.onTrackError(e));

        // User activity tracking for auto-hide controls
        this.setupControlsAutoHide();

        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    setupControlsAutoHide() {
        const resetControlsTimer = () => {
            this.showControls();
            this.resetControlsHideTimer();
        };

        // Mouse movement
        document.addEventListener('mousemove', resetControlsTimer);
        
        // Touch events
        document.addEventListener('touchstart', resetControlsTimer);
        document.addEventListener('touchmove', resetControlsTimer);
        
        // Keyboard events
        document.addEventListener('keydown', resetControlsTimer);
        
        // Click events on control panel
        this.elements.controlPanel.addEventListener('click', resetControlsTimer);
    }

    showControls() {
        if (this.elements.controlPanel) {
            this.elements.controlPanel.classList.remove('hidden-panel');
        }
    }

    hideControls() {
        if (this.elements.controlPanel) {
            this.elements.controlPanel.classList.add('hidden-panel');
        }
    }

    resetControlsHideTimer() {
        if (this.state.controlsTimer) {
            clearTimeout(this.state.controlsTimer);
        }
        this.state.controlsTimer = setTimeout(() => {
            this.hideControls();
        }, this.config.controlsHideTimeout);
    }

    showPasswordScreen() {
        this.elements.passwordScreen.classList.remove('hidden');
        this.elements.loadingScreen.classList.add('hidden');
        this.elements.mainApp.classList.add('hidden');
        this.elements.errorOverlay.classList.add('hidden');
        setTimeout(() => {
            this.elements.passwordInput.focus();
        }, 100);
    }

    showLoadingScreen() {
        this.elements.passwordScreen.classList.add('hidden');
        this.elements.loadingScreen.classList.remove('hidden');
        this.elements.mainApp.classList.add('hidden');
        this.elements.errorOverlay.classList.add('hidden');
    }

    showMainApp() {
        this.elements.passwordScreen.classList.add('hidden');
        this.elements.loadingScreen.classList.add('hidden');
        this.elements.mainApp.classList.remove('hidden');
        this.elements.errorOverlay.classList.add('hidden');
        this.resetControlsHideTimer();
    }

    showError(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.passwordScreen.classList.add('hidden');
        this.elements.loadingScreen.classList.add('hidden');
        this.elements.mainApp.classList.add('hidden');
        this.elements.errorOverlay.classList.remove('hidden');
    }

    hideError() {
        this.elements.errorOverlay.classList.add('hidden');
    }

    handlePasswordSubmit() {
        const password = this.elements.passwordInput.value.trim();
        
        console.log('Checking password:', password, 'Expected:', this.config.password);
        
        if (password === this.config.password) {
            this.elements.passwordError.classList.add('hidden');
            this.showLoadingScreen();
            // Start loading content
            setTimeout(() => {
                this.loadContent();
            }, 100);
        } else {
            this.elements.passwordError.classList.remove('hidden');
            this.elements.passwordInput.value = '';
            setTimeout(() => {
                this.elements.passwordInput.focus();
            }, 100);
        }
    }

    async loadContent() {
        try {
            this.updateLoadingStatus('Подключаемся к репозиторию...');
            await new Promise(resolve => setTimeout(resolve, 500));

            let images = [];
            let tracks = [];

            try {
                // Try to load from GitHub
                [images, tracks] = await Promise.all([
                    this.loadGitHubFolder(this.config.github.imagesFolder),
                    this.loadGitHubFolder(this.config.github.musicFolder)
                ]);

                // Filter files by type
                images = images.filter(file => 
                    /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file.name)
                );
                
                tracks = tracks.filter(file => 
                    /\.(mp3|ogg|wav|m4a)$/i.test(file.name)
                );

                console.log(`Loaded ${images.length} images and ${tracks.length} tracks from GitHub`);

            } catch (githubError) {
                console.error('GitHub loading failed:', githubError);
                this.updateLoadingStatus('GitHub недоступен, используем демо контент...');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            // If no content from GitHub, use demo content
            if (images.length === 0) {
                console.log('Using demo images');
                images = this.createDemoImages();
            }
            
            if (tracks.length === 0) {
                console.log('Using demo tracks');
                tracks = this.createDemoTracks();
            }

            // Shuffle both arrays
            this.state.images = this.shuffle(images);
            this.state.tracks = this.shuffle(tracks);

            this.updateLoadingStatus('Запускаем приложение...');
            await new Promise(resolve => setTimeout(resolve, 500));

            // Initialize and show main app
            this.initializeSlideshow();
            this.initializeMusic();
            this.showMainApp();

            // Auto-start slideshow and music
            setTimeout(() => {
                if (this.state.images.length > 0) {
                    this.startSlideshow();
                }
                if (this.state.tracks.length > 0) {
                    this.startMusic();
                }
            }, 500);

        } catch (error) {
            console.error('Critical error loading content:', error);
            // Fallback to demo content
            this.state.images = this.createDemoImages();
            this.state.tracks = this.createDemoTracks();
            
            this.initializeSlideshow();
            this.initializeMusic();
            this.showMainApp();
            
            setTimeout(() => {
                if (this.state.images.length > 0) {
                    this.startSlideshow();
                }
            }, 500);
        }
    }

    createDemoImages() {
        return [
            {
                name: 'demo1.jpg',
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQxIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMUZCOENEO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzVEODc4RjtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNncmFkMSkiLz48dGV4dCB4PSI0MDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QndCw0YggwrrQu9Cw0YHRgzwvdGV4dD48dGV4dCB4PSI0MDAiIHk9IjM0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QlNC10LzQviDQuNC30L7QsdGA0LDQttC10L3QuNC1IDE8L3RleHQ+PC9zdmc+',
                size: 0
            },
            {
                name: 'demo2.jpg',
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQyIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZDMTg1O3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0Q0NTU0NTtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNncmFkMikiLz48dGV4dCB4PSI0MDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QntC00L3QvtC60LvQsNGB0YHQvdC40LrQuDwvdGV4dD48dGV4dCB4PSI0MDAiIHk9IjM0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QlNC10LzQviDQuNC30L7QsdGA0LDQttC10L3QuNC1IDI8L3RleHQ+PC9zdmc+',
                size: 0
            },
            {
                name: 'demo3.jpg',
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQzIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojQjQ0MTNDO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzEzMzQzQjtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNncmFkMykiLz48dGV4dCB4PSI0MDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7Qn9Cw0LzRj9GC0Lgg0L7Qv9C60LvQsNGB0YHRgzwvdGV4dD48dGV4dCB4PSI0MDAiIHk9IjM0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QlNC10LzQviDQuNC30L7QsdGA0LDQttC10L3QuNC1IDM8L3RleHQ+PC9zdmc+',
                size: 0
            },
            {
                name: 'demo4.jpg',
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQ0IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRUNFQkQ1O3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6Izk2NDMyNTtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNncmFkNCkiLz48dGV4dCB4PSI0MDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QldC00LjQvdGB0YLQstC+INGA0LDQtNC+0YHRgtGMITwvdGV4dD48dGV4dCB4PSI0MDAiIHk9IjM0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QlNC10LzQviDQuNC30L7QsdGA0LDQttC10L3QuNC1IDQ8L3RleHQ+PC9zdmc+',
                size: 0
            }
        ];
    }

    createDemoTracks() {
        return [
            {
                name: 'demo_track_1.mp3',
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEfCDSM0fPTgjMGHm7B8OOYSQwIWKrn77dnHQU6ktXzzH0vBSF+zPLalUELElyx6OyrWBUIQ5zd8sFiIAc2jdT0z4EwBSBvvvDil0oNB1mn5O+zZx0GO5PX88x+MgUie8rx2pVCCxJctejsq1gVCEOc3fLAYiAHNozU9M+AMAUgb77w4pdKDAdZpuTvs2cdBTuT1/PNfjMFI3vI8Nm',
                size: 0
            }
        ];
    }

    async loadGitHubFolder(folder) {
        const url = `https://api.github.com/repos/${this.config.github.username}/${this.config.github.repository}/contents/${folder}`;
        
        this.updateLoadingStatus(`Загружаем ${folder}...`);
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${folder}: ${response.status}`);
        }
        
        const files = await response.json();
        if (!Array.isArray(files)) {
            throw new Error(`Invalid response for ${folder}`);
        }
        
        return files
            .filter(file => file.type === 'file' && file.download_url)
            .map(file => ({
                name: file.name,
                url: file.download_url,
                size: file.size
            }));
    }

    updateLoadingStatus(message) {
        if (this.elements.loadingStatus) {
            this.elements.loadingStatus.textContent = message;
        }
    }

    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    initializeSlideshow() {
        this.elements.totalImages.textContent = this.state.images.length;
        this.elements.currentImageIndex.textContent = this.state.images.length > 0 ? '1' : '0';
        
        if (this.state.images.length > 0) {
            this.showImage(0);
            this.buildGallery();
        } else {
            this.elements.slideImage.src = '';
            this.elements.slideImage.alt = 'Изображения не найдены';
        }
    }

    initializeMusic() {
        if (this.state.tracks.length > 0) {
            this.showCurrentTrack();
        } else {
            this.elements.trackTitle.textContent = 'Музыка не найдена';
        }
    }

    showImage(index) {
        if (this.state.images.length === 0) return;

        this.state.currentImageIndex = index;
        const currentImage = this.state.images[index];
        this.elements.slideImage.src = currentImage.url;
        this.elements.slideImage.alt = currentImage.name;
        this.elements.currentImageIndex.textContent = index + 1;
        
        this.updateGallerySelection();
    }

    showCurrentTrack() {
        if (this.state.tracks.length === 0) return;

        const currentTrack = this.state.tracks[this.state.currentTrackIndex];
        const title = this.formatTrackTitle(currentTrack.name);
        this.elements.trackTitle.textContent = title;
    }

    formatTrackTitle(fileName) {
        return fileName
            .replace(/\.(mp3|ogg|wav|m4a)$/i, '')
            .replace(/[_-]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    startSlideshow() {
        if (this.state.images.length === 0) return;
        
        this.state.slideshowPlaying = true;
        if (this.elements.playPauseBtn) {
            this.elements.playPauseBtn.querySelector('.control-icon').textContent = '⏸️';
        }
        this.state.slideshowTimer = setInterval(() => {
            this.nextImage();
        }, this.config.slideshowInterval);
    }

    stopSlideshow() {
        this.state.slideshowPlaying = false;
        if (this.elements.playPauseBtn) {
            this.elements.playPauseBtn.querySelector('.control-icon').textContent = '▶️';
        }
        if (this.state.slideshowTimer) {
            clearInterval(this.state.slideshowTimer);
            this.state.slideshowTimer = null;
        }
    }

    toggleSlideshow() {
        if (this.state.slideshowPlaying) {
            this.stopSlideshow();
        } else {
            this.startSlideshow();
        }
    }

    nextImage() {
        if (this.state.images.length === 0) return;
        
        const nextIndex = (this.state.currentImageIndex + 1) % this.state.images.length;
        this.showImage(nextIndex);
    }

    previousImage() {
        if (this.state.images.length === 0) return;
        
        const prevIndex = this.state.currentImageIndex === 0 
            ? this.state.images.length - 1 
            : this.state.currentImageIndex - 1;
        this.showImage(prevIndex);
    }

    startMusic() {
        if (this.state.tracks.length === 0) return;
        
        // For demo tracks, just show the title (since we can't actually play base64 audio)
        const currentTrack = this.state.tracks[this.state.currentTrackIndex];
        if (currentTrack.url.startsWith('data:audio/')) {
            this.elements.trackTitle.textContent = this.formatTrackTitle(currentTrack.name) + ' (демо)';
            this.state.musicPlaying = true;
            return;
        }
        
        this.loadAndPlayCurrentTrack();
    }

    loadAndPlayCurrentTrack() {
        if (this.state.tracks.length === 0) return;

        const currentTrack = this.state.tracks[this.state.currentTrackIndex];
        
        // Skip demo tracks
        if (currentTrack.url.startsWith('data:audio/')) {
            return;
        }
        
        this.audioPlayer.src = currentTrack.url;
        this.audioPlayer.muted = this.state.muted;
        
        this.audioPlayer.play().then(() => {
            this.state.musicPlaying = true;
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    }

    nextTrack() {
        if (this.state.tracks.length === 0) return;
        
        this.state.currentTrackIndex = (this.state.currentTrackIndex + 1) % this.state.tracks.length;
        this.showCurrentTrack();
        this.loadAndPlayCurrentTrack();
    }

    previousTrack() {
        if (this.state.tracks.length === 0) return;
        
        this.state.currentTrackIndex = this.state.currentTrackIndex === 0 
            ? this.state.tracks.length - 1 
            : this.state.currentTrackIndex - 1;
        this.showCurrentTrack();
        this.loadAndPlayCurrentTrack();
    }

    toggleMute() {
        this.state.muted = !this.state.muted;
        this.audioPlayer.muted = this.state.muted;
        if (this.elements.muteBtn) {
            this.elements.muteBtn.querySelector('.control-icon').textContent = this.state.muted ? '🔇' : '🔊';
        }
    }

    onTrackEnded() {
        this.nextTrack();
    }

    onTrackError(e) {
        console.error('Audio error:', e);
        setTimeout(() => {
            if (this.state.tracks.length > 1) {
                this.nextTrack();
            }
        }, 2000);
    }

    buildGallery() {
        if (!this.elements.galleryGrid) return;
        
        this.elements.galleryGrid.innerHTML = '';
        
        this.state.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'gallery-thumbnail';
            thumbnail.innerHTML = `<img src="${image.url}" alt="${image.name}" loading="lazy">`;
            
            thumbnail.addEventListener('click', () => {
                this.showImage(index);
                this.closeGallery();
            });
            
            this.elements.galleryGrid.appendChild(thumbnail);
        });
    }

    updateGallerySelection() {
        if (!this.elements.galleryGrid) return;
        
        const thumbnails = this.elements.galleryGrid.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === this.state.currentImageIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    openGallery() {
        if (this.state.images.length === 0) return;
        
        this.elements.galleryOverlay.classList.remove('hidden');
        this.updateGallerySelection();
    }

    closeGallery() {
        this.elements.galleryOverlay.classList.add('hidden');
    }

    handleKeyboard(e) {
        if (!this.elements.passwordScreen.classList.contains('hidden') ||
            !this.elements.loadingScreen.classList.contains('hidden') ||
            !this.elements.errorOverlay.classList.contains('hidden')) {
            return;
        }

        if (!this.elements.galleryOverlay.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                this.closeGallery();
            }
            return;
        }

        switch (e.key) {
            case ' ':
                e.preventDefault();
                this.toggleSlideshow();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextImage();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousImage();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.previousTrack();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.nextTrack();
                break;
            case 'm':
            case 'M':
                this.toggleMute();
                break;
            case 'g':
            case 'G':
                this.openGallery();
                break;
            case 'Escape':
                this.closeGallery();
                break;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SlideshowApp();
});