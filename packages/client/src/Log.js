const logFunc =
    process.env.REACT_APP_ENV === 'development' ? console.log : () => {};

const LOG = (...args) => {
    const enhancedArgs = args.map(arg => JSON.stringify(arg, null, 2));
    logFunc.apply(console, enhancedArgs);
};

export default LOG;
