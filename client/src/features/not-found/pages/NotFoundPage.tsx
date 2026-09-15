import { Link } from "react-router-dom"
import { Container } from "../../../components/ui/Container"
import { buttonVariants } from "../../../components/ui/Button"

export default function NotFoundPage() {
  return (
    <Container className="flex flex-col items-center gap-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-brand-600 dark:text-brand-400">404</h1>
      <p className="text-slate-600 dark:text-slate-400">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className={buttonVariants()}>
        Back to home
      </Link>
    </Container>
  )
}
