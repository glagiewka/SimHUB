import {Configuration, LED_NAMES, ProductInfo} from "./types";

const getConfiguration = (currentConfiguration: string): Configuration => {
    const defaultConfiguration= data.configuration.default

    if (currentConfiguration === 'default') {
        return {
            ledNames: LED_NAMES,
            ...defaultConfiguration
        };
    }

    const configuration = data.configuration[currentConfiguration];

    return {
        flashRpm: defaultConfiguration.flashRpm ?? configuration.flashRpm,
        ledNames: LED_NAMES,
        rpmPattern: {
            ...defaultConfiguration.rpmPattern,
            ...configuration.rpmPattern
        },
        rpmColors: {
            ...defaultConfiguration.rpmColors,
            ...configuration.rpmColors
        },
        pitLimiterColors: {
            ...defaultConfiguration.pitLimiterColors,
            ...configuration.pitLimiterColors
        }
    }
};

export const useProductProperties = (): ProductInfo => {
    return {
        name: data.name,
        currentConfiguration: data.currentConfiguration,
        configuration: getConfiguration(data.currentConfiguration)
    }
}

type Data = {
    name: string,
    currentConfiguration: string,
    configuration: {
        default: Omit<Configuration, 'ledNames'>,
        [index: string]: Partial<Configuration>
    }
}

const data: Data = {
    name: "_Rev Lite",
    currentConfiguration: 'default',
    configuration: {
        default: {
            flashRpm: 99,
            rpmPattern: {
                led0: 50,
                led1: 56,
                led2: 62,
                led3: 68,
                led4: 74,
                led5: 80,
                led6: 90,
                led7: 93,
                led8: 95,
            },
            rpmColors: {
                led0: '#008000',
                led1: '#008000',
                led2: '#008000',
                led3: '#ff0000',
                led4: '#ff0000',
                led5: '#ff0000',
                led6: '#0000ff',
                led7: '#0000ff',
                led8: '#0000ff',
            },
            pitLimiterColors: {
                led0: '#ff0000',
                led1: '#ff0000',
                led2: '',
                led3: '',
                led4: '',
                led5: '',
                led6: '',
                led7: '#ff0000',
                led8: '#ff0000',
            }
        },
        redBull: {
            rpmPattern: {
                led0: 85,
                led1: 85,
                led2: 85,
                led3: 90,
                led4: 90,
                led5: 90,
                led6: 95,
                led7: 95,
                led8: 95,
            }
        }
    }
}
