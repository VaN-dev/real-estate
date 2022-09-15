import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseFormat } from '../interceptors/response.interceptor';

export const ApiResponseType = <TModel extends Type<any>>(model: TModel, isArray: boolean) => applyDecorators(
  ApiOkResponse({
    isArray,
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseFormat) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(model),
            },
            isArray: {
              type: 'boolean',
              default: isArray,
            },
          },
        },
      ],
    },
  }),
);
