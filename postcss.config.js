module.exports = {
    plugins:[
        require('autoprefixer')({
            browsers: ['last 2 versions', 'IE > 8']
        }),
        require('cssnano')({
            safe: true // 避免 cssnano 重新计算 z-index
        })
    ]
}
