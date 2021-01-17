async function start() {
    return await Promise.resolve('async is working');
}

start().then(console.log);

class Utill {
    static id = Date.now();
}

console.log('Utill', Utill.id);