import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import configuration from './config/configuration';
import { Logger } from '@nestjs/common';

const isLocalEnv: boolean = process.env.ENV === "local";

async function bootstrap() {

  const logger = new Logger('Bootstrap');
  logger.log('Starting application...');

  try {
    
    // Load configuration
    const config = configuration();
    logger.debug('Loaded configuration:', config);

    // Create Nest.js application instance
    const app = await NestFactory.create(AppModule);
    logger.debug('Nest application created.');

    // Determine the port
    const port = isLocalEnv ? config.http.port : process.env.HTTP_PORT || 8080;
    logger.debug('Using port: ', port);

    const corsConfig = config.application.cors;
    const isCorsEnabled = isLocalEnv ? corsConfig.enabled : process.env.APPLICATION_CORS_ENABLED;

    if (isCorsEnabled) {

      logger.debug("Cors enabled in configurations")

      const origins = isLocalEnv ? config.application.cors.origins : process.env.APLICATION_CORS_ORIGINS;
      logger.debug("Cors allowed origins: ", origins)

      const methods = isLocalEnv ? corsConfig.methods : process.env.APPLICATION_CORS_METHODS;
      logger.debug("Cors allowed methods: ", methods)

      const credentials = isLocalEnv ? corsConfig.credentials : process.env.APPLICATION_CORS_CREDENTIALS;
      logger.debug("Cors credentials: ", credentials)

      app.enableCors({
        origin: origins,
        methods: methods,
        credentials: credentials,
      });

    }

    // Listen on the specified port
    await app.listen(port);
    logger.log(`Application is running on port ${port}.`);
  } catch (error) {
    logger.error('Error starting application:', error);
    process.exit(1); // Exit with error code
  }

}

bootstrap();