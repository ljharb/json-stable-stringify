declare module 'jsonify' {
    const jsonify: {
        stringify: typeof JSON.stringify;
        parse: typeof JSON.parse;
    };

    export = jsonify;
}
