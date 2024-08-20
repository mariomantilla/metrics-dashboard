import { NextResponse } from 'next/server';
import { z } from 'zod';

const errorResponse = (msg: string = 'Internal Server Error', code: number = 500) => NextResponse.json(
    { error: msg }, { status: code }
)

export function withErrorHandler(handler: (req: Request, data?: any) => any, schema?: z.ZodTypeAny) {
    return async function (req: Request): Promise<NextResponse> {
        try {
            if (schema) {
                const parsedData = schema.safeParse(await req.json());
                if (!parsedData.success) {
                    return errorResponse('Invalid Input', 400);
                }
                return NextResponse.json(await handler(req, parsedData.data));
            }
            return NextResponse.json(await handler(req));
        } catch (error) {
            if (error instanceof SyntaxError) {
                return errorResponse('Malformed JSON', 400);
            }
            // Log the error or handle specific cases as needed
            console.error('Unhandled error:', error);
            return errorResponse();
        }
    };
}