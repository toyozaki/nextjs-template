import { ComponentProps, FC, memo } from 'react'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline, ThemeProvider } from '@mui/material'

type Props = ComponentProps<typeof ThemeProvider>

export const MuiThemeProvider: FC<Props> = memo(function _MuiThemeProvider({ theme, children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
})
