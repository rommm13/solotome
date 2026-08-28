import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  FlaskConical,
  Globe2,
  Layers3,
  Monitor,
  Moon,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
} from 'lucide-react'

type ThemeMode = 'system' | 'dark' | 'light'
type EffectiveTheme = 'dark' | 'light'

const ASSET = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`} aria-label="SoloTome">
      <span className="brand-mark__word">SoloTome</span>
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

function ProductCanvas({ theme }: { theme: EffectiveTheme }) {
  const shots = theme === 'dark'
    ? [
        { src: 'dark-library.webp', title: 'Библиотека', text: 'Прочитанное, текущие книги и планы.' },
        { src: 'dark-details.webp', title: 'Карточка книги', text: 'Оценка, издание и личные заметки.' },
        { src: 'dark-recommendations.webp', title: 'Рекомендации', text: 'Необязательные персональные подборки.' },
      ]
    : [
        { src: 'light-library.webp', title: 'Библиотека', text: 'Прочитанное, текущие книги и планы.' },
        { src: 'light-details.webp', title: 'Карточка книги', text: 'Оценка, издание и личные заметки.' },
        { src: 'light-recommendations.webp', title: 'Рекомендации', text: 'Необязательные персональные подборки.' },
      ]

  return (
    <motion.div className="product-canvas" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }}>
      <div className="product-canvas__halo" aria-hidden="true" />
      {shots.map((shot, index) => (
        <motion.figure className={`product-canvas__screen product-canvas__screen--${index + 1}`} variants={fadeOnly} key={shot.title}>
          <img src={ASSET(shot.src)} alt={`SoloTome — ${shot.title}`} loading={index === 0 ? 'eager' : 'lazy'} />
          <figcaption><strong>{shot.title}</strong><span>{shot.text}</span></figcaption>
        </motion.figure>
      ))}
    </motion.div>
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
            transition={{ delay: 0.06 * rowIndex + 0.02 * cellIndex, duration: 0.35 }}
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
        ['01', 'Открыть', 'Откройте SoloTome в браузере. Каталог работает и без установки.'],
        ['02', 'Добавить на экран', 'На iPhone рекомендуем Chrome: этот сценарий установки PWA протестирован.'],
        ['03', 'Запустить', 'После добавления SoloTome открывается с домашнего экрана как отдельное веб-приложение.'],
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
  const libraryShot = useMemo(() => ASSET(theme === 'dark' ? 'dark-library.webp' : 'light-library.webp'), [theme])
  const recommendationShot = useMemo(() => ASSET(theme === 'dark' ? 'dark-recommendations.webp' : 'light-recommendations.webp'), [theme])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Перейти к содержанию</a>
      <div className="top-grain" aria-hidden="true" />
      <header className="site-header">
        <a href="#top" className="site-header__brand"><BrandMark /></a>
        <nav className="site-nav" aria-label="Навигация по странице">
          <a href="#product">Возможности</a>
          <a href="#data">Данные</a>
          <a href="#sync">Синхронизация</a>
          <a href="#install">Установка</a>
          <a href="#source">GitHub</a>
        </nav>
        <div className="site-header__actions">
          <ThemeButton mode={mode} onChange={cycleTheme} />
          <a className="button button--small button--solid" href="#install">Установить</a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero__ambient hero__ambient--one" aria-hidden="true" />
          <div className="hero__ambient hero__ambient--two" aria-hidden="true" />
          <motion.div className="hero__copy" variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}><SectionEyebrow>Персональная библиотека</SectionEyebrow></motion.div>
            <motion.h1 variants={fadeUp}>SoloTome</motion.h1>
            <motion.p className="hero__tagline" variants={fadeUp}>Личная библиотека в собственном Google-аккаунте.</motion.p>
            <motion.p className="hero__lead" variants={fadeUp}>
              Каталог прочитанного и планов, оценки, заметки, необязательные рекомендации Gemini и экспериментальная синхронизация с PocketBook и Kindle. Данные остаются в Google-аккаунте пользователя.
            </motion.p>
            <motion.div className="hero__buttons" variants={fadeUp}>
              <a className="button button--solid" href="#install">Установить SoloTome <ArrowRight /></a>
              <a className="button button--outline" href="https://github.com/rommm13/solotome" target="_blank" rel="noreferrer"><Code2 /> GitHub</a>
            </motion.div>
            <motion.div className="hero__meta" variants={fadeUp}>
              <span>Мобильная оптимизация</span><i /> <span>PWA</span><i /> <span>Google Sheets</span><i /> <span>GitHub</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, scale: 0.94, y: 34 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            onMouseMove={(event) => {
              if (reducedMotion) return
              const rect = event.currentTarget.getBoundingClientRect()
              const x = (event.clientX - rect.left) / rect.width - 0.5
              const y = (event.clientY - rect.top) / rect.height - 0.5
              setTilt({ x: y * -6, y: x * 8 })
            }}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <div className="hero-device-shadow" aria-hidden="true" />
            <motion.div className="hero-book" animate={{ rotateX: tilt.x, rotateY: tilt.y }} transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
              <img src={heroBook} alt="Карбоновый знак SoloTome" />
              <span className="hero-book__edge" aria-hidden="true" />
              <span className="hero-book__shine" aria-hidden="true" />
            </motion.div>
            <div className="hero__caption">Один пользователь · один личный экземпляр</div>
          </motion.div>
          <a className="scroll-cue" href="#product" aria-label="Перейти к возможностям"><ChevronDown /></a>
        </section>

        <section className="section section--product" id="product">
          <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
            <SectionEyebrow>Для своей библиотеки</SectionEyebrow>
            <h2>Вся библиотека в одном интерфейсе.</h2>
            <p>SoloTome создан для личного учёта книг. Здесь нет профилей других пользователей, ленты и социальных функций. Прочитанное, текущие книги, планы, оценки и заметки собраны в одном каталоге.</p>
          </motion.div>
          <ProductCanvas theme={theme} />
        </section>

        <section className="mobile-stage" aria-label="Оптимизация SoloTome для мобильных устройств">
          <img className="mobile-stage__media" src={libraryShot} alt="SoloTome на мобильном устройстве" loading="lazy" />
          <div className="mobile-stage__veil" aria-hidden="true" />
          <motion.div className="mobile-stage__copy" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
            <SectionEyebrow>Оптимизировано для мобильных устройств</SectionEyebrow>
            <h2>SoloTome на телефоне.</h2>
            <p>Мобильный интерфейс проектируется отдельно: компактные фильтры, крупные зоны касания, полноэкранное добавление книги, фиксированные действия и корректная работа с экранной клавиатурой.</p>
            <div className="mobile-stage__facts"><span>Mobile-first</span><span>Домашний экран PWA</span><span>iOS / Android</span></div>
          </motion.div>
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
          <div className="theme-stage__label"><SectionEyebrow>Оформление</SectionEyebrow><h2>Тёмная и светлая темы.</h2></div>
        </section>

        <section className="section section--data" id="data">
          <div className="data-grid">
            <motion.div className="section-heading section-heading--left" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
              <SectionEyebrow>Где хранятся данные</SectionEyebrow>
              <h2>Данные в Google-аккаунте.</h2>
              <p>При установке SoloTome создаёт собственное приложение и таблицы в Google-аккаунте. Общей пользовательской базы с библиотеками других людей нет.</p>
              <div className="trust-list">
                <span><ShieldCheck /> Нет общей пользовательской базы</span>
                <span><Database /> Каталог в Google Sheets</span>
                <span><Sparkles /> Gemini подключается только при желании</span>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}><DataArchitecture /></motion.div>
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
              <h2>Отдельный экспорт каталога.</h2>
              <p>SoloTome автоматически поддерживает отдельный экспорт. Его можно открыть без приложения, скачать или использовать для переноса данных.</p>
              <p>Если перестать пользоваться SoloTome, список книг остаётся доступным в обычной таблице.</p>
            </motion.div>
          </div>
        </section>

        <section className="sync-strip" id="sync">
          <motion.div className="sync-strip__copy" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
            <SectionEyebrow>Экспериментальная функция</SectionEyebrow>
            <h2>Синхронизация с PocketBook и Kindle.</h2>
            <p>Экспериментальная интеграция SoloTome с PocketBook и Kindle предназначена для синхронизации перечня книг и статусов чтения. Файлы книг между сервисами не передаются.</p>
            <small><FlaskConical /> Интерфейсы интеграций могут меняться по мере тестирования.</small>
          </motion.div>
          <div className="sync-strip__visual" aria-label="Экспериментальная синхронизация SoloTome с PocketBook и Kindle">
            <span className="sync-device">PocketBook</span>
            <span className="sync-arrow"><RefreshCw /></span>
            <span className="sync-core">SoloTome</span>
            <span className="sync-arrow"><RefreshCw /></span>
            <span className="sync-device">Kindle</span>
          </div>
        </section>

        <section className="feature-scene feature-scene--recommendations" id="recommendations">
          <img className="feature-scene__media" src={recommendationShot} alt="Рекомендации SoloTome" loading="lazy" />
          <div className="feature-scene__veil" aria-hidden="true" />
          <motion.div className="feature-scene__copy" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
            <SectionEyebrow>Рекомендации</SectionEyebrow>
            <h2>Gemini — только при желании.</h2>
            <p>SoloTome может подбирать книги с учётом прочитанного, оценок и личных заметок. Для обычной работы каталога Gemini не нужен.</p>
            <div className="inline-signals"><span>Прочитанное</span><span>Оценки</span><span>Заметки</span></div>
          </motion.div>
        </section>

        <section className="feature-scene feature-scene--add">
          <img className="feature-scene__media" src={ASSET('add-book.webp')} alt="Добавление и импорт книг в SoloTome" loading="lazy" />
          <div className="feature-scene__veil" aria-hidden="true" />
          <motion.div className="feature-scene__copy" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
            <SectionEyebrow>Добавление книг</SectionEyebrow>
            <h2>Поиск, ручное добавление и импорт.</h2>
            <p>Метаданные подтягиваются из книжных каталогов и проверяются перед сохранением. При массовом импорте SoloTome предупреждает о дубликатах и конфликтах.</p>
            <div className="feature-pills">
              <span><Search /> По названию</span><span><Plus /> Вручную</span><span><Download /> Импорт списком</span>
            </div>
          </motion.div>
        </section>

        <section className="section section--install" id="install">
          <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
            <SectionEyebrow>Установка</SectionEyebrow>
            <h2>В браузере или на домашнем экране.</h2>
            <p>SoloTome работает на компьютере, планшете и телефоне. На мобильных устройствах интерфейс специально оптимизирован, а PWA можно добавить на домашний экран.</p>
          </motion.div>
          <InstallSteps />
          <motion.div className="install-visual" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
            <img src={ASSET('install-iphone.webp')} alt="Временный макет установки SoloTome на iPhone" loading="lazy" />
            <div className="install-visual__note">Временный визуальный макет. Перед релизом будет заменён реальными экранами браузера и SoloTome.</div>
          </motion.div>
        </section>

        <section className="section section--source" id="source">
          <div className="source-panel">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}>
              <Code2 className="source-panel__icon" />
              <SectionEyebrow>Публичный репозиторий</SectionEyebrow>
              <h2>Разработка SoloTome на GitHub.</h2>
              <p>Публичный репозиторий уже содержит сайт и документацию проекта. Код приложения и установщик будут опубликованы здесь после приёмки MVP и проверки установки с чистого Google-аккаунта.</p>
              <a className="button button--solid" href="https://github.com/rommm13/solotome" target="_blank" rel="noreferrer"><Code2 /> GitHub <ExternalLink /></a>
            </motion.div>
            <div className="source-panel__repo" aria-label="Репозиторий SoloTome">
              <div className="repo-bar"><Code2 /><span>rommm13 / <b>solotome</b></span></div>
              <div className="repo-tree">
                <span><Globe2 /> website</span><span><Code2 /> docs</span><span><Layers3 /> .github</span><span><FileText /> README.md</span>
              </div>
              <div className="repo-caption"><span className="status-dot" /> public · active development</div>
            </div>
          </div>
        </section>

        <section className="closing">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-20%' }}>
            <BrandMark compact />
            <h2>Личная библиотека в собственном Google-аккаунте.</h2>
            <p>Без отдельного сервера и без общей базы пользовательских библиотек.</p>
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
        <div className="site-footer__links"><a href="#data">Данные</a><a href="#sync">Синхронизация</a><a href="#install">Установка</a><a href="https://github.com/rommm13/solotome">GitHub</a></div>
      </footer>
    </div>
  )
}
