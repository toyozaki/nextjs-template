import { useContext } from 'react'
import { PreferenceContext } from '../contexts/PreferenceContext'

export const usePreference = () => {
  const preference = useContext(PreferenceContext)
  if (!preference) throw Error('Please place `PreferenceProvider` at root')
  return preference
}
