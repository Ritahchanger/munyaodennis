import { Link } from "react-router-dom"
import { buttonVariants } from "../../../components/ui/Button"
import heroImg from "../../../assets/hero.png"
import type { DeveloperProfile } from "../../profile/types"

export function Hero({ profile }: { profile: DeveloperProfile }) {
  return (
    <section className="overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
        <div className="flex flex-col gap-5 [animation-fill-mode:both] animate-fade-in-up">
          <span className="w-fit rounded bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
            {profile.location}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {profile.fullName}
          </h1>
          <p className="text-xl font-medium text-brand-700 dark:text-brand-400">
            {profile.title}
          </p>
          <p className="max-w-xl text-slate-600 dark:text-slate-400">{profile.summary}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/projects" className={buttonVariants({ size: "lg" })}>
              View projects
            </Link>
            <Link
              to="/linkedin"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Experience
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div
            aria-hidden="true"
            className="absolute h-64 w-64 rounded-full bg-brand-400/30 blur-3xl dark:bg-brand-500/20"
          />
          <img
            src={heroImg}
            alt=""
            className="relative w-64 animate-float rounded-2xl border border-slate-200 object-cover shadow-lg [animation-delay:0.2s] sm:w-80 dark:border-slate-800"
          />
        </div>
      </div>
    </section>
  )
}
