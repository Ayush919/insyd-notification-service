module.exports.respond = (res, output) => {
    res.set('Content-Type', 'application/json');
    res.set('x-timestamp', Date.now());
    // set the status of the response as : if error is returned than 400 else 200
    const assignErrorCodeStatus = (output.code > 150 ? output.code : 400)
    res.status(output.code ? assignErrorCodeStatus : 200);
    res.send(output);
    return true;
}
