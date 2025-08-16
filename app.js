// Конфигурация приложения
const CONFIG = {
    password: '1989',
    slideDuration: 5000, // 5 секунд
    supportedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    github: {
        username: 'twicolor',
        repository: 'OurClass',
        folder: 'images',
        api: 'https://api.github.com/repos/twicolor/OurClass/contents/images'
    },
    music: [
        {
            title: "Local Forecast - Elevator",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Local%20Forecast%20-%20Elevator.mp3"
        },
        {
            title: "Mesmerize",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Mesmerize.mp3"
        },
        {
            title: "Your Call",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Your%20Call.mp3"
        },
        {
            title: "Pennsylvania Rose",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Pennsylvania%20Rose.mp3"
        },
        {
            title: "Reunited",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Reunited.mp3"
        },
        {
            title: "And Awaken",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/And%20Awaken.mp3"
        },
        {
            title: "Dark Walk",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Dark%20Walk.mp3"
        },
        {
            title: "At Rest",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/At%20Rest.mp3"
        },
        {
            title: "Arcadia",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Arcadia.mp3"
        },
        {
            title: "Ambiment",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Ambiment.mp3"
        },
        {
            title: "Amazing Plan",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Amazing%20Plan.mp3"
        },
        {
            title: "Autumn Day",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Autumn%20Day.mp3"
        },
        {
            title: "Beach Bum",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Beach%20Bum.mp3"
        },
        {
            title: "Bicycle",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Bicycle.mp3"
        },
        {
            title: "Big Rock",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Big%20Rock.mp3"
        },
        {
            title: "Bent and Broken",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Bent%20and%20Broken.mp3"
        },
        {
            title: "Birch Run",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Birch%20Run.mp3"
        },
        {
            title: "Black Bird",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Black%20Bird.mp3"
        },
        {
            title: "Blue Feather",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Blue%20Feather.mp3"
        },
        {
            title: "Blip Stream",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Blip%20Stream.mp3"
        },
        {
            title: "Almost in F",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Almost%20in%20F.mp3"
        },
        {
            title: "Airport Lounge",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Airport%20Lounge.mp3"
        },
        {
            title: "Air Prelude",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Air%20Prelude.mp3"
        },
        {
            title: "All This",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/All%20This.mp3"
        },
        {
            title: "Americana",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Americana.mp3"
        },
        {
            title: "As I Figure",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/As%20I%20Figure.mp3"
        },
        {
            title: "Asian Drums",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Asian%20Drums.mp3"
        },
        {
            title: "At Launch",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/At%20Launch.mp3"
        },
        {
            title: "Avec Soin",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Avec%20Soin.mp3"
        },
        {
            title: "Baba Yaga",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Baba%20Yaga.mp3"
        },
        {
            title: "Babylon",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Babylon.mp3"
        },
        {
            title: "Bass Vibes",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Bass%20Vibes.mp3"
        },
        {
            title: "Bass Walker",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Bass%20Walker.mp3"
        },
        {
            title: "Bethlehem",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Bethlehem.mp3"
        },
        {
            title: "Bet You Can",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Bet%20You%20Can.mp3"
        },
        {
            title: "Big Mojo",
            artist: "Kevin MacLeod",
            url: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Big%20Mojo.mp3"
        }
    ]
};

// Глобальные переменные
let currentImageIndex = 0;
let currentMusicIndex = 0;
let isPlaying = false;
let isMuted = false;
let slideInterval = null; // Глобальный интервал для слайд-шоу
let images = [];
let shuffledMusic = [];
let playedMusicIndices = [];
let isPasswordEntered = false;
let touchStartX = 0;
let touchStartY = 0;
let hideControlsTimeout;

// Элементы DOM
let loginScreen, loadingScreen, slideshowScreen, passwordInput, loginButton;
let loginError, currentImage, imageCounter, imageLoadingIndicator;
let controlPanel, refreshImagesButton, playPauseButton, prevButton, nextButton;
let prevMusicButton, nextMusicButton, muteButton, playIcon, pauseIcon;
let soundOnIcon, soundOffIcon, musicInfo, backgroundMusic;
let galleryButton, thumbGallery, thumbnailGrid, closeGalleryButton;

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing "Наш класс" app...');
    
    // Получаем все элементы DOM
    loginScreen = document.getElementById('loginScreen');
    loadingScreen = document.getElementById('loadingScreen');
    slideshowScreen = document.getElementById('slideshowScreen');
    passwordInput = document.getElementById('passwordInput');
    loginButton = document.getElementById('loginButton');
    loginError = document.getElementById('loginError');
    currentImage = document.getElementById('currentImage');
    imageCounter = document.getElementById('imageCounter');
    imageLoadingIndicator = document.getElementById('imageLoadingIndicator');
    controlPanel = document.getElementById('controlPanel');
    refreshImagesButton = document.getElementById('refreshImagesButton');
    playPauseButton = document.getElementById('playPauseButton');
    prevButton = document.getElementById('prevButton');
    nextButton = document.getElementById('nextButton');
    prevMusicButton = document.getElementById('prevMusicButton');
    nextMusicButton = document.getElementById('nextMusicButton');
    muteButton = document.getElementById('muteButton');
    playIcon = document.getElementById('playIcon');
    pauseIcon = document.getElementById('pauseIcon');
    soundOnIcon = document.getElementById('soundOnIcon');
    soundOffIcon = document.getElementById('soundOffIcon');
    musicInfo = document.getElementById('musicInfo');
    backgroundMusic = document.getElementById('backgroundMusic');
    galleryButton = document.getElementById('galleryButton');
    thumbGallery = document.getElementById('thumbGallery');
    thumbnailGrid = document.getElementById('thumbnailGrid');
    closeGalleryButton = document.getElementById('closeGalleryButton');
    
    // Проверяем наличие ключевых элементов
    if (!loginScreen || !passwordInput || !loginButton) {
        console.error('Critical elements missing!');
        return;
    }
    
    console.log('All elements found, setting up event listeners...');
    setupEventListeners();
    
    // Рандомизируем музыку при каждом запуске
    shuffleMusic();
    
    // Фокус на поле пароля
    setTimeout(() => {
        if (passwordInput) {
            passwordInput.focus();
        }
    }, 100);
    
    console.log('App initialized successfully');
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Вход по паролю
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            console.log('Login button clicked');
            e.preventDefault();
            handleLogin();
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            console.log('Key pressed in password field:', e.key);
            if (e.key === 'Enter') {
                e.preventDefault();
                handleLogin();
            }
        });
        
        passwordInput.addEventListener('input', function() {
            console.log('Password input changed');
            // Скрываем сообщение об ошибке при вводе
            if (loginError && !loginError.classList.contains('hidden')) {
                loginError.classList.add('hidden');
            }
        });
    }
    
    // Управление слайд-шоу
    if (refreshImagesButton) {
        refreshImagesButton.addEventListener('click', handleRefreshImages);
    }
    if (playPauseButton) {
        playPauseButton.addEventListener('click', togglePlayPause);
    }
    if (prevButton) {
        prevButton.addEventListener('click', () => navigateSlide(-1, true)); // true = ручная навигация
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => navigateSlide(1, true)); // true = ручная навигация
    }
    if (prevMusicButton) {
        prevMusicButton.addEventListener('click', () => navigateMusic(-1));
    }
    if (nextMusicButton) {
        nextMusicButton.addEventListener('click', () => navigateMusic(1));
    }
    if (muteButton) {
        muteButton.addEventListener('click', toggleMute);
    }
    if (galleryButton) {
        galleryButton.addEventListener('click', showThumbnailGallery);
    }
    if (closeGalleryButton) {
        closeGalleryButton.addEventListener('click', hideThumbnailGallery);
    }
    
    // Сенсорное управление
    if (slideshowScreen) {
        slideshowScreen.addEventListener('touchstart', handleTouchStart, { passive: true });
        slideshowScreen.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    // Клавиатурное управление
    document.addEventListener('keydown', handleKeydown);
    
    // Скрытие/показ панели управления
    if (slideshowScreen && controlPanel) {
        function showControls() {
            if (controlPanel && !slideshowScreen.classList.contains('hidden')) {
                controlPanel.classList.remove('hidden');
                clearTimeout(hideControlsTimeout);
                hideControlsTimeout = setTimeout(() => {
                    if (isPlaying && controlPanel) {
                        controlPanel.classList.add('hidden');
                    }
                }, 4000);
            }
        }
        
        slideshowScreen.addEventListener('mousemove', showControls);
        slideshowScreen.addEventListener('touchstart', showControls);
        slideshowScreen.addEventListener('click', showControls);
    }
    
    // Обработка музыки
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5; // Установка громкости по умолчанию
        backgroundMusic.addEventListener('ended', () => navigateMusic(1));
        backgroundMusic.addEventListener('error', handleMusicError);
    }
    
    // Закрытие галереи по клику на фон
    if (thumbGallery) {
        thumbGallery.addEventListener('click', function(e) {
            if (e.target === thumbGallery) {
                hideThumbnailGallery();
            }
        });
    }
    
    console.log('Event listeners setup complete');
}

function handleLogin() {
    console.log('handleLogin called');
    
    if (!passwordInput) {
        console.error('Password input not found');
        return;
    }
    
    const enteredPassword = passwordInput.value;
    const correctPassword = CONFIG.password;
    
    console.log('Entered password:', `"${enteredPassword}"`);
    console.log('Correct password:', `"${correctPassword}"`);
    console.log('Password length entered:', enteredPassword.length);
    console.log('Password length correct:', correctPassword.length);
    console.log('Passwords match:', enteredPassword === correctPassword);
    
    if (enteredPassword === correctPassword) {
        console.log('Password correct, starting application...');
        isPasswordEntered = true;
        
        // Скрываем сообщение об ошибке если было
        if (loginError) {
            loginError.classList.add('hidden');
        }
        
        // Показываем экран загрузки
        if (loginScreen) {
            console.log('Hiding login screen');
            loginScreen.classList.add('hidden');
        }
        if (loadingScreen) {
            console.log('Showing loading screen');
            loadingScreen.classList.remove('hidden');
        }
        
        // Запускаем сканирование изображений
        setTimeout(() => {
            loadImagesAndStart();
        }, 1000);
        
    } else {
        console.log('Password incorrect');
        
        // Показываем сообщение об ошибке
        if (loginError) {
            console.log('Showing error message');
            loginError.classList.remove('hidden');
        } else {
            console.error('Error element not found');
        }
        
        // Очищаем поле пароля и фокусируемся на нем
        if (passwordInput) {
            passwordInput.value = '';
            passwordInput.focus();
        }
    }
}

async function loadImagesAndStart() {
    console.log('Loading images from GitHub...');
    
    try {
        const fetchedImages = await fetchGitHubImages();
        
        if (fetchedImages.length === 0) {
            console.log('No images found in repository');
            showTemporaryMessage('В репозитории не найдено изображений', 'error');
            // Возвращаемся к экрану входа
            setTimeout(() => {
                if (loadingScreen) loadingScreen.classList.add('hidden');
                if (loginScreen) loginScreen.classList.remove('hidden');
                if (passwordInput) {
                    passwordInput.value = '';
                    passwordInput.focus();
                }
                isPasswordEntered = false;
            }, 3000);
            return;
        }
        
        console.log('Images loaded:', fetchedImages.length);
        images = fetchedImages;
        
        // Перемешиваем изображения для случайного порядка
        shuffleArray(images);
        
        // Запускаем слайд-шоу
        startSlideshow();
        
    } catch (error) {
        console.error('Error loading images:', error);
        showTemporaryMessage('Ошибка загрузки изображений из GitHub', 'error');
        // Возвращаемся к экрану входа
        setTimeout(() => {
            if (loadingScreen) loadingScreen.classList.add('hidden');
            if (loginScreen) loginScreen.classList.remove('hidden');
            if (passwordInput) {
                passwordInput.value = '';
                passwordInput.focus();
            }
            isPasswordEntered = false;
        }, 3000);
    }
}

async function fetchGitHubImages() {
    const apiUrl = CONFIG.github.api;
    console.log('Fetching from:', apiUrl);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
        console.log('GitHub API response not ok:', response.status);
        throw new Error(`GitHub API Error: ${response.status}`);
    }
    
    const files = await response.json();
    console.log('Files received:', files.length);
    
    // Фильтруем только изображения
    const imageFiles = files.filter(file => {
        if (file.type !== 'file') return false;
        const extension = file.name.toLowerCase().split('.').pop();
        return CONFIG.supportedFormats.includes(extension);
    });
    
    console.log('Image files found:', imageFiles.length);
    
    // Возвращаем URL изображений
    return imageFiles.map(file => file.download_url);
}

function startSlideshow() {
    console.log('Starting slideshow with', images.length, 'images');
    
    if (images.length === 0) {
        showTemporaryMessage('Нет изображений для показа', 'error');
        return;
    }
    
    // Скрываем экран загрузки и показываем слайд-шоу
    if (loadingScreen) {
        console.log('Hiding loading screen');
        loadingScreen.classList.add('hidden');
    }
    if (slideshowScreen) {
        console.log('Showing slideshow screen');
        slideshowScreen.classList.remove('hidden');
    }
    
    currentImageIndex = 0;
    updateImageCounter();
    loadCurrentImage();
    
    // Запускаем музыку
    startMusic();
    
    // Автоматически запускаем слайд-шоу через 2 секунды
    setTimeout(() => {
        isPlaying = true;
        startSlideTimer();
        updatePlayPauseButton();
    }, 2000);
}

function loadCurrentImage() {
    if (images.length === 0) return;
    
    const imageUrl = images[currentImageIndex];
    console.log('Loading image:', imageUrl);
    
    if (imageLoadingIndicator) imageLoadingIndicator.classList.remove('hidden');
    
    // Создаем новый объект изображения для предзагрузки
    const img = new Image();
    
    img.onload = function() {
        console.log('Image loaded successfully');
        if (currentImage) {
            currentImage.src = imageUrl;
            currentImage.alt = `Фото ${currentImageIndex + 1} из нашего класса`;
            currentImage.style.opacity = '1';
            currentImage.classList.remove('fade-out');
        }
        if (imageLoadingIndicator) imageLoadingIndicator.classList.add('hidden');
        
        // Предзагружаем следующее изображение
        const nextIndex = (currentImageIndex + 1) % images.length;
        preloadImage(images[nextIndex]);
    };
    
    img.onerror = function() {
        console.warn('Error loading image:', imageUrl);
        if (imageLoadingIndicator) imageLoadingIndicator.classList.add('hidden');
        showTemporaryMessage('Ошибка загрузки изображения', 'error');
        
        // Пытаемся загрузить следующее изображение
        setTimeout(() => navigateSlide(1, false), 1000); // false = автоматическая навигация
    };
    
    img.src = imageUrl;
}

function preloadImage(url) {
    if (url) {
        const img = new Image();
        img.src = url;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleMusic() {
    shuffledMusic = [...CONFIG.music];
    shuffleArray(shuffledMusic);
    playedMusicIndices = [];
    currentMusicIndex = 0;
    console.log('Music shuffled, first track:', shuffledMusic[0].title);
}

function startMusic() {
    if (shuffledMusic.length === 0) return;
    
    const firstTrack = shuffledMusic[currentMusicIndex];
    if (backgroundMusic) {
        backgroundMusic.src = firstTrack.url;
        updateMusicInfo();
        
        // Попытка автозапуска музыки
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Autoplay blocked:', error);
                showTemporaryMessage('Нажмите на звук для включения музыки', 'info');
            });
        }
    }
}

// ИСПРАВЛЕННЫЕ ФУНКЦИИ СЛАЙД-ШОУ

function togglePlayPause() {
    if (images.length === 0) return;
    
    if (isPlaying) {
        stopSlideTimer();
    } else {
        startSlideTimer();
    }
}

function startSlideTimer() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    isPlaying = true;
    updatePlayPauseButton();
    
    slideInterval = setInterval(() => {
        navigateSlide(1, false); // false = автоматическая навигация
    }, CONFIG.slideDuration);
    
    console.log('Slide timer started');
}

function stopSlideTimer() {
    isPlaying = false;
    updatePlayPauseButton();
    
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
    
    console.log('Slide timer stopped');
}

function navigateSlide(direction, isManual = false) {
    if (images.length === 0) return;
    
    // Останавливаем автопроигрывание ТОЛЬКО при ручной навигации
    if (isManual && isPlaying) {
        stopSlideTimer();
    }
    
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    updateImageCounter();
    
    // Плавный переход
    if (currentImage) {
        currentImage.classList.add('fade-out');
        
        setTimeout(() => {
            loadCurrentImage();
        }, 200);
    }
    
    console.log('Navigate to image:', currentImageIndex + 1, 'Manual:', isManual);
}

function navigateMusic(direction) {
    if (shuffledMusic.length === 0) return;
    
    if (direction === 1) {
        // Следующий трек
        currentMusicIndex = (currentMusicIndex + 1) % shuffledMusic.length;
    } else {
        // Предыдущий трек
        currentMusicIndex = (currentMusicIndex - 1 + shuffledMusic.length) % shuffledMusic.length;
    }
    
    const track = shuffledMusic[currentMusicIndex];
    if (backgroundMusic && track) {
        backgroundMusic.src = track.url;
        updateMusicInfo();
        
        if (!isMuted) {
            backgroundMusic.play().catch(error => {
                console.log('Music play error:', error);
                handleMusicError();
            });
        }
    }
    
    console.log('Navigate to music:', track.title);
}

function toggleMute() {
    isMuted = !isMuted;
    if (backgroundMusic) {
        backgroundMusic.muted = isMuted;
    }
    updateMuteButton();
    
    if (!isMuted && backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.play().catch(console.log);
    }
    
    console.log('Mute toggled:', isMuted);
}

async function handleRefreshImages() {
    console.log('Refreshing images...');
    
    // Показываем индикатор загрузки
    if (refreshImagesButton) {
        refreshImagesButton.style.opacity = '0.5';
        refreshImagesButton.disabled = true;
    }
    
    try {
        const fetchedImages = await fetchGitHubImages();
        
        if (fetchedImages.length === 0) {
            showTemporaryMessage('В репозитории не найдено изображений', 'error');
            return;
        }
        
        images = fetchedImages;
        shuffleArray(images);
        currentImageIndex = 0;
        updateImageCounter();
        loadCurrentImage();
        
        showTemporaryMessage(`Обновлено: ${images.length} изображений`, 'success');
        
        // Перезапускаем слайд-шоу: isPlaying=true; stopSlideTimer(); startSlideTimer();
        stopSlideTimer();
        isPlaying = true;
        setTimeout(() => {
            startSlideTimer();
        }, 1000);
        
    } catch (error) {
        console.error('Error refreshing images:', error);
        showTemporaryMessage('Ошибка обновления изображений', 'error');
    } finally {
        if (refreshImagesButton) {
            refreshImagesButton.style.opacity = '1';
            refreshImagesButton.disabled = false;
        }
    }
}

// ФУНКЦИИ ГАЛЕРЕИ МИНИАТЮР

function showThumbnailGallery() {
    if (images.length === 0) return;
    
    console.log('Showing thumbnail gallery');
    
    // Создаем сетку миниатюр
    generateThumbnailGrid();
    
    // Показываем галерею
    if (thumbGallery) {
        thumbGallery.classList.remove('hidden');
    }
    
    // Временно останавливаем слайд-шоу
    if (isPlaying) {
        stopSlideTimer();
    }
}

function hideThumbnailGallery() {
    console.log('Hiding thumbnail gallery');
    
    if (thumbGallery) {
        thumbGallery.classList.add('hidden');
    }
    
    // Возобновляем слайд-шоу если оно было запущено
    if (!isPlaying) {
        startSlideTimer();
    }
}

function generateThumbnailGrid() {
    if (!thumbnailGrid || images.length === 0) return;
    
    // Очищаем предыдущие миниатюры
    thumbnailGrid.innerHTML = '';
    
    images.forEach((imageUrl, index) => {
        const thumbItem = document.createElement('div');
        thumbItem.className = 'thumbnail-item';
        if (index === currentImageIndex) {
            thumbItem.classList.add('current');
        }
        
        thumbItem.innerHTML = `
            <div class="loading-placeholder">Загрузка...</div>
            <div class="thumbnail-index">${index + 1}</div>
        `;
        
        // Добавляем обработчик клика
        thumbItem.addEventListener('click', () => {
            selectThumbnail(index);
        });
        
        // Загружаем миниатюру
        const img = new Image();
        img.onload = function() {
            thumbItem.querySelector('.loading-placeholder').remove();
            thumbItem.appendChild(img);
        };
        img.onerror = function() {
            thumbItem.querySelector('.loading-placeholder').textContent = 'Ошибка';
        };
        img.src = imageUrl;
        
        thumbnailGrid.appendChild(thumbItem);
    });
}

function selectThumbnail(index) {
    console.log('Thumbnail selected:', index + 1);
    
    // Переключаемся на выбранное изображение
    currentImageIndex = index;
    updateImageCounter();
    loadCurrentImage();
    
    // Закрываем галерею
    hideThumbnailGallery();
    
    // Продолжаем слайд-шоу
    setTimeout(() => {
        if (!isPlaying) {
            startSlideTimer();
        }
    }, 500);
}

function updateImageCounter() {
    if (imageCounter && images.length > 0) {
        imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    }
}

function updatePlayPauseButton() {
    if (playIcon && pauseIcon) {
        if (isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }
}

function updateMuteButton() {
    if (soundOnIcon && soundOffIcon) {
        if (isMuted) {
            soundOnIcon.style.display = 'none';
            soundOffIcon.style.display = 'block';
        } else {
            soundOnIcon.style.display = 'block';
            soundOffIcon.style.display = 'none';
        }
    }
}

function updateMusicInfo() {
    if (shuffledMusic.length === 0 || !musicInfo) return;
    
    const currentTrack = shuffledMusic[currentMusicIndex];
    const titleElement = musicInfo.querySelector('.music-title');
    const artistElement = musicInfo.querySelector('.music-artist');
    
    if (titleElement && artistElement && currentTrack) {
        titleElement.textContent = currentTrack.title;
        artistElement.textContent = currentTrack.artist;
    }
}

function handleMusicError() {
    console.warn('Music error, trying next track...');
    setTimeout(() => {
        navigateMusic(1);
    }, 1000);
}

// Обработка сенсорного управления
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Проверяем, что это горизонтальный свайп
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            navigateSlide(-1, true); // Свайп вправо - предыдущее фото (ручная навигация)
        } else {
            navigateSlide(1, true);  // Свайп влево - следующее фото (ручная навигация)
        }
    }
    
    touchStartX = 0;
    touchStartY = 0;
}

// Клавиатурное управление
function handleKeydown(e) {
    if (!isPasswordEntered) {
        // Если пароль не введен, обрабатываем только экран входа
        if (!loginScreen || loginScreen.classList.contains('hidden')) return;
        
        if (e.key === 'Enter') {
            e.preventDefault();
            handleLogin();
        }
        return;
    }
    
    // Если открыта галерея
    if (thumbGallery && !thumbGallery.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            e.preventDefault();
            hideThumbnailGallery();
        }
        return;
    }
    
    if (slideshowScreen && !slideshowScreen.classList.contains('hidden')) {
        switch(e.key) {
            case ' ':
            case 'Enter':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigateSlide(-1, true); // ручная навигация
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateSlide(1, true); // ручная навигация
                break;
            case 'ArrowUp':
                e.preventDefault();
                navigateMusic(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                navigateMusic(1);
                break;
            case 'm':
            case 'M':
                toggleMute();
                break;
            case 'r':
            case 'R':
                handleRefreshImages();
                break;
            case 'g':
            case 'G':
                showThumbnailGallery();
                break;
        }
    }
}

// Утилиты для сообщений
function showTemporaryMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `temporary-message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutUp 0.3s ease-in forwards';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 3000);
}

// Дополнительная инициализация при загрузке
window.addEventListener('load', function() {
    console.log('Window loaded');
    // Дополнительная проверка фокуса на поле пароля
    if (passwordInput && !passwordInput.value) {
        passwordInput.focus();
    }
});

console.log('Наш класс app script loaded successfully');