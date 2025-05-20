import { LinkButton } from '@/components/link-button'
import LocaleSwitcher from '@/components/locale-switcher'
import { Link } from '@/i18n/navigation'
import {
  ArrowRight,
  Calendar,
  Github,
  Linkedin,
  LogIn,
  Plus,
  Search,
  UserPlus,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function LandingPage() {
  const t = useTranslations('public.landing_page')

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-blue font-heading font-bold text-xl">
              {t('brand')}
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="#features"
              className="text-gray-300 hover:text-blue transition-colors"
            >
              {t('nav.features')}
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-blue transition-colors"
            >
              {t('nav.how_it_works')}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <LocaleSwitcher className="border-gray-500" />
            <LinkButton
              href="/register"
              className="hidden px-2 text-nowrap border border-gray-600 text-gray-200 rounded-xl font-medium sm:px-5 hover:bg-gray-800 hover:text-gray-300 sm:flex"
            >
              <UserPlus className="mr-1 hidden sm:block" size={18} />
              {t('nav.create_account')}
            </LinkButton>
            <LinkButton
              href="/login"
              className="px-2 bg-blue hover:bg-blue/90 text-white rounded-xl font-medium text-nowrap sm:px-5"
            >
              <LogIn className="mr-1 hidden sm:block" size={18} />
              {t('nav.login')}
            </LinkButton>
          </div>
        </div>
      </nav>

      {/* Hero Section - Redesigned without image */}
      <section className="py-16 md:py-28 px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full filter blur-[100px] -z-10 animate-pulse-light" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96  rounded-full filter blur-[100px] -z-10 animate-pulse-light" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mx-auto">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <LinkButton
                  href="/register"
                  className="bg-blue hover:bg-blue/90 text-white rounded-xl font-medium px-8 py-6 text-lg"
                >
                  {t('hero.get_started')}
                </LinkButton>
                <a
                  className="flex justify-between items-center text-nowrap h-12 border border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-gray-300 rounded-xl font-medium px-8 py-6 text-lg w-full"
                  href="#how-it-works"
                >
                  <span>{t('hero.how_it_works')}</span>
                  <ArrowRight className="ml-2" size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-8 gradient-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block header-underline">
              {t('features_section.title')}
            </h2>
            <p className="text-gray-300 md:text-lg max-w-2xl mx-auto mt-6">
              {t('features_section.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-gradient rounded-xl p-6 border border-gray-600 hover:border-blue/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue/5">
              <div className="w-12 h-12 bg-blue/20 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-blue" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                {t('features_section.create_events.title')}
              </h3>
              <p className="text-gray-300">
                {t('features_section.create_events.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-gradient rounded-xl p-6 border border-gray-600 hover:border-purple/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple/5">
              <div className="w-12 h-12 bg-purple/20 rounded-lg flex items-center justify-center mb-4">
                <Search className="text-purple" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                {t('features_section.find_events.title')}
              </h3>
              <p className="text-gray-300">
                {t('features_section.find_events.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-gradient rounded-xl p-6 border border-gray-600 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <Plus className="text-orange-500" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                {t('features_section.invite_friends.title')}
              </h3>
              <p className="text-gray-300">
                {t('features_section.invite_friends.description')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Feature 4 */}
            <div className="card-gradient rounded-xl p-6 border border-gray-600 hover:border-blue/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue/5">
              <div className="w-12 h-12 bg-blue/20 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-blue" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                {t('features_section.ranking.title')}
              </h3>
              <p className="text-gray-300">
                {t('features_section.ranking.description')}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card-gradient rounded-xl p-6 border border-gray-600 hover:border-purple/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple/5">
              <div className="w-12 h-12 bg-purple/20 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-purple" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                {t('features_section.free.title')}
              </h3>
              <p className="text-gray-300">
                {t('features_section.free.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-8 relative">
        <div className="absolute top-1/2 left-0 md:left-1/4 w-80 h-96 bg-blue/10 rounded-full filter blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block header-underline">
              {t('how_it_works_section.title')}
            </h2>
            <p className="text-gray-300 md:text-lg max-w-2xl mx-auto mt-6">
              {t('how_it_works_section.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="card-gradient rounded-xl p-6 border border-gray-600">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-medium mb-3 mt-2 text-white">
                  {t('how_it_works_section.steps.step1.title')}
                </h3>
                <p className="text-gray-300">
                  {t('how_it_works_section.steps.step1.description')}
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-[-15deg]">
                <svg
                  width="40"
                  height="24"
                  viewBox="0 0 40 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Icon</title>
                  <path
                    d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z"
                    fill="#6F9DE2"
                    fillOpacity="0.5"
                  />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="card-gradient rounded-xl p-6 border border-gray-600">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-medium mb-3 mt-2 text-white">
                  {t('how_it_works_section.steps.step2.title')}
                </h3>
                <p className="text-gray-300">
                  {t('how_it_works_section.steps.step2.description')}
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-[-15deg]">
                <svg
                  width="40"
                  height="24"
                  viewBox="0 0 40 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Icon</title>
                  <path
                    d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z"
                    fill="#9871f3"
                    fillOpacity="0.5"
                  />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="card-gradient rounded-xl p-6 border border-gray-600">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-medium mb-3 mt-2 text-white">
                  {t('how_it_works_section.steps.step3.title')}
                </h3>
                <p className="text-gray-300">
                  {t('how_it_works_section.steps.step3.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full filter blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-[100px] -z-10" />

        <div className="max-w-5xl mx-auto card-gradient rounded-xl p-10 border border-gray-600 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-gray-300 md:text-lg max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="flex justify-center bg-blue hover:bg-blue/90 text-white text-nowrap rounded-xl font-medium px-8 py-2 text-lg"
            >
              {t('cta.create_account')}
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-10 px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="text-blue font-heading font-bold text-xl">
                Eventstage
              </span>
              <p className="text-gray-400 mt-4">{t('footer.description')}</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">
                {t('footer.links_title')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-blue transition-colors"
                  >
                    {t('footer.resources')}
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-400 hover:text-blue transition-colors"
                  >
                    {t('footer.how_it_works')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {t('footer.copyright')}
              <br />
              <span className="text-xs">{t('footer.developed_by')}</span>
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="https://www.linkedin.com/in/viniciuscruz7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/viniciusrvcruz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
