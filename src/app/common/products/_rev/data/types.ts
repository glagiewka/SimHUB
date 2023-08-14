export const LED_NAMES = [
    'led0',
    'led1',
    'led2',
    'led3',
    'led4',
    'led5',
    'led6',
    'led7',
    'led8',
    'led9',
    'led10',
    'led11',
    'led12',
    'led13',
    'led14'
] as const


export type LEDs<T> = {
    [key in typeof LED_NAMES[number]]: T
}

export type Configuration = {
    ledNames: typeof LED_NAMES,
    flashRpm: number,
    rpmPattern: LEDs<number>,
    rpmColors: LEDs<string>,
    pitLimiterColors: LEDs<string>
}

export type ProductInfo = {
    name: string,
    currentConfiguration: string
    configuration: Configuration
}
