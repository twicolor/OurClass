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
            slideshowInterval: 5000
        };

        this.state = {
            images: [],
            tracks: [],
            currentImageIndex: 0,
            currentTrackIndex: 0,
            slideshowPlaying: false,
            musicPlaying: false,
            muted: false,
            slideshowTimer: null
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

        // Password form
        this.elements.passwordForm = document.getElementById('passwordForm');
        this.elements.passwordInput = document.getElementById('passwordInput');
        this.elements.passwordError = document.getElementById('passwordError');

        // Loading
        this.elements.loadingStatus = document.getElementById('loadingStatus');

        // Slideshow
        this.elements.slideImage = document.getElementById('slideImage');
        this.elements.currentImageIndex = document.getElementById('currentImageIndex');
        this.elements.totalImages = document.getElementById('totalImages');

        // Controls
        this.elements.playPauseBtn = document.getElementById('playPauseBtn');
        this.elements.prevImageBtn = document.getElementById('prevImageBtn');
        this.elements.nextImageBtn = document.getElementById('nextImageBtn');
        this.elements.prevTrackBtn = document.getElementById('prevTrackBtn');
        this.elements.musicPlayPauseBtn = document.getElementById('musicPlayPauseBtn');
        this.elements.nextTrackBtn = document.getElementById('nextTrackBtn');
        this.elements.muteBtn = document.getElementById('muteBtn');
        this.elements.galleryBtn = document.getElementById('galleryBtn');

        // Music info
        this.elements.trackTitle = document.getElementById('trackTitle');

        // Gallery
        this.elements.galleryModal = document.getElementById('galleryModal');
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

        // Control buttons
        this.elements.playPauseBtn.addEventListener('click', () => this.toggleSlideshow());
        this.elements.prevImageBtn.addEventListener('click', () => this.previousImage());
        this.elements.nextImageBtn.addEventListener('click', () => this.nextImage());
        this.elements.prevTrackBtn.addEventListener('click', () => this.previousTrack());
        this.elements.musicPlayPauseBtn.addEventListener('click', () => this.toggleMusic());
        this.elements.nextTrackBtn.addEventListener('click', () => this.nextTrack());
        this.elements.muteBtn.addEventListener('click', () => this.toggleMute());
        this.elements.galleryBtn.addEventListener('click', () => this.openGallery());

        // Gallery
        this.elements.closeGalleryBtn.addEventListener('click', () => this.closeGallery());
        this.elements.galleryModal.addEventListener('click', (e) => {
            if (e.target === this.elements.galleryModal) {
                this.closeGallery();
            }
        });

        // Audio events
        this.audioPlayer.addEventListener('ended', () => this.onTrackEnded());
        this.audioPlayer.addEventListener('error', (e) => this.onTrackError(e));

        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    showPasswordScreen() {
        this.elements.passwordScreen.classList.remove('hidden');
        this.elements.loadingScreen.classList.add('hidden');
        this.elements.mainApp.classList.add('hidden');
        setTimeout(() => {
            this.elements.passwordInput.focus();
        }, 100);
    }

    showLoadingScreen() {
        this.elements.passwordScreen.classList.add('hidden');
        this.elements.loadingScreen.classList.remove('hidden');
        this.elements.mainApp.classList.add('hidden');
    }

    showMainApp() {
        this.elements.passwordScreen.classList.add('hidden');
        this.elements.loadingScreen.classList.add('hidden');
        this.elements.mainApp.classList.remove('hidden');
    }

    handlePasswordSubmit() {
        const password = this.elements.passwordInput.value;
        
        console.log('Password entered:', password);
        console.log('Expected password:', this.config.password);
        
        if (password === this.config.password) {
            this.elements.passwordError.classList.add('hidden');
            this.showLoadingScreen();
            this.loadContent();
        } else {
            this.elements.passwordError.classList.remove('hidden');
            this.elements.passwordInput.value = '';
            setTimeout(() => {
                this.elements.passwordInput.focus();
            }, 100);
        }
    }

    async loadContent() {
        // Load images and music in parallel
        const loadingPromises = [
            this.fetchImages(),
            this.fetchMusic()
        ];

        try {
            this.updateLoadingStatus('Загружаем изображения...');
            await new Promise(resolve => setTimeout(resolve, 500)); // Show loading for at least 500ms
            
            this.updateLoadingStatus('Загружаем музыку...');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const [images, tracks] = await Promise.all(loadingPromises);
            
            this.updateLoadingStatus('Подготавливаем контент...');
            
            // Shuffle arrays
            this.state.images = this.shuffle(images);
            this.state.tracks = this.shuffle(tracks);
            
            // Add some demo content if GitHub API fails
            if (this.state.images.length === 0) {
                this.state.images = this.createDemoImages();
            }
            
            if (this.state.tracks.length === 0) {
                this.state.tracks = this.createDemoTracks();
            }

            this.updateLoadingStatus('Запускаем приложение...');
            await new Promise(resolve => setTimeout(resolve, 500));
            
        } catch (error) {
            console.error('Error loading content:', error);
            this.updateLoadingStatus('Ошибка загрузки. Используем демо контент...');
            
            // Use demo content
            this.state.images = this.createDemoImages();
            this.state.tracks = this.createDemoTracks();
            
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Initialize UI and show main app
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
    }

    createDemoImages() {
        return [
            {
                name: 'demo1.jpg',
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQxIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMUZCOENEO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzVEODc4RjtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNncmFkMSkiLz48dGV4dCB4PSI0MDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QndCw0YggwrrQu9Cw0YHRgTwvdGV4dD48dGV4dCB4PSI0MDAiIHk9IjM0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QlNC10LzQvtC90YHRgtGA0LDRhtC40Y8gMS80PC90ZXh0Pjwvc3ZnPg==',
                size: 0
            },
            {
                name: 'demo2.jpg',
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQyIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZDMTg1O3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0Q0NTU0NTtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNncmFkMikiLz48dGV4dCB4PSI0MDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QntC00L3QvtC60LvQsNGB0YHQvdC40LrQuDwvdGV4dD48dGV4dCB4PSI0MDAiIHk9IjM0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QlNC10LzQvtC90YHRgtGA0LDRhtC40Y8gMi80PC90ZXh0Pjwvc3ZnPg==',
                size: 0
            },
            {
                name: 'demo3.jpg',
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQzIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojQjQ0MTNDO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzEzMzQzQjtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNncmFkMykiLz48dGV4dCB4PSI0MDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QlNCy0L7RgNC+0LLQsNGPINC60L7QvNC80LDQvdC00LA8L3RleHQ+PHRleHQgeD0iNDAwIiB5PSIzNDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+0JTQtdC80L7QvdGB0YLRgNCw0YbQuNGPIDMvNDwvdGV4dD48L3N2Zz4=',
                size: 0
            },
            {
                name: 'demo4.jpg',
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQ0IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRUNFQkQ1O3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6Izk2NDMyNTtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNncmFkNCkiLz48dGV4dCB4PSI0MDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QktGB0LUg0LLQvNC10YHRgtC1ITwvdGV4dD48dGV4dCB4PSI0MDAiIHk9IjM0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QlNC10LzQvtC90YHRgtGA0LDRhtC40Y8gNC80PC90ZXh0Pjwvc3ZnPg==',
                size: 0
            }
        ];
    }

    createDemoTracks() {
        return [
            {
                title: 'Демо Трек 1',
                fileName: 'demo1.mp3',
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEfCDSM0fPTgjMGHm7B8OOYSQwIWKrn77dnHQU6ktXzzH0vBSF+zPLalUELElyx6OyrWBUIQ5zd8sFiIAc2jdT0z4EwBSBvvvDil0oNB1mn5O+zZx0GO5PX88x+MgUie8rx2pVCCxJctejsq1gVCEOc3fLAYiAHNozU9M+AMAUgb77w4pdKDAdZpuTvs2cdBTuT1/PNfjMFI3vI8Nm'
            },
            {
                title: 'Демо Трек 2',
                fileName: 'demo2.mp3',
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEfCDSM0fPTgjMGHm7B8OOYSQwIWKrn77dnHQU6ktXzzH0vBSF+zPLalUELElyx6OyrWBUIQ5zd8sFiIAc2jdT0z4EwBSBvvvDil0oNB1mn5O+zZx0GO5PX88x+MgUie8rx2pVCCxJctejsq1gVCEOc3fLAYiAHNozU9M+AMAUgb77w4pdKDAdZpuTvs2cdBTuT1/PNfjMFI3vI8Nm'
            },
            {
                title: 'Демо Трек 3',
                fileName: 'demo3.mp3',
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEfCDSM0fPTgjMGHm7B8OOYSQwIWKrn77dnHQU6ktXzzH0vBSF+zPLalUELElyx6OyrWBUIQ5zd8sFiIAc2jdT0z4EwBSBvvvDil0oNB1mn5O+zZx0GO5PX88x+MgUie8rx2pVCCxJctejsq1gVCEOc3fLAYiAHNozU9M+AMAUgb77w4pdKDAdZpuTvs2cdBTuT1/PNfjMFI3vI8Nm'
            }
        ];
    }

    updateLoadingStatus(message) {
        this.elements.loadingStatus.textContent = message;
    }

    async fetchImages() {
        const url = `https://api.github.com/repos/${this.config.github.username}/${this.config.github.repository}/contents/${this.config.github.imagesFolder}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) return [];
            
            const files = await response.json();
            if (!Array.isArray(files)) return [];
            
            const imageFiles = files.filter(file => 
                file.type === 'file' && 
                file.download_url &&
                /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
            );
            
            return imageFiles.map(file => ({
                name: file.name,
                url: file.download_url,
                size: file.size
            }));
        } catch (error) {
            console.error('Error fetching images:', error);
            return [];
        }
    }

    async fetchMusic() {
        const url = `https://api.github.com/repos/${this.config.github.username}/${this.config.github.repository}/contents/${this.config.github.musicFolder}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) return [];
            
            const files = await response.json();
            if (!Array.isArray(files)) return [];
            
            const musicFiles = files.filter(file => 
                file.type === 'file' && 
                file.download_url &&
                /\.(mp3|ogg|wav)$/i.test(file.name)
            );
            
            return musicFiles.map(file => ({
                title: this.formatTrackTitle(file.name),
                fileName: file.name,
                url: file.download_url
            }));
        } catch (error) {
            console.error('Error fetching music:', error);
            return [];
        }
    }

    formatTrackTitle(fileName) {
        return fileName
            .replace(/\.(mp3|ogg|wav)$/i, '')
            .replace(/[_-]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
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
            this.showCurrentImage();
            this.buildGallery();
        } else {
            this.elements.slideImage.alt = 'Изображения не найдены';
            this.disableImageControls();
        }
    }

    initializeMusic() {
        if (this.state.tracks.length > 0) {
            this.showCurrentTrack();
        } else {
            this.elements.trackTitle.textContent = 'Музыка не найдена';
            this.disableMusicControls();
        }
    }

    showCurrentImage() {
        if (this.state.images.length === 0) return;

        const currentImage = this.state.images[this.state.currentImageIndex];
        this.elements.slideImage.src = currentImage.url;
        this.elements.slideImage.alt = currentImage.name;
        this.elements.currentImageIndex.textContent = this.state.currentImageIndex + 1;
        
        this.updateGallerySelection();
    }

    showCurrentTrack() {
        if (this.state.tracks.length === 0) return;

        const currentTrack = this.state.tracks[this.state.currentTrackIndex];
        this.elements.trackTitle.textContent = currentTrack.title;
    }

    startSlideshow() {
        if (this.state.images.length === 0) return;
        
        this.state.slideshowPlaying = true;
        this.elements.playPauseBtn.querySelector('.control-icon').textContent = '⏸️';
        this.slideshowTimer = setInterval(() => {
            this.nextImage();
        }, this.config.slideshowInterval);
    }

    stopSlideshow() {
        this.state.slideshowPlaying = false;
        this.elements.playPauseBtn.querySelector('.control-icon').textContent = '▶️';
        if (this.slideshowTimer) {
            clearInterval(this.slideshowTimer);
            this.slideshowTimer = null;
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
        
        this.state.currentImageIndex = (this.state.currentImageIndex + 1) % this.state.images.length;
        this.showCurrentImage();
    }

    previousImage() {
        if (this.state.images.length === 0) return;
        
        this.state.currentImageIndex = this.state.currentImageIndex === 0 
            ? this.state.images.length - 1 
            : this.state.currentImageIndex - 1;
        this.showCurrentImage();
    }

    startMusic() {
        if (this.state.tracks.length === 0) return;
        this.loadAndPlayCurrentTrack();
    }

    loadAndPlayCurrentTrack() {
        if (this.state.tracks.length === 0) return;

        const currentTrack = this.state.tracks[this.state.currentTrackIndex];
        
        // Skip demo tracks as they won't actually play
        if (currentTrack.url.startsWith('data:audio/')) {
            this.elements.trackTitle.textContent = `${currentTrack.title} (демо)`;
            this.state.musicPlaying = true;
            this.elements.musicPlayPauseBtn.querySelector('.control-icon').textContent = '⏸️';
            return;
        }
        
        this.audioPlayer.src = currentTrack.url;
        this.audioPlayer.load();
        
        if (!this.state.muted) {
            this.audioPlayer.play().then(() => {
                this.state.musicPlaying = true;
                this.elements.musicPlayPauseBtn.querySelector('.control-icon').textContent = '⏸️';
            }).catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    }

    toggleMusic() {
        if (this.state.tracks.length === 0) return;

        if (this.state.musicPlaying) {
            this.audioPlayer.pause();
            this.state.musicPlaying = false;
            this.elements.musicPlayPauseBtn.querySelector('.control-icon').textContent = '▶️';
        } else {
            this.audioPlayer.play().then(() => {
                this.state.musicPlaying = true;
                this.elements.musicPlayPauseBtn.querySelector('.control-icon').textContent = '⏸️';
            }).catch(error => {
                console.error('Error playing audio:', error);
            });
        }
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
        this.elements.muteBtn.querySelector('.control-icon').textContent = this.state.muted ? '🔇' : '🔊';
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

    disableImageControls() {
        this.elements.playPauseBtn.disabled = true;
        this.elements.prevImageBtn.disabled = true;
        this.elements.nextImageBtn.disabled = true;
        this.elements.galleryBtn.disabled = true;
    }

    disableMusicControls() {
        this.elements.prevTrackBtn.disabled = true;
        this.elements.musicPlayPauseBtn.disabled = true;
        this.elements.nextTrackBtn.disabled = true;
        this.elements.muteBtn.disabled = true;
    }

    buildGallery() {
        this.elements.galleryGrid.innerHTML = '';
        
        this.state.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'gallery-thumbnail';
            thumbnail.innerHTML = `<img src="${image.url}" alt="${image.name}" loading="lazy">`;
            
            thumbnail.addEventListener('click', () => {
                this.state.currentImageIndex = index;
                this.showCurrentImage();
                this.closeGallery();
            });
            
            this.elements.galleryGrid.appendChild(thumbnail);
        });
    }

    updateGallerySelection() {
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
        
        this.elements.galleryModal.classList.remove('hidden');
        this.updateGallerySelection();
    }

    closeGallery() {
        this.elements.galleryModal.classList.add('hidden');
    }

    handleKeyboard(e) {
        if (!this.elements.passwordScreen.classList.contains('hidden') ||
            !this.elements.loadingScreen.classList.contains('hidden')) {
            return;
        }

        if (!this.elements.galleryModal.classList.contains('hidden')) {
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
            case 'p':
            case 'P':
                this.toggleMusic();
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