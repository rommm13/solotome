import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileSpreadsheet,
  Github,
  Globe2,
  Layers3,
  Monitor,
  Moon,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
} from 'lucide-react'

type ThemeMode = 'system' | 'dark' | 'light'
type EffectiveTheme = 'dark' | 'light'

const ASSET = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`} aria-label="SoloTome">
      <span className="brand-mark__icon"><BookOpen strokeWidth={1.35} /></span>
      {!compact && <span className="brand-mark__word">SoloTome</span>}
    </span>
  )
}

function ThemeButton({ mode, onChange }: { mode: ThemeMode; onChange: () => void }) {
  const icon = mode === 'system' ? <Monitor /> : mode === 'dark' ? <Moon /> : <Sun />
  const label = mode === 'system' ? 'Тема: как в системе' : mode === 'dark' ? 'Тема: тёмная' : 'Тема: светлая'
  return (
    <button className="icon-button" onClick={onChange} aria-label={label} title={`${label}. Нажмите, чтобы переключить.`}>
      {icon}
    </button>
  )
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>
}

function PhoneShot({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`phone-shot ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
      <span className="phone-shot__glint" aria-hidden="true" />
    </div>
  )
}

function ProductRail({ theme }: { theme: EffectiveTheme }) {
  const shots = theme === 'dark'
    ? [
        { src: 'dark-library.webp', title: 'Библиотека', text: 'Прочитанное, текущие книги и планы в одном спокойном каталоге.' },
        { src: 'dark-details.webp', title: 'Карточка книги', text: 'Издание, оценка и заметки остаются рядом с книгой, а не разбросаны по сервисам.' },
        { src: 'dark-recommendations.webp', title: 'Рекомендации', text: 'Не отдельная социальная лента, а необязательная подборка на основе вашей библиотеки.' },
      ]
    : [
        { src: 'light-library.webp', title: 'Библиотека', text: 'Прочитанное, текущие книги и планы в одном спокойном каталоге.' },
        { src: 'light-details.webp', title: 'Карточка книги', text: 'Издание, оценка и заметки остаются рядом с книгой, а не разбросаны по сервисам.' },
        { src: 'light-recommendations.webp', title: 'Рекомендации', text: 'Не отдельная социальная лента, а необязательная подборка на основе вашей библиотеки.' },
      ]

  return (
    <div className="product-rail">
      {shots.map((shot, index) => (
        <motion.article
          key={shot.title}
          className="product-rail__item"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-12%' }}
          style={{ '--i': index } as React.CSSProperties}
        >
          <div className="product-rail__number">0{index + 1}</div>
          <PhoneShot src={ASSET(shot.src)} alt={`SoloTome — ${shot.title}`} />
          <div className="product-rail__copy">
            <h3>{shot.title}</h3>
            <p>{shot.text}</p>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

function DataArchitecture() {
  return (
    <div className="architecture" aria-label="Схема хранения данных SoloTome">
      <div className="architecture__rail architecture__rail--one" />
      <div className="architecture__rail architecture__rail--two" />
      <div className="architecture__rail architecture__rail--gemini" />
      <motion.div className="architecture__node architecture__node--browser" whileHover={{ y: -4 }}>
        <Globe2 />
        <span>Браузер / PWA</span>
        <small>Интерфейс SoloTome</small>
      </motion.div>
      <motion.div className="architecture__node architecture__node--script" whileHover={{ y: -4 }}>
        <Layers3 />
        <span>Apps Script</span>
        <small>Личный экземпляр</small>
      </motion.div>
      <motion.div className="architecture__node architecture__node--sheet" whileHover={{ y: -4 }}>
        <FileSpreadsheet />
        <span>Google Sheets</span>
        <small>Каталог и экспорт</small>
      </motion.div>
      <motion.div className="architecture__node architecture__node--gemini" whileHover={{ y: -4 }}>
        <Sparkles />
        <span>Gemini</span>
        <small>Необязательно</small>
      </motion.div>
    </div>
  )
}

function ExportTable() {
  const rows = [
    ['Sapiens', 'Юваль Ной Харари', 'Читаю', '8.7'],
    ['Братья Карамазовы', 'Фёдор Достоевский', 'Прочитано', '9.2'],
    ['The Pragmatic Programmer', 'Andrew Hunt, David Thomas', 'Хочу', '—'],
    ['Думай медленно… решай быстро', 'Даниэль Канеман', 'Прочитано', '8.5'],
  ]
  return (
    <div className="sheet-demo">
      <div className="sheet-demo__chrome">
        <span className="sheet-demo__dot" />
        <span className="sheet-demo__dot" />
        <span className="sheet-demo__dot" />
        <span className="sheet-demo__title">SoloTome_Export</span>
      </div>
      <div className="sheet-demo__grid">
        <div className="sheet-demo__head">Название</div>
        <div className="sheet-demo__head">Автор</div>
        <div className="sheet-demo__head">Статус</div>
        <div className="sheet-demo__head">Оценка</div>
        {rows.flatMap((row, rowIndex) => row.map((cell, cellIndex) => (
          <motion.div
            className="sheet-demo__cell"
            key={`${rowIndex}-${cellIndex}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * rowIndex + 0.03 * cellIndex, duration: 0.4 }}
          >
            {cell}
          </motion.div>
        )))}
      </div>
    </div>
  )
}

function InstallSteps() {
  return (
    <div className="install-steps">
      {[
        ['01', 'Открыть', 'Откройте SoloTome на iPhone в Chrome. В браузере каталог работает и без установки.'],
        ['02', 'Добавить на экран', 'Через меню браузера добавьте SoloTome на экран «Домой».'],
        ['03', 'Запустить', 'Откройте SoloTome с домашнего экрана как отдельное веб-приложение.'],
      ].map(([n, title, text]) => (
        <div className="install-step" key={n}>
          <span>{n}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const reducedMotion = useReducedMotion()
  const [mode, setMode] = useState<ThemeMode>('system')
  const [systemTheme, setSystemTheme] = useState<EffectiveTheme>('dark')
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const saved = localStorage.getItem('solotome-theme') as ThemeMode | null
    if (saved === 'system' || saved === 'dark' || saved === 'light') setMode(saved)
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const sync = () => setSystemTheme(media.matches ? 'light' : 'dark')
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const theme: EffectiveTheme = mode === 'system' ? systemTheme : mode

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('solotome-theme', mode)
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', theme === 'dark' ? '#090909' : '#f3f1ed')
  }, [mode, theme])

  const cycleTheme = () => {
    const order: ThemeMode[] = ['system', 'dark', 'light']
    setMode(order[(order.indexOf(mode) + 1) % order.length])
  }

  const heroBook = useMemo(() => ASSET(theme === 'dark' ? 'book-dark.webp' : 'book-light.webp'), [theme])

  return (
    <div className="site-shell">
      <div className="top-grain" aria-hidden="true" />
      <header className="site-header">
        <a href="#top" className="site-header__brand"><BrandMark /></a>
        <nav className="site-nav" aria-label="Навигация по странице">
          <a href="#product">Возможности</a>
          <a href="#data">Данные</a>
          <a href="#install">Установка</a>
          <a href="#source">GitHub</a>
        </nav>
        <div className="site-header__actions">
          <ThemeButton mode={mode} onChange={cycleTheme} />
          <a className="button button--small button--solid" href="#install">Установить</a>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero__ambient hero__ambient--one" aria-hidden="true" />
          <div className="hero__ambient hero__ambient--two" aria-hidden="true" />
          <motion.div className="hero__copy" variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}><SectionEyebrow>Персональная библиотека</SectionEyebrow></motion.div>
            <motion.h1 variants={fadeUp}>SoloTome</motion.h1>
            <motion.p className="hero__tagline" variants={fadeUp}>Личный каталог книг в твоём Google-аккаунте</motion.p>
            <motion.p className="hero__lead" variants={fadeUp}>
              Прочитанные и запланированные книги, оценки и заметки остаются в личном Google-аккаунте. Отдельная таблица с каталогом доступна независимо от приложения.
            </motion.p>
            <motion.div className="hero__buttons" variants={fadeUp}>
              <a className="button button--solid" href="#install">Установить SoloTome <ArrowRight /></a>
              <a className="button button--outline" href="https://github.com/rommm13/solotome" target="_blank" rel="noreferrer"><Code2 /> Исходный код</a>
            </motion.div>
            <motion.div className="hero__meta" variants={fadeUp}>
              <span>Браузер</span><i /> <span>PWA</span><i /> <span>Google Sheets</span><i /> <span>Open source</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, scale: 0.92, y: 42 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            onMouseMove={(event) => {
              if (reducedMotion) return
              const rect = event.currentTarget.getBoundingClientRect()
              const x = (event.clientX - rect.left) / rect.width - 0.5
              const y = (event.clientY - rect.top) / rect.height - 0.5
              setTilt({ x: y * -7, y: x * 9 })
            }}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <div className="hero-device-shadow" aria-hidden="true" />
            <motion.div
              className="hero-book"
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              <img src={heroBook} alt="Карбоновый знак SoloTome" />
              <span className="hero-book__edge" aria-hidden="true" />
              <span className="hero-book__shine" aria-hidden="true" />
            </motion.div>
            <div className="hero__caption"><BookOpen /> Одна библиотека. Один личный экземпляр.</div>
          </motion.div>
          <a className="scroll-cue" href="#product" aria-label="Перейти к возможностям"><ChevronDown /></a>
        </section>

        <section className="section section--product" id="product">
          <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
            <SectionEyebrow>Для своей библиотеки</SectionEyebrow>
            <h2>Книги остаются в центре.</h2>
            <p>SoloTome не превращает чтение в социальную сеть. Здесь нет чужих профилей и ленты. Есть каталог, статусы, оценки, заметки и ясное представление о собственной библиотеке.</p>
          </motion.div>
          <ProductRail theme={theme} />
        </section>

        <section className="theme-stage" aria-label="Светлая и тёмная темы">
          <div className="theme-stage__half theme-stage__half--dark">
            <span>Тёмная</span>
            <img src={ASSET('dark-trio.webp')} alt="SoloTome в тёмной теме" loading="lazy" />
          </div>
          <div className="theme-stage__half theme-stage__half--light">
            <span>Светлая</span>
            <img src={ASSET('light-trio.webp')} alt="SoloTome в светлой теме" loading="lazy" />
          </div>
          <div className="theme-stage__label">
            <SectionEyebrow>Две темы, один характер</SectionEyebrow>
            <h2>Система задаёт свет.<br />SoloTome сохраняет материал.</h2>
          </div>
        </section>

        <section className="section section--data" id="data">
          <div className="data-grid">
            <motion.div className="section-heading section-heading--left" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
              <SectionEyebrow>Где хранятся данные</SectionEyebrow>
              <h2>Личный экземпляр в вашем Google-аккаунте.</h2>
              <p>При установке SoloTome создаёт собственное приложение и таблицы в Google-аккаунте. У SoloTome нет общей базы пользователей, в которой хранятся чужие библиотеки.</p>
              <div className="trust-list">
                <span><ShieldCheck /> Нет общей пользовательской базы</span>
                <span><Database /> Каталог в Google Sheets</span>
                <span><Sparkles /> Gemini подключается только при желании</span>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
              <DataArchitecture />
            </motion.div>
          </div>
        </section>

        <section className="section section--export">
          <div className="export-grid">
            <motion.div className="export-visual" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
              <div className="export-visual__app">
                <BrandMark compact />
                <span>Библиотека</span>
                <div className="export-visual__mini-row"><span>Sapiens</span><b>Читаю</b></div>
                <div className="export-visual__mini-row"><span>Братья Карамазовы</span><b>Прочитано</b></div>
                <div className="export-visual__mini-row"><span>The Pragmatic Programmer</span><b>Хочу</b></div>
              </div>
              <div className="export-visual__arrow"><ArrowRight /></div>
              <ExportTable />
            </motion.div>
            <motion.div className="section-heading section-heading--left" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
              <SectionEyebrow>Каталог в Google Sheets</SectionEyebrow>
              <h2>Список книг не зависит от интерфейса.</h2>
              <p>SoloTome автоматически поддерживает отдельный экспорт каталога. Его можно открыть без приложения, скачать или использовать для переноса данных.</p>
              <p>Если перестать пользоваться SoloTome, список книг никуда не исчезнет.</p>
            </motion.div>
          </div>
        </section>

        <section className="section section--recommendations" id="recommendations">
          <div className="recommendation-grid">
            <motion.div className="section-heading section-heading--left" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
              <SectionEyebrow>Рекомендации</SectionEyebrow>
              <h2>Gemini можно подключить. Можно не подключать.</h2>
              <p>При желании SoloTome использует библиотеку, оценки и заметки, чтобы подобрать следующие книги. Эта функция необязательна и не нужна для обычной работы каталога.</p>
              <div className="recommendation-signals">
                <div><span>01</span><p>Прочитанные книги</p></div>
                <div><span>02</span><p>Оценки</p></div>
                <div><span>03</span><p>Личные заметки</p></div>
              </div>
            </motion.div>
            <motion.div className="recommendation-phone" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-12%' }}>
              <PhoneShot src={ASSET(theme === 'dark' ? 'dark-recommendations.webp' : 'light-recommendations.webp')} alt="Рекомендации SoloTome" />
              <span className="orbit orbit--one" aria-hidden="true" />
              <span className="orbit orbit--two" aria-hidden="true" />
            </motion.div>
          </div>
        </section>

        <section className="section section--add">
          <div className="add-grid">
            <motion.div className="add-phone" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-12%' }}>
              <PhoneShot src={ASSET('add-book.webp')} alt="Добавление книги в SoloTome" />
            </motion.div>
            <motion.div className="section-heading section-heading--left" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
              <SectionEyebrow>Добавление книг</SectionEyebrow>
              <h2>Поиск, список или ручной ввод.</h2>
              <p>Метаданные можно подтянуть из книжных каталогов, проверить перед сохранением и дополнить своими заметками. Массовый импорт не превращает библиотеку в свалку молчаливых дублей.</p>
              <div className="feature-pills">
                <span><Search /> По названию</span>
                <span><Plus /> Вручную</span>
                <span><Download /> Импорт списком</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section section--install" id="install">
          <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
            <SectionEyebrow>Установка</SectionEyebrow>
            <h2>Открывается в браузере.<br />На телефоне можно вынести на экран «Домой».</h2>
            <p>SoloTome работает как обычное веб-приложение на компьютере, планшете и телефоне. На iPhone для установки PWA мы рекомендуем Chrome, потому что этот сценарий протестирован.</p>
          </motion.div>
          <InstallSteps />
          <motion.div className="install-visual" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
            <img src={ASSET('install-iphone.webp')} alt="Временный макет инструкции установки SoloTome на iPhone" loading="lazy" />
            <div className="install-visual__note">Временный визуальный макет. Перед релизом будет заменён реальными экранами браузера и SoloTome.</div>
          </motion.div>
        </section>

        <section className="section section--source" id="source">
          <div className="source-panel">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
              <Code2 className="source-panel__icon" />
              <SectionEyebrow>Открытый исходный код</SectionEyebrow>
              <h2>Можно посмотреть, что именно устанавливается.</h2>
              <p>SoloTome распространяется бесплатно. Исходный код открыт на GitHub, поэтому архитектура приложения, работа с данными и механизм установки не спрятаны за закрытым сервисом.</p>
              <a className="button button--solid" href="https://github.com/rommm13/solotome" target="_blank" rel="noreferrer"><Code2 /> GitHub <ExternalLink /></a>
            </motion.div>
            <div className="source-panel__repo" aria-label="Репозиторий SoloTome">
              <div className="repo-bar"><Code2 /><span>rommm13 / <b>solotome</b></span></div>
              <div className="repo-tree">
                <span><BookOpen /> app</span>
                <span><Globe2 /> website</span>
                <span><Layers3 /> installer</span>
                <span><Code2 /> docs</span>
              </div>
              <div className="repo-caption"><span className="status-dot" /> public · open source</div>
            </div>
          </div>
        </section>

        <section className="closing">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-20%' }}>
            <BrandMark compact />
            <h2>Своя библиотека.<br />В своём аккаунте.</h2>
            <p>Без отдельного сервера и без общей базы пользователей.</p>
            <div className="hero__buttons hero__buttons--center">
              <a className="button button--solid" href="#install">Установить SoloTome <ArrowRight /></a>
              <a className="button button--outline" href="https://github.com/rommm13/solotome" target="_blank" rel="noreferrer"><Code2 /> GitHub</a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="site-footer">
        <BrandMark />
        <p>Personal book catalog · Google Apps Script + Google Sheets</p>
        <div className="site-footer__links"><a href="#data">Данные</a><a href="#install">Установка</a><a href="https://github.com/rommm13/solotome">GitHub</a></div>
      </footer>
    </div>
  )
}
