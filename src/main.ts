import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from './shared/error/exception.filter';
import { ResponseInterceptor } from './shared/response/response.interceptor';


async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Products')
		.setDescription('API Documentation for the Product API')
		.setVersion('1.0')
		.addTag('products')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
	app.useGlobalFilters(new ErrorFilter())
	app.useGlobalInterceptors(new ResponseInterceptor)

	await app.listen(3000);
}
bootstrap();
