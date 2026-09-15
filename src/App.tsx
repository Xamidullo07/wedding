import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Heart,
  MapPin,
  Clock,
  CalendarDays,
  Flower2,
  ChevronDown,
  Sparkles,
  LockKeyhole,
  ArrowRight,
  Music2,
  Pause,
  Play,
} from 'lucide-react';

const WEDDING_DATE = new Date('2026-09-15T17:00:00');

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return { days, hours, minutes, seconds };
}

function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-px w-20 sm:w-32 gold-divider opacity-60" />
      <Flower2 className="w-5 h-5 text-gold-400" strokeWidth={1.2} />
      <div className="h-px w-20 sm:w-32 gold-divider opacity-60" />
    </div>
  );
}

function CountdownUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const padded = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg border border-gold-300/50 bg-cream-100/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <span className="font-serif text-2xl sm:text-4xl text-gold-700 tabular-nums">
            {padded}
          </span>
        </div>

        <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-gold-400 rounded-tl-lg" />

        <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-gold-400 rounded-br-lg" />
      </div>

      <span className="mt-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-sage-600 font-sans">
        {label}
      </span>
    </div>
  );
}

function FallingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 7.3 + 5) % 100}%`,
        delay: `${(i * 0.9) % 12}s`,
        duration: `${10 + (i % 5) * 2}s`,
        size: 8 + (i % 4) * 4,
        opacity: 0.25 + (i % 3) * 0.12,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2C14 8 20 10 18 16C16 22 12 20 12 20C12 20 8 22 6 16C4 10 10 8 12 2Z"
              fill="#dcb873"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* =========================
   HAQIQIY MP3 MUSIQA
   ========================= */

function useWeddingMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // public/musiqa.mp3 faylidan foydalanadi
    const audio = new Audio('/musiqa.mp3');

    // Musiqa tugagandan keyin qayta boshlanadi
    audio.loop = true;

    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.currentTime = 0;

      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);

      audioRef.current = null;
    };
  }, []);

  const start = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Musiqa ishga tushmadi:', error);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggle = async () => {
    if (isPlaying) {
      pause();
    } else {
      await start();
    }
  };

  return {
    isPlaying,
    start,
    pause,
    toggle,
  };
}

function InvitationCover({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="invitation-cover fixed inset-0 z-50 min-h-screen overflow-hidden text-cream-50">
      <img
        src="https://images.pexels.com/photos/1381690/pexels-photo-1381690.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Moody lilac flowers"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-[#0d0b18]/80" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(112,89,139,0.5),transparent_38%),linear-gradient(180deg,rgba(17,14,31,0.25),#0c0a14_96%)]" />

      <div className="cover-petal cover-petal-one" />
      <div className="cover-petal cover-petal-two" />
      <div className="cover-petal cover-petal-three" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="animate-fade-in font-sans text-[10px] font-medium uppercase tracking-[0.42em] text-gold-300 sm:text-xs">
          Sizga taklifnoma yuborildi
        </p>

        <h1 className="mt-7 max-w-3xl font-serif text-4xl leading-[1.08] text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
          Xamidullo{' '}
          <span className="font-cursive text-5xl text-gold-300 sm:text-7xl">
            &amp;
          </span>
          <br />
          Sevinch
        </h1>

        <div className="my-7 flex items-center gap-5 text-gold-300/80">
          <span className="h-px w-14 bg-gold-300/60 sm:w-24" />

          <span className="font-sans text-xs tracking-[0.35em] text-cream-100">
            15 · 09 · 2026
          </span>

          <span className="h-px w-14 bg-gold-300/60 sm:w-24" />
        </div>

        <p className="max-w-md font-garamond text-base italic leading-relaxed text-cream-100/85 sm:text-xl">
          «Ba'zi uchrashuvlar tasodif emas, ular butun bir umrga yozilgan go'zal hikoyaning boshlanishidir.»
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="open-invitation-button mt-12 flex items-center gap-3 rounded-full border border-gold-300/70 bg-white/10 py-1 pl-1 pr-5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold-300/70 sm:text-xs"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-sage-900 shadow-lg">
            <LockKeyhole className="h-5 w-5" strokeWidth={1.8} />
          </span>

          <span>Ochish uchun bosing</span>

          <ArrowRight
            className="h-4 w-4 text-gold-300"
            strokeWidth={1.5}
          />
        </button>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 text-center font-sans text-[9px] uppercase tracking-[0.35em] text-white/40">
        Xamidullo &amp; Sevinch
      </div>
    </section>
  );
}

function App() {
  const [isOpened, setIsOpened] = useState(false);

  const { days, hours, minutes, seconds } =
    useCountdown(WEDDING_DATE);

  const { isPlaying, start, toggle } =
    useWeddingMusic();

  return (
    <div className="min-h-screen bg-cream-50 text-sage-800 font-garamond relative overflow-x-hidden">

      {/* Taklifnoma hali ochilmagan */}
      {!isOpened && (
        <InvitationCover
          onOpen={() => {
            // Taklifnoma ochilganda HAQIQIY MP3 boshlanadi
            start();

            setIsOpened(true);
          }}
        />
      )}

      {/* Musiqa tugmasi */}
      {isOpened && (
        <button
          type="button"
          onClick={toggle}
          aria-label={
            isPlaying
              ? 'Musiqani to‘xtatish'
              : 'Musiqani yoqish'
          }
          className="music-toggle fixed right-5 top-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold-300/70 bg-[#1c1630]/90 text-gold-200 shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-[#2a2145] focus:outline-none focus:ring-2 focus:ring-gold-300/70"
        >
          {isPlaying ? (
            <Pause
              className="h-5 w-5"
              strokeWidth={1.6}
            />
          ) : (
            <Play
              className="ml-0.5 h-5 w-5"
              strokeWidth={1.6}
            />
          )}

          <Music2
            className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-gold-400 p-0.5 text-[#1c1630]"
            strokeWidth={2}
          />
        </button>
      )}

      <FallingPetals />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/32476128/pexels-photo-32476128.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Elegant floral wedding decoration"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-cream-50/75" />

          <div className="absolute inset-0 bg-gradient-to-b from-cream-50/40 via-cream-50/60 to-cream-50" />
        </div>

        <div className="relative z-10 text-center max-w-3xl animate-fade-in">
          <p className="font-sans text-sm uppercase tracking-[0.35em] text-gold-600 mb-6">
            Bizning quvonchimizda ulashing
          </p>

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 gold-divider opacity-70" />

            <Sparkles
              className="w-5 h-5 text-gold-400"
              strokeWidth={1.2}
            />

            <div className="h-px w-16 gold-divider opacity-70" />
          </div>

          <p className="font-cursive text-2xl sm:text-3xl text-sage-600 mb-2">
            Biz nikohlanmoqchimiz
          </p>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-gold-gradient leading-tight mb-4">
            Xamidullo
          </h1>

          <p className="font-cursive text-4xl sm:text-5xl text-sage-500 mb-4">
            &amp;
          </p>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-gold-gradient leading-tight mb-8">
            Sevinch
          </h1>

          <p className="font-garamond text-lg sm:text-xl text-sage-700 italic max-w-xl mx-auto leading-relaxed">
            «Ikki yurak bir bo'lib birlashganda, muhabbat hikoyasi boshlanadi»
          </p>

          <div className="mt-12 animate-bounce">
            <ChevronDown
              className="w-6 h-6 text-gold-500 mx-auto"
              strokeWidth={1.2}
            />
          </div>
        </div>
      </section>

      {/* Invitation */}
      <section className="relative px-6 py-24 max-w-3xl mx-auto text-center animate-fade-up">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">
          Hurmatli mehmonlar
        </p>

        <h2 className="font-serif text-3xl sm:text-5xl text-sage-800 mb-6">
          Sizni bizning to'yimizga taklif qilamiz
        </h2>

        <OrnamentDivider />

        <p className="font-garamond text-lg sm:text-xl text-sage-600 leading-relaxed max-w-2xl mx-auto">
          Hayotimizdagi eng quvonchli kunda aziz do'st va yaqinlarimiz bilan
          birga bo'lishni istaymiz. To'y bayramonimizga kelib, quvonchimizda
          ulashingizdan cheksiz minnatdormiz bo'lamiz.
        </p>
      </section>

      {/* Date & Time */}
      <section className="relative px-6 py-16 max-w-2xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-6">

          <div className="bg-white/60 backdrop-blur-sm border border-gold-200/60 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <CalendarDays
              className="w-8 h-8 text-gold-500 mx-auto mb-4"
              strokeWidth={1.2}
            />

            <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage-500 mb-2">
              Sana
            </p>

            <p className="font-serif text-2xl sm:text-3xl text-gold-700">
              15 Sentyabr 2026
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-gold-200/60 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <Clock
              className="w-8 h-8 text-gold-500 mx-auto mb-4"
              strokeWidth={1.2}
            />

            <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage-500 mb-2">
              Vaqt
            </p>

            <p className="font-serif text-2xl sm:text-3xl text-gold-700">
              17:00 da
            </p>
          </div>

        </div>
      </section>

      {/* Venue */}
      <section className="relative px-6 py-16 max-w-3xl mx-auto text-center">
        <OrnamentDivider />

        <MapPin
          className="w-10 h-10 text-gold-500 mx-auto mb-6"
          strokeWidth={1.1}
        />

        <p className="font-sans text-xs uppercase tracking-[0.3em] text-sage-500 mb-4">
          Manzil
        </p>

        <h3 className="font-serif text-2xl sm:text-4xl text-sage-800 mb-3">
          Yulduz To'yxonasi
        </h3>

        <p className="font-garamond text-lg sm:text-xl text-sage-600 leading-relaxed">
          Toshkent viloyati, Parkent tumani
        </p>

        <p className="font-garamond text-base text-sage-500 mt-1">
          2-qavat
        </p>
      </section>

      {/* Countdown */}
      <section className="relative px-6 py-20 max-w-3xl mx-auto text-center">
        <OrnamentDivider />

        <p className="font-cursive text-3xl text-sage-600 mb-3">
          Boshlanishiga
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl text-gold-700 mb-10">
          qoldi
        </h3>

        <div className="flex justify-center gap-4 sm:gap-8">
          <CountdownUnit value={days} label="Kun" />
          <CountdownUnit value={hours} label="Soat" />
          <CountdownUnit value={minutes} label="Daqiqa" />
          <CountdownUnit value={seconds} label="Soniya" />
        </div>
      </section>

      {/* Quote */}
      <section className="relative px-6 py-24 max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <Heart
            className="w-12 h-12 text-gold-400 animate-float"
            strokeWidth={1}
            fill="currentColor"
          />
        </div>

        <p className="font-cursive text-2xl sm:text-3xl text-gold-gradient leading-relaxed mb-4">
          «Sevgi — bu ikki kishining bir-biriga bergan va'dasi»
        </p>

        <p className="font-sans text-sm uppercase tracking-[0.25em] text-sage-500 mt-6">
          Xamidullo & Sevinch
        </p>
      </section>

      {/* Closing note */}
      <section className="relative isolate overflow-hidden bg-[#1c1630] px-6 py-28 text-center text-white sm:py-36">

        <div className="absolute left-[15%] top-16 h-1 w-1 rounded-full bg-gold-300/70" />

        <div className="absolute right-[14%] top-36 h-1 w-1 rounded-full bg-gold-300/50" />

        <div className="absolute bottom-24 left-[8%] h-1 w-1 rounded-full bg-gold-300/40" />

        <div className="absolute bottom-12 right-[20%] h-1 w-1 rounded-full bg-gold-300/40" />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(93,73,125,0.48),transparent_42%),radial-gradient(circle_at_15%_86%,rgba(79,60,108,0.18),transparent_28%)]" />

        <p className="font-cursive text-4xl text-gold-200 sm:text-5xl">
          Hurmat bilan
        </p>

        <div className="mx-auto mt-10 flex max-w-sm justify-center gap-6">

          <div className="flex h-36 w-32 flex-col items-center justify-center rounded-2xl border border-gold-400/40 bg-white/[0.035] shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition-transform hover:-translate-y-1 sm:h-40 sm:w-36">

            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f6df9b] via-gold-300 to-gold-600 font-serif text-2xl text-[#2a203d] shadow-inner sm:h-[68px] sm:w-[68px]">
              X
            </span>

            <span className="mt-4 font-cursive text-xl text-cream-100">
              Xamidullo
            </span>

          </div>

          <div className="flex h-36 w-32 flex-col items-center justify-center rounded-2xl border border-gold-400/40 bg-white/[0.035] shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition-transform hover:-translate-y-1 sm:h-40 sm:w-36">

            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f6df9b] via-gold-300 to-gold-600 font-serif text-2xl text-[#2a203d] shadow-inner sm:h-[68px] sm:w-[68px]">
              S
            </span>

            <span className="mt-4 font-cursive text-xl text-cream-100">
              Sevinch
            </span>

          </div>

        </div>

        <p className="mx-auto mt-12 max-w-md font-garamond text-lg leading-relaxed text-white/65 sm:text-xl">
          Sizni Xamidullo va Sevinchning nikoh to‘yining aziz mehmoni bo‘lishga taklif qilamiz. Qalblar ezgulikka to‘la bo‘lgan ushbu qutlug‘ kunda yaqinlarimiz yonida bo‘ling!
        </p>

        <div className="mx-auto mt-24 h-14 w-px bg-gradient-to-b from-gold-300/80 to-transparent" />
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gold-300/20 bg-[#1c1630] px-6 py-16 text-center text-white">

        <Flower2
          className="w-8 h-8 text-gold-400 mx-auto mb-4"
          strokeWidth={1.1}
        />

        <p className="font-cursive text-2xl text-sage-600 mb-2">
          Xamidullo & Sevinch
        </p>

        <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage-400">
          15.09.2026
        </p>

      </footer>

    </div>
  );
}

export default App;