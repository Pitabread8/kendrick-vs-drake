/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app.vue"
    ],
    theme: {
        extend: {
            keyframes: {
                play: {
                    "0%, 100%": { scale: "1", transform: "translateX(-50%), translateY(-50%)" },
                    "50%": { scale: "0.9", transform: "translateX(-50%), translateY(-50%)" },
                }
            },
            animation: {
                play: 'play 2s infinite',
            }
        },
    },
    plugins: [],
}
