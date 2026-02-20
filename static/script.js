{
    // Инициализация
    const scenes = document.querySelectorAll('.scene');
    const dialogBox = document.getElementById('dialogBox');
    const dialogText = document.getElementById('dialogText');
    const envelope = document.getElementById('envelope');
    const loveLetter = document.getElementById('loveLetter');
    const letterDialog = document.getElementById('letterDialog');
    const photoCollage = document.getElementById('photoCollage');
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    const music = document.getElementById('backgroundMusic');

    const mikoCharacter = document.querySelector('.hatsune-miko');

    // Элементы для Лена
    const lenCharacter = document.getElementById('len');
    const lenDialog = document.getElementById('lenDialog');
    const yellowHalf = document.getElementById('yellowHalf');

    // Установка размеров canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Диалоги Хатсуне Мико
    const mikoDialogs = [
        "Привет! У меня для тебя особое послание!",
        "Ваня очень постарался для тебя!",
        "Он написал самое искреннее письмо...",
        "Готовься к самому романтическому сюрпризу!",
        "А теперь посмотри, что у меня в конверте!"
    ];

    let currentDialog = 0;

    // Функция появления Лена
    function showLen() {
        lenCharacter.classList.remove('hidden');
        lenCharacter.classList.add('show');

        lenDialog.classList.remove('hidden');
        yellowHalf.classList.remove('hidden');

        setTimeout(() => {
            const rect = envelope.getBoundingClientRect();

            document.body.appendChild(envelope);

            envelope.style.position = 'fixed';
            envelope.style.left = rect.left + 'px';
            envelope.style.top = rect.top + 'px';
            envelope.style.margin = '0';


            envelope.offsetHeight;


            envelope.classList.add('move-center');

            console.log('✨ Плавный полёт конверта в центр');
        }, 1000);
    }

    // Обработчик диалога Мико
    dialogBox.addEventListener('click', function() {
        if (currentDialog < mikoDialogs.length - 1) {
            currentDialog++;
            dialogText.textContent = mikoDialogs[currentDialog];

            // Анимация диалогового окна
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'float 3s ease-in-out infinite';
            }, 10);
        }
        else if (currentDialog === mikoDialogs.length - 1) {
            showLen();
            currentDialog++;
        }
    });

    // Открытие конверта (плавный переход)
    function openEnvelope() {
        envelope.style.zIndex = '50';

        envelope.style.opacity = '0';
        envelope.style.pointerEvents = 'none';

        const currentActiveScene = document.querySelector('.scene.active');
        currentActiveScene.style.transition = 'opacity 1.5s ease';
        currentActiveScene.style.opacity = '0';

        setTimeout(() => {
            switchScene(1);
            currentActiveScene.style.opacity = '1';
        }, 1500);
    }

    envelope.addEventListener('click', openEnvelope);

    // Показ письма
    function showLetter() {
        loveLetter.style.display = 'block';

        setTimeout(() => {
            letterDialog.style.display = 'block';
            letterDialog.style.animation = 'letterAppear 1s ease forwards';
        }, 2000);
    }

    // Переключение сцен
    function switchScene(sceneIndex) {
        scenes.forEach((scene, index) => {
            scene.classList.remove('active');
            if (index === sceneIndex) {
                setTimeout(() => {
                    scene.classList.add('active');
                    if (sceneIndex === 1) {
                        showLetter();
                    } else if (sceneIndex === 2) {
                        createPhotoCollage();
                    } else if (sceneIndex === 3) {
                        drawMathematicalHeart();
                    }
                }, 500);
            }
        });
    }

    // Продолжить к фото
    window.continueToPhotos = function () {
        switchScene(2);
    };

    // Создание коллажа с фото
    let openedPhotosCount = 0;

    function createPhotoCollage() {
        photoCollage.innerHTML = '';
        openedPhotosCount = 0;
        document.getElementById('toFinalBtn').classList.remove('show');

        const photoCount = 9;
        const photoTexts = [
            "Наша первая встреча",
            "Самый счастливый день",
            "Вместе веселее",
            "Незабываемые моменты",
            "Твоя улыбка",
            "Наше путешествие",
            "Романтический вечер",
            "Новогоднее счастье",
            "Любовь навсегда"
        ];

        for (let i = 0; i < photoCount; i++) {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.style.animation = `photoAppear 0.8s ease forwards ${i * 0.1}s`;

            const hue = Math.floor(Math.random() * 30) + 330;

            photoItem.innerHTML = `
                <div class="photo-card">
                    <div class="photo-front" style="background: linear-gradient(45deg, hsl(${hue}, 100%, 75%), hsl(${hue}, 100%, 85%));">
                        <i class="fas fa-heart" style="font-size: 40px; margin-bottom: 10px;"></i>
                        <p>${photoTexts[i]}</p>
                    </div>
                    <div class="photo-back" style="background-image: url('/static/assets/photos/${i+1}.jpg');"></div>
                </div>
            `;

            photoItem.addEventListener('click', function() {
                if (!this.classList.contains('open')) {
                    if (openedPhotosCount === 0) {
                        const collageText = document.querySelector('.collage-text');
                        if (collageText) {
                            collageText.classList.add('hide');
                        }
                    }

                    this.classList.add('open');
                    openedPhotosCount++;

                    if (openedPhotosCount === 9) {
                        document.getElementById('toFinalBtn').classList.add('show');
                    }
                }
            });

            photoCollage.appendChild(photoItem);
        }
    }

    // Переход к финалу
    window.goToFinal = function() {
        switchScene(3);
    };

    // Математическое сердце
    function drawMathematicalHeart() {
        canvas.style.display = 'block';
        resizeCanvas();

        const particles = [];
        const particleCount = 1000;

        function heartEquation(t, size) {
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            return { x: x * size, y: y * size };
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: 0,
                vy: 0,
                color: `hsl(${Math.random() * 60 + 330}, 100%, 65%)`,
                size: Math.random() * 2 + 1,
                trail: []
            });
        }

        let time = 0;
        let animationId;

        function animate() {
            ctx.fillStyle = 'rgba(139, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const heartSize = Math.min(canvas.width, canvas.height) * 0.05;

            particles.forEach((particle, index) => {
                const t = (index / particles.length) * Math.PI * 2 + time;
                const target = heartEquation(t, heartSize);

                const dx = target.x + centerX - particle.x;
                const dy = target.y + centerY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                particle.vx += dx / distance * 0.1;
                particle.vy += dy / distance * 0.1;

                particle.vx *= 0.95;
                particle.vy *= 0.95;

                particle.x += particle.vx;
                particle.y += particle.vy;

                particle.trail.push({x: particle.x, y: particle.y});
                if (particle.trail.length > 10) {
                    particle.trail.shift();
                }

                particle.trail.forEach((point, i) => {
                    const alpha = i / particle.trail.length;
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, particle.size * alpha, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color.replace('65%)', `${65 * alpha}%)`);
                    ctx.fill();
                });

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });

            time += 0.02;

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();

            for (let t = 0; t < Math.PI * 2; t += 0.01) {
                const point = heartEquation(t, heartSize * (1 + Math.sin(time) * 0.2));

                if (t === 0) {
                    ctx.moveTo(point.x + centerX, point.y + centerY);
                } else {
                    ctx.lineTo(point.x + centerX, point.y + centerY);
                }
            }
            ctx.closePath();
            ctx.stroke();

            animationId = requestAnimationFrame(animate);
        }

        animate();
        window.currentAnimation = animationId;

        setTimeout(() => {
            const restartBtn = document.querySelector('.restart-btn');
            if (restartBtn) {
                restartBtn.style.opacity = '1';
            }
        }, 10000);
    }

    // Музыка
    function startMusic() {
        music.volume = 0.5;
        music.play().catch(e => console.log("Автовоспроизведение заблокировано"));
    }

    window.toggleMusic = function() {
        const toggleBtn = document.getElementById('musicToggle');
        if (music.paused) {
            music.play();
            toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            music.pause();
            toggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    };

   // Альтернативный вариант - кнопка убегает от курсора на небольшое расстояние
    window.moveNoButton = function(button) {
        const buttonRect = button.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const margin = 20;

        // Генерируем смещение в пределах 100-200 пикселей в случайном направлении
        const angle = Math.random() * Math.PI * 2; // Случайный угол
        const distance = 100 + Math.random() * 100; // Расстояние от 100 до 200 пикселей

        // Вычисляем новую позицию
        let newX = buttonRect.left + Math.cos(angle) * distance;
        let newY = buttonRect.top + Math.sin(angle) * distance;

        // Ограничиваем позицию в пределах экрана
        newX = Math.max(margin, Math.min(newX, windowWidth - buttonRect.width - margin));
        newY = Math.max(margin, Math.min(newY, windowHeight - buttonRect.height - margin));

        // Вычисляем смещение для transform
        const offsetX = newX - buttonRect.left;
        const offsetY = newY - buttonRect.top;

        button.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        button.style.transition = 'transform 0.3s ease';
    };

    // Перезапуск
    window.restartScene = function() {
        if (window.currentAnimation) {
            cancelAnimationFrame(window.currentAnimation);
        }

        // Очищаем все сцены
        scenes.forEach(scene => scene.classList.remove('active'));
        scenes[0].classList.add('active');

        // Сбрасываем диалоги
        currentDialog = 0;
        dialogText.textContent = mikoDialogs[0];

        // Сбрасываем конверт - ВОЗВРАЩАЕМ ЕГО НА МЕСТО
        envelope.style.position = '';
        envelope.style.left = '';
        envelope.style.top = '';
        envelope.style.width = '';
        envelope.style.opacity = '1';
        envelope.style.pointerEvents = 'auto';
        envelope.classList.remove('move-center');
        envelope.style.zIndex = '';

        // ВОЗВРАЩАЕМ КОНВЕРТ В РУКУ МИКО
        const envelopeHand = document.querySelector('.envelope-hand');
        if (envelopeHand) {
            envelopeHand.appendChild(envelope);
        }

        // Сбрасываем Мику - убираем класс show и добавляем его снова через таймаут
        mikoCharacter.classList.remove('show');
        
        // Сбрасываем Лена и желтый фон
        yellowHalf.classList.add('hidden');
        lenCharacter.classList.remove('show');
        lenCharacter.classList.add('hidden');
        lenDialog.classList.add('hidden');

        // Скрываем письмо и диалог письма
        loveLetter.style.display = 'none';
        letterDialog.style.display = 'none';

        // Очищаем коллаж
        photoCollage.innerHTML = '';

        // Скрываем канвас
        canvas.style.display = 'none';

        // Сбрасываем opacity сцены
        document.querySelector('.scene.active').style.opacity = '1';

        // Сбрасываем текст "Наши воспоминания"
        const collageText = document.querySelector('.collage-text');
        if (collageText) {
            collageText.classList.remove('hide');
        }

        // Сбрасываем кнопку перехода к финалу
        document.getElementById('toFinalBtn').classList.remove('show');

        // Сбрасываем позицию кнопки "Нет"
        const noButton = document.querySelector('.no-btn');
        if (noButton) {
            noButton.style.transform = 'none';
        }

        // Сбрасываем анимацию диалогового окна
        dialogBox.style.animation = 'none';

        // Показываем Мику с анимацией через небольшую задержку
        setTimeout(() => {
            mikoCharacter.classList.add('show');
            dialogBox.style.animation = 'float 3s ease-in-out infinite';
        }, 200);

        console.log('Перезапуск выполнен');
    };

    // Запускаем появление Мику при загрузке
    setTimeout(() => {
        mikoCharacter.classList.add('show');
    }, 200);
}