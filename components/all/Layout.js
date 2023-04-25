import NavBar from './Navbar';
import Head from 'next/head';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Pacifico&family=Roboto:wght@100;300;400&family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet"></link>
        <title>MOBA</title>
      </Head>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  )
}