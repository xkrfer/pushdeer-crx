module.exports = {
    content: ['./src/edge/**/*.html', './src/components/*.{vue,js,ts,jsx,tsx}', './src/components/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {},
    mode: 'jit',
    plugins: [
        require('@tailwindcss/line-clamp')
    ]
}
