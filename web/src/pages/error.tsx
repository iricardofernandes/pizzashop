import { Link, useRouteError } from 'react-router'

export function ErrorPage() {
  const error = useRouteError() as Error

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-3xl font-bold tracking-tight">
        Whoops, algo aconteceu...
      </h1>
      <p className="text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
