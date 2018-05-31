
const TS = require('../utils/util')

let ts = new TS()

module.exports = {
    'POST /search': async (ctx) => {
        ts.receive(ctx);
        var data = await ts.fetch();
        ctx.response.body = data;
    },
    'POST /getMusicInfo': async (ctx) => {
        ts.receive(ctx);
        var data = await ts.fetch();
        ctx.response.body = data;
    },
    'POST /getSingerSongs': async (ctx) => {
        ts.receive(ctx);
        var data = await ts.fetch();
        ctx.response.body = data;
    }
}