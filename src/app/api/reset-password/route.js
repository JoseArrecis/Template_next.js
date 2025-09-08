import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey'; 

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return new Response(
                JSON.stringify({ error: 'Email is required' }),
                { status: 400 }
            );
        }

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

        const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

        return new Response(
            JSON.stringify({ message: 'Reset link sent', resetLink }),
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
