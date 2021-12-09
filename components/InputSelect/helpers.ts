import { ChangeEventHandler, ChangeEvent } from "react"

export function handleNumberInput(
  handler: ChangeEventHandler<HTMLInputElement> | undefined
) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value == "" || (!/^\s*$/.test(value) && !isNaN(Number(value)))) {
      handler && handler(event)
    }
  }
}
