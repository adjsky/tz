import axios from "axios"
import type { AxiosRequestConfig } from "axios"

type ResponseType = {
  status?: number
  message: string
  data?: any
}

export const handleRequest = async (
  props: AxiosRequestConfig
): Promise<ResponseType> => {
  try {
    const response = await axios({ ...props })
    return {
      status: response.status,
      message: response.statusText,
      data: response.data
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const response = error.response
      const status = response.status
      let message = ""
      if (response.status == 404) {
        message = "404 Not Found"
      } else {
        if (response.data.message) {
          message = response.data.message
        }
      }
      return {
        status,
        message
      }
    } else {
      return {
        message: "Server is unavailable"
      }
    }
  }
}
