export const useProductProperties = (): ProductInfo => {
    return {
        name: "Rev_",
        configuration: {
            default: {
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
                    led0: 50,
                    led1: 50,
                    led2: 50,
                    led3: 50,
                    led4: 50,
                    led5: 75,
                    led6: 75,
                    led7: 75,
                    led8: 75,
                    led9: 75,
                    led10: 90,
                    led11: 90,
                    led12: 90,
                    led13: 90,
                    led14: 95,
                    flash: 99
                }
            }
        }
    }
}
