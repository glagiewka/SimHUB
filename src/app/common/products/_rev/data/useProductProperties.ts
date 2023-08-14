import {Configuration, ProductInfo} from "./types";

const getConfiguration = (currentConfiguration: string): Configuration => {
    const defaultConfiguration = data.configuration.default

    if (currentConfiguration === 'default') {
        return defaultConfiguration;
    }

    const configuration = (data.configuration as any)[currentConfiguration];

    return {
        flashRpm: defaultConfiguration.flashRpm ?? configuration.flashRpm,
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

const data= {
    name: "Rev_",
    currentConfiguration: 'default',
    configuration: {
        default: {
            flashRpm: 99,
            rpmPattern: {
                led0: 50,
                led1: 53,
                led2: 56,
                led3: 59,
                led4: 62,
                led5: 65,
                led6: 68,
                led7: 71,
                led8: 74,
                led9: 77,
                led10: 80,
                led11: 83,
                led12: 90,
                led13: 93,
                led14: 95,
                flash: 99
            },
            rpmColors: {
                led0: '#008000',
                led1: '#008000',
                led2: '#008000',
                led3: '#008000',
                led4: '#008000',
                led5: '#ff0000',
                led6: '#ff0000',
                led7: '#ff0000',
                led8: '#ff0000',
                led9: '#ff0000',
                led10: '#0000ff',
                led11: '#0000ff',
                led12: '#0000ff',
                led13: '#0000ff',
                led14: '#0000ff',
            },
            pitLimiterColors: {
                led0: '#ff0000',
                led1: '#ff0000',
                led2: '',
                led3: '',
                led4: '',
                led5: '',
                led6: '',
                led7: '',
                led8: '',
                led9: '',
                led10: '',
                led11: '',
                led12: '',
                led13: '#ff0000',
                led14: '#ff0000',
            }
        },
        redBull: {
            rpmPattern: {
                led0: 85,
                led1: 85,
                led2: 85,
                led3: 85,
                led4: 85,
                led5: 90,
                led6: 90,
                led7: 90,
                led8: 90,
                led9: 90,
                led10: 95,
                led11: 95,
                led12: 95,
                led13: 95,
                led14: 95,
            }
        }
    }
}
