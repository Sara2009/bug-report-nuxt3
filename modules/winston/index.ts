import { defineNuxtModule } from '@nuxt/kit'
import winston from 'winston'


console.log(3333, winston.transports)


const winstonModule = defineNuxtModule<{}>({
  meta: {
    name: 'nuxt-rp-winston-log',
    version: '0.0.1',
    configKey: 'winston',
    compatibility: {
      bridge: true,
    },
  },

  setup(_options, nuxt) {
    const CATEGORY = 'nuxt:winston'
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.label({ label: CATEGORY }),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.prettyPrint(),
      ),
      transports: [
        new winston.transports.Console({
          level: nuxt.options.dev ? 'debug' : 'info',
        }),
      ],
    })
    nuxt.options.runtimeConfig.app.$winstonLog = logger
  },
})

export default winstonModule
