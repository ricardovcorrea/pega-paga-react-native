import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

const reactotron = Reactotron.configure({host: 'localhost'})
  .use(reactotronRedux())
  .useReactNative()
  .connect();

const yeOldeConsoleLog = console.log;

console.log = (...args) => {
  yeOldeConsoleLog(...args);

  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};

export default reactotron;
