export type LEDs<T> = {
    led0: T,
    led1: T,
    led2: T,
    led3: T,
    led4: T,
    led5: T,
    led6: T,
    led7: T,
    led8: T,
    led9: T,
    led10: T,
    led11: T,
    led12: T,
    led13: T,
    led14: T
}

type A = keyof LEDs<any>;

type Configuration = {
    rpmPattern: LEDs<number> & { flash: number },
    rpmColors: LEDs<string>,
    pitLimiterColors: LEDs<string>
}

type Configurations = {
    default: Configuration,
    [index: string]: Partial<Configuration>
}

type ProductInfo = {
    name: string,
    configuration: Configurations
}
