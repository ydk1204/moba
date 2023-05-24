import NavBar from '../components/all/Navbar'
import Layout from '../components/all/Layout'
import styles from '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
