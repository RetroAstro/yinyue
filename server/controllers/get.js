
module.exports = {
    'GET /': async (ctx, next) => {
        await ctx.render('index.html');
    }
}