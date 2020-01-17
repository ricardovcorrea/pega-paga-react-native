import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

const reactotron = Reactotron
  .configure({host: 'localhost'}) // controls connection & communication settings
  .use(reactotronRedux())
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

// swizzle the old one
const yeOldeConsoleLog = console.log

// make a new one
console.log  = (...args) => {
  // always call the old one, because React Native does magic swizzling too
  yeOldeConsoleLog(...args)

  // send this off to Reactotron.
  Reactotron.display({ 
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null
  })
}

export default reactotron;