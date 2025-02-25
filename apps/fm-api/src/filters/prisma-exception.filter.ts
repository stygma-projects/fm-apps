import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common'
import {Request, Response} from 'express'
import {Prisma} from  "@fm-monorepo/db";

@Catch(
    Prisma.PrismaClientKnownRequestError,
    Prisma.PrismaClientUnknownRequestError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(
        exception:
            | Prisma.PrismaClientKnownRequestError
            | Prisma.PrismaClientUnknownRequestError,
        host: ArgumentsHost,
    ) {
        const response = host.switchToHttp().getResponse<Response>()
        const request = host.switchToHttp().getRequest<Request>()

        let message = exception.message
        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            message = this.formatPrismaError(exception)
        }

        response.status(500).json({
            statusCode: 500,
            message,
            path: request.url,
        })
    }

    private formatPrismaError(
        exception: Prisma.PrismaClientKnownRequestError,
    ): string {
        const code = exception.code ? `[${exception.code}] ` : ''

        const cleanMessage = exception.message
            .replace(/\n\s*at\s.*/g, '')
            .replace(/Invalid.*?\n\s*→\s*\d+\s*/, '')
            .trim()

        return `${code}${cleanMessage}`
    }
}
