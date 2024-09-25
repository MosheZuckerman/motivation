const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const forwardButton = document.getElementById('forward');
const backButton = document.getElementById('back');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const progressBar = document.querySelector('.progress-bar');

const enLyrics = document.getElementById('en-lyrics');
const heLyrics = document.getElementById('he-lyrics');

const lyricsEn = [
    { 
        startTime: 12, 
        text: `That's life (That's life), that's what all the people say.
        You're riding high in April, shot down in May.
        But I know I'm gonna change that tune.
        When I'm back on top, back on top in June.` 
    },
    { 
        startTime: 37, 
        text: `I said, that's life (That's life), and as funny as it may seem.
        Some people get their kicks stompin' on a dream.
        But I don't let it, let it get me down.
        'Cause this fine old world, it keeps spinning around.` 
    },
    { 
        startTime: 63, 
        text: `I've been a puppet, a pauper, a pirate, a poet, a pawn and a king.
        I've been up and down and over and out, and I know one thing.
        Each time I find myself flat on my face.
        I pick myself up and get back in the race.` 
    },
    { 
        startTime: 90, 
        text: `That's life (That's life), I tell ya, I can't deny it.
        I thought of quitting, baby. But my heart just ain't gonna buy it.
        And if I didn't think it was worth one single try.
        I'd jump right on a big bird and then I'd fly.` 
    },
    { 
        startTime: 116, 
        text: `I've been a puppet, a pauper, a pirate, a poet, a pawn and a king.
        I've been up and down and over and out, and I know one thing.
        Each time I find myself laying flat on my face.
        I just pick myself up and get back in the race.` 
    },
    { 
        startTime: 142, 
        text: `That's life (That's life), that's life and I can't deny it.
        Many times I thought of cutting out but my heart won't buy it.
        But if there's nothing shaking come this here July.
        I'm gonna roll myself up in a big ball and die.
        My, my.` 
    }
];

const lyricsHe = [
    { 
        startTime: 12, 
        text: `זה החיים (זה החיים), זה מה שכולם אומרים.
        אתה על גובה באפריל, נופל במאי.
        אבל אני יודע שאשנה את המנגינה הזאת.
        כשאחזור לראש, אחזור לראש ביוני.` 
    },
    { 
        startTime: 37, 
        text: `אמרתי, זה החיים (זה החיים), וכמה שזה מצחיק אולי.
        יש כאלה שמקבלים הנאה מלרמוס חלום.
        אבל אני לא נותן לזה להפיל אותי.
        כי העולם הזה ממשיך להסתובב.` 
    },
    { 
        startTime: 63, 
        text: `הייתי בובה, קבצן, פיראט, משורר, רגליים וראש.
        עליתי וירדתי, הייתי למעלה ולמטה, ואני יודע דבר אחד.
        בכל פעם שאני מוצא את עצמי על הקרקע.
        אני קם בחזרה לתוך המרוץ.` 
    },
    { 
        startTime: 90, 
        text: `זה החיים (זה החיים), אני אומר לך, אני לא יכול להכחיש את זה.
        חשבתי לפרוש, מותק.
        אבל הלב שלי פשוט לא קונה את זה.
        ואם הייתי חושב שזה לא שווה לנסות.
        הייתי קופץ על ציפור גדולה ועף.` 
    },
    { 
        startTime: 116, 
        text: `הייתי בובה, קבצן, פיראט, משורר, רגליים וראש.
        עליתי וירדתי, הייתי למעלה ולמטה, ואני יודע דבר אחד.
        בכל פעם שאני מוצא את עצמי על הקרקע.
        אני פשוט קם בחזרה לתוך המרוץ.` 
    },
    { 
        startTime: 142, 
        text: `זה החיים (זה החיים), זה החיים ואני לא יכול להכחיש את זה.
        הרבה פעמים חשבתי לחתוך אבל הלב שלי לא יקנה את זה.
        אבל אם לא יקרה כלום עד יולי הזה.
        אני הולך לגלגל את עצמי בכדור גדול ולמות.
        אוי, אוי.` 
    }
];

let lastDisplayedEnIndex = -1; // Keep track of the last displayed English lyric
let lastDisplayedHeIndex = -1; // Keep track of the last displayed Hebrew lyric

function updateLyrics() {
    const currentTime = audioPlayer.currentTime;
    console.log("Current Time:", currentTime); // Debugging line

    // Update English lyrics
    for (let i = 0; i < lyricsEn.length; i++) {
        if (currentTime >= lyricsEn[i].startTime) {
            if (i !== lastDisplayedEnIndex) {
                lastDisplayedEnIndex = i;
                enLyrics.innerHTML = lyricsEn[i].text.replace(/\n/g, '<br>'); // Use innerHTML to display line breaks
                console.log("Displaying English Lyric:", lyricsEn[i].text); // Debugging line
                console.log("Current Lyric EN Index:", i); // Log the current lyric index
            }
        }
    }

    // Update Hebrew lyrics
    for (let i = 0; i < lyricsHe.length; i++) {
        if (currentTime >= lyricsHe[i].startTime) {
            if (i !== lastDisplayedHeIndex) {
                lastDisplayedHeIndex = i;
                heLyrics.innerHTML = lyricsHe[i].text.replace(/\n/g, '<br>'); // Use innerHTML to display line breaks
                console.log("Displaying Hebrew Lyric:", lyricsHe[i].text); // Debugging line
                console.log("Current Lyric HE Index:", i); // Log the current lyric index
            }
        }
    }

    // Update progress bar and current time display
    progressBar.style.width = (currentTime / audioPlayer.duration) * 100 + '%';
    currentTimeDisplay.textContent = formatTime(currentTime);
}

// Sync lyrics with the audio
audioPlayer.addEventListener('timeupdate', updateLyrics);

// Play and Pause buttons
playButton.addEventListener('click', () => audioPlayer.play());
pauseButton.addEventListener('click', () => audioPlayer.pause());

// Forward and Back buttons
forwardButton.addEventListener('click', () => audioPlayer.currentTime += 10);
backButton.addEventListener('click', () => audioPlayer.currentTime -= 10);

// Display current time and duration
audioPlayer.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
    console.log("Audio Duration:", audioPlayer.duration); // Debugging line
});

// Sync progress bar with time
progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

// Format time as mm:ss
function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';  // Handle when duration is not available
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}