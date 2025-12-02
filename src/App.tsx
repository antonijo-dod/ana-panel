import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './app/layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        Test
      </Layout>
    </>
  )
}

export default App
