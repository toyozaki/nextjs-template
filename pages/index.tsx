import { makeStyles, Typography, Paper, Button, Container } from '@material-ui/core'

import { usePreference } from '../hooks/usePreference'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

export default function Home() {
  const classes = useStyles()
  const { toggleTheme } = usePreference()

  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h1">
        Hello, world!
      </Typography>
      <Button variant="outlined" onClick={() => toggleTheme()}>
        {'Change theme'}
      </Button>
    </div>
  )
}
