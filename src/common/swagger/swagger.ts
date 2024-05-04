import { INestApplication } from '@nestjs/common';
import { ApiCreatedResponse, DocumentBuilder, getSchemaPath, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'


export const useSwagger =  (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('API_MOVIE_TICKET')
        .setDescription('')
        .setVersion('1.0')
        .addBearerAuth()
        .build()

    const theme = new SwaggerTheme()
    const options = {
        customCss: theme.getBuffer(SwaggerThemeNameEnum.CLASSIC),
        swaggerOptions: {
            persistAuthorization: true
        },
    };
    const document = SwaggerModule.createDocument(app , config)
    SwaggerModule.setup('/swagger', app, document, options)
}

export const CreatedResponse = (mes: string, $ref: any) => {
    return ApiCreatedResponse({
        schema: {
            properties: {
                statusCode: { example: 201 },
                message: { example: mes },
                data: {
                    $ref: getSchemaPath($ref),
                },
            },
        },
    });
};