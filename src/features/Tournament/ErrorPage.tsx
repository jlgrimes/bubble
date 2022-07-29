import Button from "@mui/material/Button"

interface ErrorPageProps {
  error: Error
}

export const ErrorPage = (props: ErrorPageProps) => {
  return (
    <div role="alert">
      <p>Something broke.. Don't worry, your error has been reported, devs are working on it.</p>
      <pre>{props.error.message}</pre>
      <Button variant='contained' onClick={() => window.location.reload()}>Refresh page</Button>
    </div>
  )
}