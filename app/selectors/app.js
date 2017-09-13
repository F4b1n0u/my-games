import { STATE_KEY as APP_KEY } from '#modules/app'

export const isLoading = state => state[APP_KEY].status.isLoading
export const isLoaded = state => state[APP_KEY].isLoaded
export const isAboutVisible = state => state[APP_KEY].isAboutVisible
