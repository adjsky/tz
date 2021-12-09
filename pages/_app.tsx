import React, { useEffect, useState } from "react"
import Head from "next/head"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { Provider } from "react-redux"
import store from "@/src/redux/store"
import { useAppDispatch } from "@/src/redux/hooks"
import { setTablet, setDesktop } from "@/src/redux/uiSlice"
import { tablet } from "@/src/constants"
import "@/styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  const [appLoaded, setAppLoaded] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleRouteChange = () => {
      console.log("[App] Route change")
    }

    const handleRouteComplete = () => {
      console.log("[App] Route change complete")
    }

    const handleRouteError = () => {
      console.log("[App] Route change error")
    }

    const handleResize = () => {
      if (window.innerWidth <= tablet) {
        dispatch(setTablet())
      } else {
        dispatch(setDesktop())
      }
    }

    window.onload = () => {
      console.log("[App] Page loaded")
      setAppLoaded(true)
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    router.events.on("routeChangeStart", handleRouteChange)
    router.events.on("routeChangeComplete", handleRouteComplete)
    router.events.on("routeChangeError", handleRouteError)

    return () => {
      router.events.off("routeChangeStart", handleRouteChange)
      router.events.off("routeChangeComplete", handleRouteComplete)
      router.events.off("routeChangeError", handleRouteError)
      window.removeEventListener("resize", handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Frontend</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

function Wrapper(props: AppProps) {
  return (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  )
}

export default Wrapper
