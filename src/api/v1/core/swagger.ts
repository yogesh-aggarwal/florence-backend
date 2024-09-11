import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerOptions } from "swagger-ui-express"

const options: SwaggerOptions = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Florence API",
         version: "1.0.0",
         description: "API Documentation for Florence platform.",
      },
      servers: [
         {
            url: "http://localhost:3000",
            description: "Development server",
         },
      ],
   },
   apis: ["./src/api/v1/routers/*.ts"],
}

export const swaggerSpec = swaggerJSDoc(options)
