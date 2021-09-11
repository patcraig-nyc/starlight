import Head from 'next/head'

import { fetchEntries } from '@utils/contentfulPosts'

import Header from '@components/Header'
import Footer from '@components/Footer'
import Hours from '@components/Hours'
import Address from '@components/Address'

export default function Home({ hours, address }) {
  console.log('address: ',address)
  return (
    <div className="container">
      <Head>
        <title>Welcome to The Starlight</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div className="hours">
          {hours.map((p, i) => {
            
            if (p.day !== undefined) {
              console.log(p.day)
              return <Hours key={i} day={p.day} open={p.open} close={p.close} />
            }

          })}
        </div>

        <div className="hours">
          <Address address={address.streetAddress} geo={address.geolocation}  />
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .Hourss {
          display: flex;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetchEntries()
  const hours = await res.map((p) => {
    console.log(p.fields)
    return p.fields
  });
  const address = await res.map((a) => {
    console.log(a.fields)
    return a.fields
  })

  return {
    props: {
      hours,
      address
    },
  }
}
